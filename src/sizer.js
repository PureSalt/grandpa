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

/* jshint maxstatements:17 */
/* globals document,window */

'use strict';

import EVENT from './event';
import PUB_SUB from './pubSub';

let _canvasElement = null;

const SIZER = {
  defaultHeight: 720,
  defaultWidth: 1280,
  height: 720,
  width: 1280,
  maxHeight: 1080,
  maxWidth: 1920,
  ratio: 1,
  aspect: {
    height: 9,
    width: 16
  },

  /**
   * Set what element to use for our sizer.
   *
   * @param {HTMLElement} canvasElement
   * @returns {SIZER}
   */
  init(canvasElement) {
    _canvasElement = canvasElement;
    return this;
  },

  /**
   * Get the desired sizing based on size of the window.
   *
   * @returns {SIZER}
   */
  update() {
    if (_canvasElement === null) {
      return this;
    }
    let maxHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    let maxWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (maxHeight === this.maxHeight && maxWidth === this.maxWidth) {
      return this;
    }
    this.maxHeight = maxHeight;
    this.maxWidth = maxWidth;

    let height = this.maxHeight;
    let width = this.maxWidth;
    if (height / width < this.aspect.height / this.aspect.width) {
      width = Math.round((height * 16) / 9);
    } else {
      height = Math.round((width * 9) / 16);
    }
    this.height = height;
    this.width = width;
    this.ratio = this.height / this.defaultHeight;

    _canvasElement.height = this.height;
    _canvasElement.width = this.width;
    _canvasElement.style.height = this.height + 'px';
    _canvasElement.style.width = this.width + 'px';

    PUB_SUB.publish(EVENT.RESIZE, this);
    return this;
  },

  /**
   * Get the size of our pixel in relation to the ratio.
   *
   * @param {Number} pixel
   * @returns {Number}
   */
  relativeSize(pixel) {
    return Math.round(pixel * this.ratio);
  }
};

export default SIZER;

(() => {
  const throttle = (type, name, obj) => {
    obj = obj || window;
    let running = false;
    const func = () => {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  /* init - you can init any event */
  throttle('resize', 'optimizedResize');
})();

// handle event
window.addEventListener('optimizedResize', () => {
  SIZER.update();
});