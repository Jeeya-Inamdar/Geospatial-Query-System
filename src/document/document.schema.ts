import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class DocumentEntity extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string; // e.g., 'landmark', 'business', 'residence'

  @Prop({ type: Object, required: true, index: '2dsphere' })
  location: {
    type: string; // Should always be "Point"
    coordinates: number[]; // Array of coordinates defining the point
  };

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentEntity);
