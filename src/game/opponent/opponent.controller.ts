import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {Auth, AuthUser} from '../../auth/auth.decorator';
import {User} from '../../user/user.schema';
import {NotFound} from '../../util/not-found.decorator';
import {ParseObjectIdPipe} from '../../util/parse-object-id.pipe';
import {Throttled} from '../../util/throttled.decorator';
import {Validated} from '../../util/validated.decorator';
import {EncounterService} from '../encounter/encounter.service';
import {TrainerService} from '../trainer/trainer.service';
import {UpdateOpponentDto} from './opponent.dto';
import {ChangeMonsterMove, Opponent} from './opponent.schema';
import {OpponentService} from './opponent.service';
import {Types, UpdateQuery} from "mongoose";
import {notFound, ObjectIdPipe} from '@mean-stream/nestx';
import {MonsterService} from "../monster/monster.service";
import {Trainer} from "../trainer/trainer.schema";

@Controller('regions/:region')
@ApiTags('Encounter Opponents')
@Validated()
@Auth()
@Throttled()
export class OpponentController {
  constructor(
    private readonly opponentService: OpponentService,
    private readonly trainerService: TrainerService,
    private readonly monsterService: MonsterService,
    private readonly encounterService: EncounterService,
  ) {
  }

  @Get('trainers/:trainer/opponents')
  @ApiOkResponse({type: [Opponent]})
  async findByTrainer(
    @Param('trainer') trainer: string,
  ): Promise<Opponent[]> {
    return this.opponentService.findAll({trainer});
  }

  @Get('encounters/:encounter/opponents')
  @ApiOkResponse({type: [Opponent]})
  async findByEncounter(
    @Param('encounter', ParseObjectIdPipe) encounter: string,
  ): Promise<Opponent[]> {
    return this.opponentService.findAll({encounter});
  }

  @Get('encounters/:encounter/opponents/:id')
  @ApiOkResponse({type: Opponent})
  @NotFound()
  async findOne(
    @Param('id', ObjectIdPipe) id: Types.ObjectId,
  ): Promise<Opponent | null> {
    return this.opponentService.find(id);
  }

  @Patch('encounters/:encounter/opponents/:id')
  @ApiOkResponse({type: Opponent})
  @ApiForbiddenResponse({description: 'You cannot modify another trainer\'s opponent'})
  @ApiConflictResponse({description: 'You cannot switch the monster without a move if your current monster is not dead'})
  @ApiUnprocessableEntityResponse({description: 'Monster is dead'})
  @NotFound()
  async updateOne(
    @Param('id', ObjectIdPipe) id: Types.ObjectId,
    @Body() dto: UpdateOpponentDto,
    @AuthUser() user: User,
  ): Promise<Opponent | null> {
    const current = await this.opponentService.find(id) || notFound(id);
    const trainer = await this.checkTrainerAccess(current, user);
    if (dto.monster) {
      // Changing the monster happens immediately
      await this.checkMonster(dto.monster, trainer);
      if (current && current.monster) {
        throw new ConflictException(`Opponent ${id} already has a monster`);
      }
    } else if (current && !current.monster) {
      throw new UnprocessableEntityException(`Opponent ${id} does not have a monster`);
    }
    if (dto.move && dto.move.type === ChangeMonsterMove.type) {
      // Changing the monster happens immediately
      await this.checkMonster(dto.move.monster, trainer);
      dto.monster = dto.move.monster;
    }
    const update: UpdateQuery<Opponent> = dto;
    if (dto.move) {
      update.results = [];
    }
    return this.opponentService.update(id, update);
  }

  private async checkMonster(monsterId: string, trainer: Trainer) {
    const monster = await this.monsterService.find(new Types.ObjectId(monsterId)) || notFound(monsterId);
    if (!trainer.team.includes(monsterId)) {
      throw new ForbiddenException(`Monster ${monsterId} is not on trainer ${trainer._id} team`);
    }
    if (monster.currentAttributes.health <= 0) {
      throw new UnprocessableEntityException(`Monster ${monsterId} is dead`);
    }
  }

  @Delete('encounters/:encounter/opponents/:id')
  @ApiOkResponse({type: Opponent})
  @ApiForbiddenResponse({description: 'You cannot make another trainer flee, or flee from a trainer encounter'})
  @NotFound()
  async deleteOne(
    @Param('encounter', ObjectIdPipe) encounter: Types.ObjectId,
    @Param('id', ObjectIdPipe) id: Types.ObjectId,
    @AuthUser() user: User,
  ): Promise<Opponent | null> {
    const encounterDoc = await this.encounterService.find(encounter) || notFound(encounter);
    if (!encounterDoc.isWild) {
      throw new ForbiddenException('You cannot flee from a trainer encounter');
    }
    const opponent = await this.findOne(id) || notFound(id);
    await this.checkTrainerAccess(opponent, user);
    return this.opponentService.delete(id);
  }

  private async checkTrainerAccess(opponent: Opponent, user: User): Promise<Trainer> {
    const trainer = await this.trainerService.find(new Types.ObjectId(opponent.trainer)) || notFound(opponent.trainer);
    if (!user._id.equals(trainer.user)) {
      throw new ForbiddenException('You are not the trainer of this opponent');
    }
    return trainer;
  }
}
