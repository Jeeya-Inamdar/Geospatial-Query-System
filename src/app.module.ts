import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CityModule } from './city/city.module';
import { DocumentModule } from './document/document.module';
import { GeospatialController } from '../Controllers/geospatial.controller';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    CityModule,
    DocumentModule,
  ],
  controllers: [AppController, GeospatialController],
  providers: [AppService],
})
export class AppModule {}
