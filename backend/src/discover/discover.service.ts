// **************************************************************************
//
//  Trippier Project - API
//
//  By: Ulysse Mercadal
//  Email: ulyssemercadal@kakao.com
//
// **************************************************************************

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class DiscoverService {
  private readonly geonamesUsername: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.geonamesUsername = this.configService.get<string>('GEONAMES_USERNAME');
  }

  async findNearbyPOIs(lat: number, lng: number, radius = 5) {
    if (!this.geonamesUsername) {
      throw new HttpException(
        'GeoNames username not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const url = `http://api.geonames.org/findNearbyPOIsOSMJSON`;
    
    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            lat,
            lng,
            radius,
            username: this.geonamesUsername,
          },
        }),
      );

      return response.data.poi || [];
    } catch (error) {
      throw new HttpException(
        'Failed to fetch data from GeoNames',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}