'use strict';

var inherits = require('inherits');
var Timer = require('./Timer');

module.exports = TickerRange;

function TickerRange (props) {
  Timer.call(this, props);

  this.minValue = props.minValue;
  this.maxValue = props.maxValue;
  this.setInterval(props.initialValue);
  this.textLabel = props.label;

  this.el = this.render();
}

inherits(TickerRange, Timer);

TickerRange.prototype.render = function () {
  var inputEl = document.createElement('input');
  var attrs = {
    type: 'range',
    min: this.minValue,
    max: this.maxValue,
    value: this.interval
  };

  Object.keys(attrs).forEach(function (k) {
    inputEl.setAttribute(k, attrs[k]);
  });

  var labelEl = document.createElement('label');
  var groupEl = document.createElement('div');

  labelEl.textContent = this.textLabel;

  inputEl.addEventListener('change', this.onIntervalChange.bind(this));

  groupEl.appendChild(inputEl);
  groupEl.appendChild(labelEl);

  return groupEl;
};

TickerRange.prototype.onIntervalChange = function (e) {
  var newInterval = e.target.value;
  if (newInterval !== this.interval) {
    this.setInterval(newInterval);
  }
};

