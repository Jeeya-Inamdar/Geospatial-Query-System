import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City } from './city.schema';
import { CreateCityDto } from './create-city.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private cityModel: Model<City>) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    const createdCity = new this.cityModel(createCityDto);
    return createdCity.save();
  }

  async findAll(): Promise<City[]> {
    return this.cityModel.find().exec();
  }

  async findOne(id: string): Promise<City> {
    const city = await this.cityModel.findById(id).exec();
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return city;
  }

  async update(id: string, updateCityDto: CreateCityDto): Promise<City> {
    const updatedCity = await this.cityModel
      .findByIdAndUpdate(id, updateCityDto, { new: true })
      .exec();
    if (!updatedCity) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return updatedCity;
  }

  async delete(id: string): Promise<City> {
    const deletedCity = await this.cityModel.findByIdAndDelete(id).exec();
    if (!deletedCity) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return deletedCity;
  }

  async findWithinBoundary(coordinates: number[][][]): Promise<City[]> {
    if (!coordinates || coordinates.length === 0) {
      throw new BadRequestException('Invalid coordinates');
    }
    return this.cityModel
      .find({
        boundary: {
          $geoWithin: {
            $geometry: {
              type: 'Polygon',
              coordinates,
            },
          },
        },
      })
      .exec();
  }
}
