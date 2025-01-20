import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DocumentService } from '../src/document/document.service';

describe('DocumentController (e2e)', () => {
  let app: INestApplication;
  const documentService = {
    findAll: () => [
      {
        name: 'Test Document',
        type: 'landmark',
        location: { type: 'Point', coordinates: [102.0, 2.0] },
      },
    ],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DocumentService)
      .useValue(documentService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/document/:cityId (GET)', () => {
    return request(app.getHttpServer())
      .get('/document/1')
      .expect(200)
      .expect(documentService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
