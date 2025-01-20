import { Controller, Get, Query } from '@nestjs/common';

@Controller('geospatial')
export class GeospatialController {
  @Get('nearby')
  findNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number,
  ) {
    return {
      lat,
      lng,
      radius,
    };
  }
}
