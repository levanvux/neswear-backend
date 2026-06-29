import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

export interface DivisionApiResponse {
  code: number;
  name: string;
  codename: string;
  division_type: string;
}

export interface ProvinceApiResponse extends DivisionApiResponse {
  phone_code: number;
  districts: DistrictApiResponse[];
}

export interface DistrictApiResponse extends DivisionApiResponse {
  province_code: number;
  wards: WardApiResponse[];
}

export interface WardApiResponse extends DivisionApiResponse {
  district_code: number;
}

export interface Division {
  name: string;
  code: number;
}

@Injectable()
export class LocationsService {
  private readonly LOCATION_PREFIX = 'locations:vn';
  private readonly API_URL = 'https://provinces.open-api.vn/api/v1';

  constructor(private readonly redisService: RedisService) {}

  async getProvinces(country: string): Promise<Division[]> {
    if (country !== 'vn') return [];

    const PROVINCES_KEY = this.LOCATION_PREFIX + ':provinces';

    const cached = await this.redisService.get(PROVINCES_KEY);

    if (cached) {
      try {
        return JSON.parse(cached) as Division[];
      } catch {
        await this.redisService.del(PROVINCES_KEY);
      }
    }

    const response = await fetch(this.API_URL + '/p');

    if (!response.ok) {
      throw new Error(
        `Failed to fetch provinces: ${response.status} ${response.statusText}`,
      );
    }

    const provinces = ((await response.json()) as ProvinceApiResponse[]).map(
      ({ code, name }) => ({ code, name }),
    );

    await this.redisService.set(
      PROVINCES_KEY,
      JSON.stringify(provinces),
      60 * 60 * 24,
    );

    return provinces;
  }

  async getDistrictsByProvince(
    country: string,
    provinceCode: number,
  ): Promise<Division[]> {
    if (country !== 'vn') return [];

    const DISTRICTS_KEY = `${this.LOCATION_PREFIX}:districts:${provinceCode}`;

    const cached = await this.redisService.get(DISTRICTS_KEY);

    if (cached) {
      try {
        return JSON.parse(cached) as Division[];
      } catch {
        await this.redisService.del(DISTRICTS_KEY);
      }
    }

    const response = await fetch(`${this.API_URL}/p/${provinceCode}?depth=2`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch provinces: ${response.status} ${response.statusText}`,
      );
    }

    const districts = (
      (await response.json()) as ProvinceApiResponse
    ).districts.map(({ code, name }) => ({ code, name }));

    await this.redisService.set(
      DISTRICTS_KEY,
      JSON.stringify(districts),
      60 * 60 * 24,
    );

    return districts;
  }

  async getWardsByDistrict(
    country: string,
    districtCode: number,
  ): Promise<Division[]> {
    if (country !== 'vn') return [];

    const WARDS_KEY = `${this.LOCATION_PREFIX}:wards:${districtCode}`;

    const cached = await this.redisService.get(WARDS_KEY);

    if (cached) {
      try {
        return JSON.parse(cached) as Division[];
      } catch {
        await this.redisService.del(WARDS_KEY);
      }
    }

    const response = await fetch(`${this.API_URL}/d/${districtCode}?depth=2`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch provinces: ${response.status} ${response.statusText}`,
      );
    }

    const wards = ((await response.json()) as DistrictApiResponse).wards.map(
      ({ code, name }) => ({ code, name }),
    );

    await this.redisService.set(WARDS_KEY, JSON.stringify(wards), 60 * 60 * 24);

    return wards;
  }
}
