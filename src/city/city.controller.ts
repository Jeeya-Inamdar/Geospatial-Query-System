import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CityService } from './city.service';
import { CreateCityDto } from './create-city.dto';

@ApiTags('city')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new city' })
  @ApiResponse({
    status: 201,
    description: 'The city has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cities' })
  @ApiResponse({ status: 200, description: 'Return all cities.' })
  findAll() {
    return this.cityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a city by ID' })
  @ApiResponse({ status: 200, description: 'Return the city.' })
  @ApiResponse({ status: 404, description: 'City not found.' })
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a city by ID' })
  @ApiResponse({
    status: 200,
    description: 'The city has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'City not found.' })
  update(@Param('id') id: string, @Body() updateCityDto: CreateCityDto) {
    return this.cityService.update(id, updateCityDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a city by ID' })
  @ApiResponse({
    status: 200,
    description: 'The city has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'City not found.' })
  delete(@Param('id') id: string) {
    return this.cityService.delete(id);
  }

  @Get('within-boundary')
  @ApiOperation({ summary: 'Find cities within a boundary' })
  @ApiResponse({
    status: 200,
    description: 'Return cities within the boundary.',
  })
  findWithinBoundary(@Query('coordinates') coordinates: number[][][]) {
    return this.cityService.findWithinBoundary(coordinates);
  }
}
