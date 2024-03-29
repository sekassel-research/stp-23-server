# v1.0.0 - Auth, Users, Regions and Messages

## New Features

### Resources

+ Added Authentication.
+ Added Users.
+ Added Groups.
+ Added Messages.
+ Added Regions.

### Technical

+ Added rate limit.
+ Added event WebSocket.

# v2.0.0 - Open World

## New Features

### Content

+ Added the Albertania region.
+ Added Clemeville.
+ Added Route 100.
+ Added Natchester.
+ Added various building interiors.
+ Added 109 monsters.
+ Added 118 abilities.
+ Added 66 character sprites.

### Resources

+ Added Areas.
+ Added Monsters.
+ Added Trainers.
+ Added Presets (Tilesets, Characters, Monster Types, Abilities).
+ Added Region map.

### Technical

+ Added UDP socket.

## Improvements

* Region messages are now only visible to users with a trainer.

# v2.0.1 - Minor Fixes

## Bugfixes

* Group members are now notified via WebSocket when they are removed from the group. [STP23SRV-3](https://jira.uniks.de/browse/STP23SRV-3)

## Documentation

* Documented some Presets endpoint with image responses.
* Documented region and trainer parameters in Trainer and Monster endpoints.
* Updated the Cascading Deletes documentation.

# v2.0.2 - Minor Fixes

## Improvements

* Added error logging with Sentry.
* Improved the check for duplicate username sign ups.

## Bugfixes

* Fixed a typo in the `Kid_Karen` character filename.
* Updated the `width` and `height` of all maps.

# v2.1.0 - Roof Tiles, Achievements and Update Trainer

## New Features

### Content

+ Added `Roof` tiles. [STP23SRV-6](https://jira.uniks.de/browse/STP23SRV-6)

### Resources

+ Added Achievements. [STP23SRV-5](https://jira.uniks.de/browse/STP23SRV-5)
+ Added the `PATCH /regions/{region}/trainers/{id}` endpoint for updating name and image. [STP23SRV-4](https://jira.uniks.de/browse/STP23SRV-4) 

# v2.1.1 - Preparations for v3

## Improvements

### Content

* Added many new Walkable Roof tiles.
* Updated the Modern Exteriors spritesheet.

### Technical

* Large-scale refactoring in preparation for v3.

# v2.1.2 - Minor Fixes

## Improvements

* Presets endpoints now return `404 Not Found` instead of `500 Internal Server Error` when the requested preset does not exist.

## Bugfixes

* Fixed a bug where some update endpoints could result in a `500 Internal Server Error` instead of `404 Not Found`.
* Fixed the `GET /regions/{region}/trainers/{id}` endpoint reporting an outdated trainer position.
* Fixed the `GET /groups` endpoints causing an `500 Internal Server Error` when the `members` query parameter was present multiple times as an array.
* Fixed a potential problem where newly created monsters would not trigger `created` events.

# v2.1.3 - UDP Fixes

## Improvements

* UDP commands are now properly validated and send an `error` event when invalid.

## Bugfixes

* Fixed a problem with UDP sessions that would not unsubscribe correctly.
* It is no longer possible to teleport to other areas using trainer move commands.

# v2.1.4 - Presets Rate Limits

## General

+ Added rate limits for presets (some endpoints use different rate limits).

# v2.1.5 - Trainer Cleanup

## Improvements

* Trainers without any progress near spawn are now deleted after a while.

## Bugfixes

* Fixed an edge case where Roof tiles would allow walking through walls.
* Fixed some missing parameters in Swagger.

# v2.1.6 - Fix Ghost Trainers

## Bugfixes

* Fixed a bug where trainers would still block tiles after being deleted (manually or during cleanup).
* Preset requests for `@2x` images now return `404 Not Found` instead of the original image.

# v2.1.7 - v3 Backport

## Improvements

* Updated tilesets with v3 tile definitions.
* JSON presets are now minimized.
* Improved UDP error handling.
* Improved movement check performance.
* Trainer cleanup now happens regardless of position in the spawn area.

## Bugfixes

* Fixed tile Walkable check in non-infinite maps.
* Trainer cleanup and NPC movement are now disabled for outdated servers.

# v2.1.8

## Bugfixes

* Removed the trainer location cache to avoid ghost trainers and conflicts with newer server instances.
* Fixed an internal error in the UDP socket.

# v3.0.0 - Battle

## New Features

### Content

+ Added the Encounter Test region.
+ Overhauled Route 100.
+ Added Route 101, 102, 103 and 111.
+ Added Adromere.
+ Added Wesers Peak.
+ Added `Buildings` to cities in the Albertania region map.
+ Optimized all maps and tilesets -- some maps now use layer data instead of chunks.

### Resources

+ Added Encounters.
+ Added Opponents, the representation of a trainer in battle.
+ Added `TalkTrainerDto`, a UDP action for talking to trainers.
+ Added `encounterOnSight`, `encounterOnTalk`, `canHeal`, `encountered` and `starters` to `NPCInfo`.
+ Added `team` to `Trainer`.
+ Added `encounteredMonsterTypes` to `Trainer`.

## Improvements

* Trainers no longer receive a monster when they are created.
* Players can receive a starter monster from the Prof.
* Wild Encounters can be triggered by Tall Grass.
* Players can trigger encounters by talking to other trainers.
* Players can heal their monsters by talking to a Nurse.
* NPCs may start encounters when they see you.
* Defeating a monster now grants experience.
* Monsters can now level up and evolve.
* Winning encounters now grants coins.

# v3.0.1 - Minor Improvements

## Improvements

* Minor improvements to exterior tile definitions.
* Improved movement and tall grass check performance.

## Bugfixes

* Trainer cleanup and NPC movement are now disabled for outdated servers.

# v3.0.2 - Minor Fixes

## Improvements

+ Added some sand tiles for future use.

## Bugfixes

* Removed some strange Tile IDs from Route 111.
* Removed the trainer location cache to avoid ghost trainers and conflicts with newer server instances.
* Fixed an internal error in the UDP socket.
* Fixed an internal error when an encounter ends.
* Fixed an internal error when talking to a trainer with an invalid ID.

# v3.1.0 - Central Areas and Battle Improvements

## New Features

### Content

+ Added Tomasea and buildings.
+ Added Sandropolis and buildings.
+ Added Jenshire.
+ Added Routes 104, 105 and 106.
+ Added Route 107 and a building.
+ Added the Clemeville Police Station.
+ Added information to the Region map about the Monsters that can be found in each area.

## Improvements

* NPCs no longer move when they start an encounter.
* NPCs now remember the player as encountered only when they are defeated.
* The `GET /regions/{region}/areas` endpoint no longer includes Layer `chunks` and `data` for faster response.
* Loitering trainers in busy areas are now sent to Jail after a few minutes.

## Bugfixes

* `TalkTrainerDto`s are now properly validated.
* UDP clients that did not send a command in a while are now disconnected.

# v3.2.0 - Travel and Jumpable Tiles

## New Features

### Content

+ Added Jenshire buildings and decoration.
+ Added Monsters info to the Central Lake, Route 106 and 107 areas in the region map.
+ Added additional protection zones to Clemeville, Route 100, Natchester and Victory Road.
+ Added more Walkable and Roof tiles.
+ Added another Prof. to Victory Road to get more than one monster.
+ Added travel spawn points to major cities and Wesers Peak.

### Mechanics

+ Added Jumpable tiles that move the player one step further when stepped on from the right direction.
+ Trainers now track their visited areas.
+ Added `area` to `UpdateTrainerDto` to travel to other visited areas that have a spawn point.
+ Added `spawn` to `Area` that indicates if the area can be traveled to.
+ Added `spawn` query parameter to `GET /regions/{region}/areas` to filter areas that can be traveled to.
+ Added the `ping` UDP command.

## Improvements

* Optimized Route 107.
* Limited the number of UDP subscriptions per client.
* Correctly documented the type of `Trainer.npc.starters`.
* Opponents that do not make a move are now deleted after a few minutes.

## Bugfixes

* Support for rotated and mirrored tiles.
* Removed unused and deleted tilesets from Central Lake.

# v3.3.0 - Jenshire Museum

## New Features

+ Added the Jenshire Museum.
+ Added more buildings and decoration to Jenshire.
+ Added and updated more Walkable and Roof tiles.

## Bugfixes

* Fixed NPCs not following their predefined paths correctly.
* Fixed talking to NPCs marking you as encountered without winning the battle.
* Fixed the opposing trainers in Victory Road being inaccessible via the bridge.

## Documentation

* Updated the documentation for `TalkTrainerDto`.

# v3.3.1 - Bugfixes

## Improvements

* Area maps now include objects in object layers.
* Opponents no longer require unique encounter-trainer combinations in preparation for v4.

## Bugfixes

* NPCs no longer switch areas or trigger tall grass.
* Live monsters that are not in the trainer's team no longer count when checking if an opponent should be deleted.

## Documentation

* Documented the `NPCInfo.path` property.
* Improved the description for the `monster-defeated` result.

# v4.0.0 - Items

## New Features

### Content

+ Added Werningham and Dead Birds Society.
+ Added Central Lake cave.
+ Added Henrikhaven.
+ Added Simonsfield.
+ Added Route 108.
+ Added Route 109.
+ Added Route 112.
+ Added 32 items.
+ Added 100 new monsters.
+ Added terrain type map property for most areas. [STP23SRV-7](https://jira.uniks.de/browse/STP23SRV-7)

### Resources

+ Added Items that are owned by Trainers.
+ Added Item presets.
+ Added the `UseItemMove` for using items in battle.
+ Added the `Trainer.npc.sells` property for clerks.
+ Added the `Monster.status` property.

### Mechanics

+ Entering an encounter against 2 NPCs now creates two opponents for the player.
+ Added the ability to join a 1v2 encounter if no moves have been made yet.
+ NPCs with the `sells` property can buy and sell items using the Item endpoints near the NPC.
+ Monster status effects can deal damage or make ability moves fail randomly.
+ Monster status effects can be removed with items.
+ Monster attributes can be increased or decreased with items.
+ Monball items can be used to catch monsters.
+ Monboxes can be opened to win new monsters.
+ Itemboxes can be opened to win items.

## Bugfixes

* Fixed the `Doctor_2` (woman with pink hair) walking sprites. [STP23SRV-9](https://jira.uniks.de/browse/STP23SRV-9)

# v4.0.1 - Gloomy Cave Bugfixes

## Bugfixes

* Fixed walkable tiles, portals and invalid tall grass in the Gloomy Cave maps.

# v4.0.2 - Bugfixes

## Improvements

* Added a new result `monster-caught` for successful monball uses.
  > Unsuccessful uses return `item-success` because the item will be lost.
* Added the `Result.monster` property to make the affected monster unambiguous.
* NPCs now sometimes use abilities that add status effects without doing instant damage.
* Added possibility to join 1v2 encounters where the defender only has one monster.
* Added a special rate limit for item image requests.

## Bugfixes

* Opponent cleanup now happens after minutes instead of hours.
* Fixed duplication of NPC monsters with high levels due to evolution.
* Made the `types` query parameter in `GET .../trainers/:trainer/items` optional.
* Catching a monster now properly stops the encounter.
* Caught wild monsters are no longer deleted instantly.
* Fixed abilities adding wrongly spelled status effects.

# v4.1.0 - Confusion and Ell Reservoir

## New Features

### Content

+ Added actual tall grass to Wesers Peak.
+ Added the Ell Reservoir area.
+ Starter monsters now start at level 5.
+ Implemented the `confused` status.
  > When a confused monster attacks itself, the `ability-success` result will include the property `status: confused`.

### Resources

+ Added `Trainer.settings` attribute for storing client-specific settings. [STP23SRV-10](https://jira.uniks.de/browse/STP23SRV-10)
+ Added the `DELETE .../monsters/:id` endpoint. [STP23SRV-10](https://jira.uniks.de/browse/STP23SRV-10)

## Improvements

* Reduced some tileset images by 15-30% in size.
* NPCs now immediately select a new monster so the next turn can start smoothly.

## Bugfixes

* Encounters can now start even if the first monster in the team is dead.
* NPC monsters no longer receive a new random set of abilities when the server restarts.
* Fixed the `GET .../encounters` endpoint not returning any results.
* Fixed a problem where opponent deletion would not work correctly. 

# v4.2.0 - New Areas and Balancing

## New Features

### Content

+ Added the Adromere arena.
+ Added the Trench Island and cave area.
+ Added the Julianwood area and buildings.
+ Added the Route 110 area.
+ Added the Giolaxen area and buildings.
+ Added more opposing NPCs and tall grass to Victory Road.
+ Added the `stunned` status (added by Hyper Beam).
+ Added trophy items and NPCs that gift them to the player on defeat.
+ Added a way to receive gifts from passive NPCs.
+ Added new lower level abilities for fighting and dragon types.

### Resources

+ Added the `monster-forgot` result.
+ Added the `GET /regions/:region/opponents` endpoint.

## Improvements

* Improved selection of forgotten abilities.
* Improved some low level abilities.
* Different monster types now have slightly different attribute growth.
* Adjusted some abilities for better balancing.
* Greatly adjusted monster levels in Route 111 to be visited in the end game.

## Bugfixes

* Monster evolution now updates the mondex.
* Fixed many ability descriptions.
* Made the pier in Route 111 walkable.
* Item boxes can no longer contain other item boxes or monster boxes.

# v4.3.0 - Stadium and Abilities

## New Features

+ Added the Adromere Stadium.
+ Added 37 new abilities.
+ Added many new spots on piers where water monsters may appear.
+ Spread many previously unobtainable monsters across the world.
+ Added many new NPCs, including opposing ones for double encounters and passive NPCs with gifts.

## Improvements

* Adjusted many abilities for better balancing.
* Updated many tiles with Walkable and Roof properties.
* Added some decorations in the prison to avoid getting stuck. [STP23SRV-8](https://jira.uniks.de/browse/STP23SRV-8)
* Added some buildings in Werningham for padding.
* Removed water on the right of Jenshire.

## Bugfixes

* Attribute growth is now rounded correctly.
* Fixed item box randomization and improved the value of random items.
* NPCs no longer generate starter items.
* Entering a different area now sends WebSocket events.
* Deleting a monster now removes it from the trainer's team.
* NPCs now forget deleted trainers.
* Updating the opponent monster without a move after defeat now clears the results.

# v4.3.1 - Bugfixes

## Improvements

* Status effects are now removed at the start of each turn so they always have some effect.
* Expanded the protection zone in Victory Road to the whole map.

## Bugfixes

* The bridge in Route 109 can now be crossed.
* The trees in Route 106 no longer allow passing through to the map border.
* Status items now check if the monster has the status and are not used if not.
* It is no longer possible to use a monster for multiple opponents at the same time.

# v4.4.0 - Legendary Monsters

## New Features

* Spread 7 legendary monsters across the world.

## Improvements

* Updated the damage of some abilities.
* The region map now includes monster IDs of minor areas.
* Wild monsters may now spawn unevolved to allow Mondex discovery.
* Monsters now learn only the best abilities of the new level.

## Bugfixes

* Fixed a few minor problems in Route 109.
* Fixed Sandropolis to have the right size.
* Fixed some Walkable and Roof tile properties.
* NPC monsters are no longer healed when no encounter starts.

# v4.4.1 - Bugfixes

## Improvements

* Wild monsters that did not evolve yet can now do that at every level above 20.
* Added missing spawn to Julianwood.
* Added many Terrain properties to areas.
* Adjusted the damage of some abilities.

## Bugfixes

* New monsters are no longer added to the team if it is full.
* Items can no longer be used with the endpoint if the trainer is in battle.
* Made baseboards walkable to allow traversal through Adromere Arena.
* Fixed a roof in Route 106.
* Fixed the Terrain properties in some areas.
* Fixed the portals in the Adromere Arena.
* Adjusted some area map sizes.

# v4.4.2 - Bugfixes

## Improvements

* Improved portals between Werningham and Route 107.
* Improved portals and NPC placement in the Dead Birds Society building.
* Changed two NPCs to not have legendary monsters.
* Adjusted the Albertania region map with new descriptions and missing Buildings info.

## Bugfixes

* Monster attacks are now ordered by the current speed (descending).
* Made the helipad and Reuterbank entrance walkable.

# v4.4.3 - Reliable Opponent Order

## Improvements

* Item moves now always happen before ability moves.
* Opponent updates are now ordered by the attack order.
* The `monster-caught` result is now added to the wild monster opponent.
* Removed the `stunned` status because it did not have an effect.

## Bugfixes

* The `ability-failed` result now includes the ability when triggered by a status.
* Wild monsters no longer attack after being caught.
