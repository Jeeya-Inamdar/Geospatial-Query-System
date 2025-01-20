import { Test, TestingModule } from '@nestjs/testing';
import { CityController } from './city.controller';
import { CityService } from './city.service';

const mockCityService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CityController', () => {
  let controller: CityController;
  let service: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: CityService,
          useValue: mockCityService,
        },
      ],
    }).compile();

    controller = module.get<CityController>(CityController);
    service = module.get<CityService>(CityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all cities', async () => {
    const cities = [
      {
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
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(cities as any);
    const result = await controller.findAll();
    expect(result).toEqual(cities);
  });

  it('should find a city by id', async () => {
    const city = {
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
    jest.spyOn(service, 'findOne').mockResolvedValue(city as any);
    const result = await controller.findOne('1');
    expect(result).toEqual(city);
  });

  it('should update a city', async () => {
    const cityDto = {
      name: 'Updated City',
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
    jest.spyOn(service, 'update').mockResolvedValue(cityDto as any);
    const result = await controller.update('1', cityDto as any);
    expect(result).toEqual(cityDto);
  });

  it('should delete a city', async () => {
    const city = {
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
    jest.spyOn(service, 'delete').mockResolvedValue(city as any);
    const result = await controller.delete('1');
    expect(result).toEqual(city);
  });
});
