import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {MonsterModule} from '../monster/monster.module';
import {OpponentModule} from '../opponent/opponent.module';
import {EncounterController} from './encounter.controller';
import {Encounter, EncounterSchema} from './encounter.schema';
import {EncounterService} from './encounter.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Encounter.name,
        schema: EncounterSchema,
      },
    ]),
    MonsterModule,
    OpponentModule,
  ],
  providers: [EncounterService],
  controllers: [EncounterController],
  exports: [EncounterService],
})
export class EncounterModule {
}