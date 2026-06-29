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

  @Get('districts/:provinceCode')
  getDistrictsByProvince(
    @Query('country', new DefaultValuePipe('vn'))
    country: string,

    @Param('provinceCode', ParseIntPipe)
    provinceCode: number,
  ) {
    return this.locationsService.getDistrictsByProvince(country, provinceCode);
  }

  @Get('wards/:districtCode')
  getWardsByDistrict(
    @Query('country', new DefaultValuePipe('vn'))
    country: string,

    @Param('districtCode', ParseIntPipe)
    districtCode: number,
  ) {
    return this.locationsService.getWardsByDistrict(country, districtCode);
  }
}
