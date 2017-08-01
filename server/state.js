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

'use strict';

const _ = require('lodash');

/** @TODO Transfer this to a datastore and add authentication on top of this router. */
const State = (function() {
  const _data = {};

  return {
    /**
     * Get all of the possible saved states.
     *
     * @returns {Array}
     */
    all: () => {
      return Object.keys(_data);
    },

    /**
     * Get our data if it exists.
     *
     * @param {String} id
     * @returns {Object|false}
     */
    get: (id) => {
      if (!_data[id]) {
        return false;
      }
      return _.extend({id: id}, _data[id]);
    },

    /**
     * See if a state exists.
     *
     * @param {String} id
     * @returns {Boolean}
     */
    has: (id) => {
      return typeof _data[id] !== 'undefined';
    },

    /**
     * Remove a state.
     *
     * @param {String} id
     * @returns {Boolean}
     */
    remove: (id) => {
      if (!_data[id]) {
        return false;
      }
      delete _data[id];
      return true;
    },

    /**
     * Save our state.
     *
     * @param {String} id
     * @param {Object} data
     */
    save: (id, data) => {
      _data[id] = _.extend(_data[id], data);
      if (_data[id].id) {
        delete _data[id].id;
      }
    }
  };
})();

module.exports = State;