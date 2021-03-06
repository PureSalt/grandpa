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

/** @module debug */

'use strict';

import INPUT_TYPE from './input/type';
import {lookup} from './input/key/lookup';
import MathUtility from './math';

const _movementKeys = [
  'crouching',
  'facing',
  'kicking',
  'punching',
  'jumping',
  'moving',
  'running',
  'stunned'
];
Object.freeze(_movementKeys);

let _overlay = null;
let _displayed = false;

/**
 * Debugging output.
 *
 * @alias module:debug
 */
const debug = {
  /**
   * Start up our debugger.
   *
   * @param {Boolean=} [display=false] Whether we should display our debugger or not on start.
   */
  init(display) {
    if (_overlay) {
      return;
    }
    _displayed = display;
    _overlay = document.createElement('div');
    _overlay.id = 'debug-output';
    document.body.appendChild(_overlay);
  },

  /**
   * Render a state update.
   *
   * @param {module:sprite/player} player Our player's sprite
   * @param {module:input/state} inputState What our current input state is
   * @param {Number} runtime When our render was triggered in relation to the start of our game loop
   * @param {Number} fps FPS we hit last loop
   */
  update(player, inputState, runtime, fps) {
    if (!_overlay) {
      return;
    }
    if (!_displayed) {
      _overlay.style.display = 'none';
      return;
    }
    _overlay.style.display = 'block';

    const inputConfig = inputState.getConfig();
    const inputType = inputConfig.type;
    const definedKeys = inputState.getConfig().keys;
    const keys = [
      '<strong>' + (inputState.getConfig().type === INPUT_TYPE.KEYBOARD ? 'KEYS' : 'BUTTONS') + ':</strong><hr>'
    ];
    for (let i = 0, count = definedKeys.length; i < count; ++i) {
      keys.push(stylizeKey(
        definedKeys[i].input)
        + '<span class="on">'
        + (inputType === INPUT_TYPE.KEYBOARD ? lookup(definedKeys[i].key) : '#' + definedKeys[i].element.id)
        + '</span>'
      );
    }

    const stats = [
      '<strong>STATE:</strong><hr>',
      stylizeKey('runtime') + stylizeValue(MathUtility.round((runtime / 1000) * 100) / 100),
      stylizeKey('fps') + stylizeValue(MathUtility.round(fps * 100) / 100)
    ];

    for (let i = 0, count = _movementKeys.length; i < count; ++i) {
      const key = _movementKeys[i];
      stats.push(stylizeKey(key) + stylizeValue(player.movement[key]));
    }
    stats.push(stylizeKey('location') + stylizeValue('(' + player.x + ',' + player.y + ')'));

    _overlay.innerHTML = '<pre>' + stats.join('\n') + '</pre><pre>' + keys.join('\n') + '</pre><br>';
  },

  /**
   * Toggle the state of our debugger.
   */
  toggle(pressed) {
    if (!_overlay || !pressed) {
      return;
    }
    _displayed = !_displayed;
  }
};
Object.freeze(debug);

export default debug;

/* istanbul ignore next */
/**
 * Stylize a key.
 *
 * @param {*} key
 * @returns {String}
 * @ignore
 */
function stylizeKey(key) {
  const length = 9;
  let padding = '';
  for (let i = 0; i < length; ++i) {
    padding = padding + ' ';
  }

  return '<strong>' + String(key.toUpperCase() + padding).slice(0, length) + ' : </strong>';
}

/* istanbul ignore next */
/**
 * Stylize a value.
 *
 * @param {*} value
 * @returns {String}
 * @ignore
 */
function stylizeValue(value) {
  if (value === null) {
    return '<em>null</em>';
  } else if (value === false || value === 0) {
    return '<span class="off">' + value + '</span>';
  } else {
    return '<span class="on">' + value + '</span>';
  }
}
