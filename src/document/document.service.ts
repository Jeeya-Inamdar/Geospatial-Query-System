import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DocumentEntity } from './document.schema';
import { CreateDocumentDto } from './dto/create-document.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CityService } from '../city/city.service';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(DocumentEntity.name)
    private documentModel: Model<DocumentEntity>,
    private readonly cityService: CityService,
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<DocumentEntity> {
    const createdDocument = new this.documentModel(createDocumentDto);
    return createdDocument.save();
  }

  async findAll(): Promise<DocumentEntity[]> {
    return this.documentModel.find().exec();
  }

  async findOne(id: string): Promise<DocumentEntity> {
    const document = await this.documentModel.findById(id).exec();
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  async update(
    id: string,
    updateDocumentDto: CreateDocumentDto,
  ): Promise<DocumentEntity> {
    const updatedDocument = await this.documentModel
      .findByIdAndUpdate(id, updateDocumentDto, { new: true })
      .exec();
    if (!updatedDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return updatedDocument;
  }

  async delete(id: string): Promise<DocumentEntity> {
    const deletedDocument = await this.documentModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedDocument) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return deletedDocument;
  }

  async findWithinCityBoundary(cityId: string): Promise<DocumentEntity[]> {
    const city = await this.cityService.findOne(cityId);
    if (!city) {
      throw new NotFoundException(`City with ID ${cityId} not found`);
    }
    return this.documentModel
      .find({
        location: {
          $geoWithin: {
            $geometry: city.boundary,
          },
        },
      })
      .exec();
  }

  async createWithinCityBoundary(
    cityId: string,
    createDocumentDto: CreateDocumentDto,
  ): Promise<DocumentEntity> {
    const city = await this.cityService.findOne(cityId);
    if (!city) {
      throw new NotFoundException(`City with ID ${cityId} not found`);
    }
    const isWithinBoundary = await this.documentModel
      .findOne({
        location: {
          $geoWithin: {
            $geometry: city.boundary,
          },
        },
      })
      .exec();
    if (!isWithinBoundary) {
      throw new BadRequestException(
        'Document location is outside the city boundary',
      );
    }
    return this.create(createDocumentDto);
  }

  async updateWithinCityBoundary(
    cityId: string,
    id: string,
    updateDocumentDto: CreateDocumentDto,
  ): Promise<DocumentEntity> {
    const city = await this.cityService.findOne(cityId);
    if (!city) {
      throw new NotFoundException(`City with ID ${cityId} not found`);
    }
    const isWithinBoundary = await this.documentModel
      .findOne({
        location: {
          $geoWithin: {
            $geometry: city.boundary,
          },
        },
      })
      .exec();
    if (!isWithinBoundary) {
      throw new BadRequestException(
        'Updated document location is outside the city boundary',
      );
    }
    return this.update(id, updateDocumentDto);
  }

  async deleteWithinCityBoundary(
    cityId: string,
    id: string,
  ): Promise<DocumentEntity> {
    const city = await this.cityService.findOne(cityId);
    if (!city) {
      throw new NotFoundException(`City with ID ${cityId} not found`);
    }
    const document = await this.findOne(id);
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    const isWithinBoundary = await this.documentModel
      .findOne({
        location: {
          $geoWithin: {
            $geometry: city.boundary,
          },
        },
      })
      .exec();
    if (!isWithinBoundary) {
      throw new BadRequestException(
        'Document location is outside the city boundary',
      );
    }
    return this.delete(id);
  }
}
