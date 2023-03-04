import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsEnum, IsInt, IsMongoId, IsOptional, IsString, Max, Min} from 'class-validator';
import {Document, Types} from 'mongoose';
import {GLOBAL_SCHEMA_OPTIONS, GlobalSchema, MONGO_ID_FORMAT} from '../../util/schema';

export enum Direction {
  RIGHT,
  UP,
  LEFT,
  DOWN,
}

@Schema(GLOBAL_SCHEMA_OPTIONS)
export class Trainer extends GlobalSchema {
  @Prop()
  @ApiProperty(MONGO_ID_FORMAT)
  @IsMongoId()
  region: string;

  @Prop()
  @ApiPropertyOptional(MONGO_ID_FORMAT)
  @IsOptional()
  @IsMongoId()
  user?: string;

  @Prop()
  @ApiProperty()
  @IsString()
  image: string;

  @Prop()
  @ApiProperty()
  @IsString()
  name: string;

  @Prop()
  @ApiProperty()
  @IsInt()
  coins: number;

  @Prop()
  @ApiProperty(MONGO_ID_FORMAT)
  @IsMongoId()
  area: string;

  @Prop()
  @ApiProperty()
  @IsInt()
  x: number;

  @Prop()
  @ApiProperty()
  @IsInt()
  y: number;

  @Prop()
  @ApiProperty()
  @IsEnum(Direction)
  direction: Direction;
}

export type TrainerDocument = Trainer & Document<Types.ObjectId, never, Trainer>;

export const TrainerSchema = SchemaFactory.createForClass(Trainer)
  .index({region: 1, user: 1}, {unique: true})
;
