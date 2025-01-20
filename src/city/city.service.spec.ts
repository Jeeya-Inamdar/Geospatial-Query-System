import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CityService } from './city.service';
import { City } from './city.schema';
// import { Model } from 'mongoose';

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

const mockCityModel = {
  create: jest.fn().mockResolvedValue(mockCity),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndRemove: jest.fn(),
  exec: jest.fn(),
  save: jest.fn(),
};

describe('CityService', () => {
  let service: CityService;
  //let model: Model<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getModelToken(City.name),
          useValue: mockCityModel,
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    // model = module.get<Model<City>>(getModelToken(City.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all cities', async () => {
    jest.spyOn(mockCityModel, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([mockCity]),
    } as any);
    const cities = await service.findAll();
    expect(cities).toEqual([mockCity]);
  });

  it('should find a city by id', async () => {
    jest.spyOn(mockCityModel, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockCity),
    } as any);
    const city = await service.findOne('1');
    expect(city).toEqual(mockCity);
  });

  it('should update a city', async () => {
    jest.spyOn(mockCityModel, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockCity),
    } as any);
    const updatedCity = await service.update('1', mockCity as any);
    expect(updatedCity).toEqual(mockCity);
  });
});
