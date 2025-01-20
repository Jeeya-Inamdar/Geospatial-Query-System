import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CityService } from '../src/city/city.service';

describe('CityController (e2e)', () => {
  let app: INestApplication;
  const cityService = {
    findAll: () => [
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
    ],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CityService)
      .useValue(cityService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/city (GET)', () => {
    return request(app.getHttpServer())
      .get('/city')
      .expect(200)
      .expect(cityService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
