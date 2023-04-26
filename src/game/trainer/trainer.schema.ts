import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsIn,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {Document, Types} from 'mongoose';
import {GLOBAL_SCHEMA_OPTIONS, GlobalSchema, MONGO_ID_FORMAT} from '../../util/schema';
import {characters} from '../constants';

export enum Direction {
  RIGHT,
  UP,
  LEFT,
  DOWN,
}

export class NPCInfo {
  @ApiProperty()
  @IsBoolean()
  walkRandomly: boolean;

  @ApiProperty()
  @IsBoolean()
  encounterOnSight: boolean;

  @ApiProperty()
  @IsBoolean()
  canHeal: boolean;

  @ApiProperty()
  @IsBoolean()
  isMerchant: boolean;

  @ApiPropertyOptional({type: [Number]})
  @IsOptional()
  @IsArray()
  @IsInt({each: true})
  path?: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsMongoId({each: true})
  encountered?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsInt({each: true})
  starters?: number[];
}

@Schema(GLOBAL_SCHEMA_OPTIONS)
export class Trainer extends GlobalSchema {
  @Prop()
  @ApiProperty(MONGO_ID_FORMAT)
  @IsMongoId()
  region: string;

  @Prop()
  @ApiProperty(MONGO_ID_FORMAT)
  @IsMongoId()
  user: string;

  @Prop()
  @ApiProperty()
  @IsString()
  name: string;

  @Prop()
  @ApiProperty()
  @IsIn(characters)
  image: string;

  @Prop()
  @ApiProperty()
  @IsInt()
  coins: number;

  @Prop()
  @ApiProperty({type: [Number]})
  @IsArray()
  @IsInt({each: true})
  encounteredMonsterTypes: number[];

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

  @Prop()
  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => NPCInfo)
  npc?: NPCInfo;
}

export type TrainerDocument = Trainer & Document<Types.ObjectId, any, Trainer>;

export const TrainerSchema = SchemaFactory.createForClass(Trainer)
  .index({region: 1, user: 1}, {unique: true})
;
