import {Module} from '@nestjs/common';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {MongooseModule} from '@nestjs/mongoose';
import {ScheduleModule} from '@nestjs/schedule';
import {ThrottlerModule} from '@nestjs/throttler';
import {AreaModule} from './area/area.module';

import {AuthModule} from './auth/auth.module';
import {environment} from './environment';
import {EventModule} from './event/event.module';
import {GroupModule} from './group/group.module';
import {MemberModule} from './member/member.module';
import {MessageModule} from './message/message.module';
import {MonsterModule} from './monster/monster.module';
import {PlayerModule} from './player/player.module';
import {RegionModule} from './region/region.module';
import {UserModule} from './user/user.module';
import { EncounterModule } from './encounter/encounter.module';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongo.uri),
    ThrottlerModule.forRoot(environment.rateLimit),
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    EventModule,
    UserModule,
    // AchievementSummaryModule,
    // AchievementModule,
    GroupModule,
    MessageModule,
    RegionModule,
    MemberModule,
    AreaModule,
    PlayerModule,
    MonsterModule,
    EncounterModule,
  ],
})
export class AppModule {
}
