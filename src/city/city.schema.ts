import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class City extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Object, required: true, index: '2dsphere' })
  boundary: {
    type: string; // Should always be "Polygon"
    coordinates: number[][][]; // Array of coordinates defining the polygon
  };
}

export const CitySchema = SchemaFactory.createForClass(City);
