'use strict';

var circularQueue = require('circular-queue');
var demoVis = require('./demoVis');

var QUEUE_CAPACITY = 8;

function Demo (rootEl) {
  this.messageEl = document.createElement('pre');
  this.rootEl = rootEl;
  this.rootEl.appendChild(this.messageEl);

  this._updateVisualization = demoVis(200, 200, this.rootEl);

  this.setup();
}

module.exports = Demo;

Demo.prototype.setup = function () {
  this.nextItem = 0;
  this.queue = new circularQueue(QUEUE_CAPACITY);
  this.queue.on('evict', function (item) {
    this.messageEl.textContent = 'Evicted: ' + item;
  }.bind(this));
};

Demo.prototype.cleanup = function () {
  this.queue.removeAllListeners('evict');
};

Demo.prototype.redraw = function () {
  var i, projectedData = [];
  for (i = 0; i < this.queue.maxSize; i++) {
    projectedData[i] = {
      index: i,
      value: this.queue._items[i],
      head: (i == this.queue._head)
    };
  }

  this._updateVisualization(projectedData);
};

Demo.prototype.step = function () {
  if (this.nextItem++ > 30) {
    this.nextItem = 0;
  }

  this.queue.offer(this.nextItem);
  this.redraw();
};

Demo.prototype.poll = function () {
  this.queue.poll();
  this.redraw();
};

