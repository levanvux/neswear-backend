import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Address)
    private addressesRepository: Repository<Address>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.addresses && createUserDto.addresses.length > 0) {
      createUserDto.addresses[0].isDefault = true;
    }

    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);

    const { password, ...result } = savedUser;
    void password;

    return result;
  }

  async findById(id: number) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['addresses'],
    });
  }

  async createAddress(userId: number, dto: CreateAddressDto) {
    return this.dataSource.transaction(async (manager) => {
      const count = await manager.count(Address, {
        where: {
          user: {
            id: userId,
          },
        },
      });
      if (count >= 5) {
        // [422 - Unprocessable Entity] Request was well-formatted
        // but was unable to be followed due to business logic constraints
        throw new UnprocessableEntityException(
          'You can only have up to 5 addresses.',
        );
      }

      const shouldBeDefault = dto.isDefault || count === 0;
      if (shouldBeDefault) {
        await manager.update(
          Address,
          {
            user: {
              id: userId,
            },
            isDefault: true,
          },
          {
            isDefault: false,
          },
        );
      }

      return manager.save(
        manager.create(Address, {
          ...dto,
          isDefault: shouldBeDefault,
          user: {
            id: userId,
          },
        }),
      );
    });
  }

  async updateAddress(
    userId: number,
    addressId: number,
    dto: UpdateAddressDto,
  ) {
    return this.dataSource.transaction(async (manager) => {
      const address = await manager.findOne(Address, {
        where: {
          id: addressId,
          user: {
            id: userId,
          },
        },
      });
      if (!address) {
        throw new NotFoundException('Address not found');
      }

      if (dto.isDefault) {
        await manager.update(
          Address,
          {
            user: {
              id: userId,
            },
            isDefault: true,
          },
          {
            isDefault: false,
          },
        );
      } else if (dto.isDefault === false && address.isDefault) {
        throw new UnprocessableEntityException(
          'You cannot unset the default address without setting another address as default',
        );
      }

      Object.assign(address, dto);
      return manager.save(address);
    });
  }

  async deleteAddress(userId: number, addressId: number) {
    const address = await this.addressesRepository.findOne({
      where: {
        id: addressId,
        user: {
          id: userId,
        },
      },
    });
    if (!address) {
      throw new NotFoundException('Address not found');
    }

    if (address.isDefault) {
      throw new UnprocessableEntityException(
        'Cannot delete default address. Please set another address as default first.',
      );
    }

    return this.addressesRepository.remove(address);
  }
}
