import {Injectable} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {Encounter} from '../encounter/encounter.schema';
import {EncounterService} from '../encounter/encounter.service';
import {MonsterService} from '../monster/monster.service';
import {Trainer} from '../trainer/trainer.schema';
import {Move, Opponent} from './opponent.schema';
import {OpponentService} from './opponent.service';

@Injectable()
export class OpponentHandler {
  constructor(
    private opponentService: OpponentService,
    private monsterService: MonsterService,
    private encounterService: EncounterService,
  ) {
  }

  @OnEvent('regions.*.trainers.*.deleted')
  async onTrainerDeleted(trainer: Trainer): Promise<void> {
    await this.opponentService.deleteAll({trainer: trainer._id.toString()});
  }

  @OnEvent('regions.*.encounters.*.deleted')
  async onEncounterDeleted(encounter: Encounter): Promise<void> {
    await this.opponentService.deleteAll({encounter: encounter._id.toString()});
  }

  @OnEvent('encounters.*.opponents.*.updated')
  async onOpponentUpdated(opponent: Opponent): Promise<void> {
    // check if all player opponents have made a move

    const opponents = await this.opponentService.findAll({encounter: opponent.encounter.toString()});
    if (!opponents.every(t => t.move && !t.isNPC)) {
      // not all players have made a move
      return;
    }

    // make a move for all NPCs
    for (const opponent of opponents) {
      if (!opponent.isNPC) {
        continue;
      }

      const targets = opponents.filter(o => o.isAttacker !== opponent.isAttacker);
      const target = targets[Math.floor(Math.random() * targets.length)];
      const monster = await this.monsterService.findOne(opponent.monster);
      let move: Move;
      if (monster && monster.currentAttributes.health > 0) {
        move = {
          type: 'ability',
          target: target.trainer,
          // TODO select ability based on monster type
          ability: monster.abilities.random(),
        };
      } else {
        const liveMonsters = await this.monsterService.findAll({
          trainer: opponent.trainer,
          'currentAttributes.health': {$gt: 0},
        });
        if (!liveMonsters.length) {
          // TODO flee
          continue;
        }
        move = {
          type: 'change-monster',
          // TODO select monster based on type
          monster: liveMonsters.random()._id.toString(),
        };
      }

      opponent.move = move;
    }

    await this.encounterService.playRound(opponents);

    for (const opponent of opponents) {
      opponent.move = undefined;
    }

    await this.opponentService.saveMany(opponents);
  }
}
