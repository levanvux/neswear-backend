import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('provinces')
  getProvinces(
    @Query('country', new DefaultValuePipe('vn'))
    country: string,
  ) {
    return this.locationsService.getProvinces(country);
  }

  @Get('wards/:provinceCode')
  getWardsByProvince(
    @Query('country', new DefaultValuePipe('vn'))
    country: string,
    @Param('provinceCode', ParseIntPipe)
    provinceCode: number,
  ) {
    return this.locationsService.getWardsByProvince(country, provinceCode);
  }
}
