/**
 * NUMBER ONE GRANDPA
 *
 * LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@puresalt.gg so we can send you a copy immediately.
 *
 */

/**
 * ENUM covering expected input keys from a player.
 *
 * **Input.KEY:**
 * ```
 * DIRECTIONAL
 * RIGHT
 * LEFT
 * UP
 * DOWN
 * PUNCH
 * KICK
 * JUMP
 * CROUCH
 * MENU
 * DEBUG
 * ```
 *
 * @module input/key
 */

'use strict';

const KEY = {
  DIRECTIONAL: 'DIRECTIONAL',
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  UP: 'UP',
  DOWN: 'DOWN',
  PUNCH: 'PUNCH',
  KICK: 'KICK',
  JUMP: 'JUMP',
  CROUCH: 'CROUCH',
  MENU: 'MENU',
  DEBUG: 'DEBUG'
};
Object.freeze(KEY);

export default KEY;
