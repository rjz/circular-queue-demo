'use strict';

module.exports = Timer;

function Timer (props) {
  this.onTic = props.onTic;
  this.interval = props.interval;
  this._timeoutHandle = null;
}

Timer.prototype.setInterval = function (newInterval) {
  if (this._timeoutHandle) {
    clearTimeout(this._timeoutHandle);
    if (this.interval < newInterval) {
      setTimeout(function () {
        this.play();
      }.bind(this), (newInterval - this.interval));
    }
    else {
      this.play();
    }
  }
  this.interval = newInterval;
};

Timer.prototype.play = function () {

  var handler = function () {
    this.onTic();
    this._timeoutHandle = setTimeout(handler, this.interval);
  }.bind(this);

  if (this._timeoutHandle) {
    clearTimeout(this._timeoutHandle);
  }

  handler();
};

Timer.prototype.pause = function () {
  if (this._timeoutHandle) {
    clearTimeout(this._timeoutHandle);
  }
};

