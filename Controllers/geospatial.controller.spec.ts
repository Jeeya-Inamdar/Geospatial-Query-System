import { Test, TestingModule } from '@nestjs/testing';
import { GeospatialController } from './geospatial.controller';

describe('GeospatialController', () => {
  let controller: GeospatialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeospatialController],
    }).compile();

    controller = module.get<GeospatialController>(GeospatialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return nearby locations', () => {
    const result = controller.findNearby(37.7749, -122.4194, 5000);
    expect(result).toEqual({
      lat: 37.7749,
      lng: -122.4194,
      radius: 5000,
    });
  });
});
