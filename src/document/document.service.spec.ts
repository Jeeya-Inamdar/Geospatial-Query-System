import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { DocumentService } from './document.service';
import { DocumentEntity } from './document.schema';
// import { Model } from 'mongoose';
import { CityService } from '../city/city.service';

const mockDocument = {
  name: 'Test Document',
  type: 'landmark',
  location: {
    type: 'Point',
    coordinates: [102.0, 2.0],
  },
};

const mockCity = {
  name: 'Test City',
  boundary: {
    type: 'Polygon',
    coordinates: [
      [
        [102.0, 2.0],
        [103.0, 2.0],
        [103.0, 3.0],
        [102.0, 3.0],
        [102.0, 2.0],
      ],
    ],
  },
};

const mockDocumentModel = {
  create: jest.fn().mockResolvedValue(mockDocument),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndRemove: jest.fn(),
  exec: jest.fn(),
  save: jest.fn(),
};

const mockCityService = {
  findOne: jest.fn().mockResolvedValue(mockCity),
};

describe('DocumentService', () => {
  let service: DocumentService;
  // let model: Model<DocumentEntity>;
  // let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        {
          provide: getModelToken(DocumentEntity.name),
          useValue: mockDocumentModel,
        },
        {
          provide: CityService,
          useValue: mockCityService,
        },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
    // model = module.get<Model<DocumentEntity>>(
    //   getModelToken(DocumentEntity.name),
    // );
    // cityService = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all documents', async () => {
    jest.spyOn(mockDocumentModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([mockDocument]),
    } as any);
    const documents = await service.findAll();
    expect(documents).toEqual([mockDocument]);
  });

  it('should find a document by id', async () => {
    jest.spyOn(mockDocumentModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockDocument),
    } as any);
    const document = await service.findOne('1');
    expect(document).toEqual(mockDocument);
  });

  it('should find documents within a city boundary', async () => {
    jest.spyOn(mockDocumentModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([mockDocument]),
    } as any);
    const documents = await service.findWithinCityBoundary('1');
    expect(documents).toEqual([mockDocument]);
  });
});
