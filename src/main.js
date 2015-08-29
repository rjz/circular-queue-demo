'use strict';

var Demo = require('./Demo');
var TickerRange = require('./TickerRange');
var cssStr = require('./styles/demo.css');

function createButton (caption, callback) {
  var control = document.createElement('button');
  control.textContent = caption;
  control.addEventListener('click', callback);
  return control;
}

function installDemo (rootEl, demoConfig) {

  rootEl.innerHTML = template(demoConfig.title);

  var controlsEl = rootEl.querySelector('.js-controls');
  var demo = new Demo(rootEl.querySelector('.js-demo'));
  demoConfig.setup(demo, controlsEl);

  var reset = function () {
    demo.cleanup();
    demo.setup();
    demoConfig.reset(demo);
  };

  controlsEl.appendChild(createButton('reset', reset));

  demoConfig.reset(demo);
}

var template = function (caption) {
  var templateStr = [
    '<figure class="cq-demo">',
      '<figcaption>{caption}</figcaption>',
      '<div class="js-demo"></div>',
      '<nav class="js-controls"></nav>',
    '</figure>'
  ].join('').replace('{caption}', caption);

  // hack styles in with the template. Attaching once would be cleaner...
  return '<style type="text/css">' + cssStr + '</style>\n' + templateStr;
};

var demos = {
  basic: {
    title: 'Basic operations',
    setup: function (demo, controlsEl) {
      controlsEl.appendChild(createButton('offer', demo.step.bind(demo)));
      controlsEl.appendChild(createButton('poll', demo.poll.bind(demo)));
    },
    reset: function (demo) {
      demo.step();
      demo.step();
      demo.step();
    }
  },
  eviction: {
    title: 'Eviction',
    setup: function (demo, controlsEl) {
      controlsEl.appendChild(createButton('offer', demo.step.bind(demo)));
      controlsEl.appendChild(createButton('poll', demo.poll.bind(demo)));
    },
    reset: function (demo) {
      demo.step();
      demo.step();
      demo.step();
      demo.step();
      demo.step();
      demo.step();
      demo.step();
      demo.step();
    }
  },
  buffering: {
    title: 'Buffering',
    setup: function (demo, controlsEl) {
      var s1 = new TickerRange({
        label: '1/production',
        minValue: 100,
        maxValue: 2000,
        initialValue: 1000,
        onTic: function () {
          demo.step();
        }
      });

      var s2 = new TickerRange({
        label: '1/consumption',
        minValue: 100,
        maxValue: 2000,
        initialValue: 1000,
        onTic: function () {
          demo.poll();
        }
      });

      var play = function () {
        s1.play();
        s2.play();
      };

      var pause = demo.pause = function () {
        s1.pause();
        s2.pause();
      };

      controlsEl.appendChild(s1.el);
      controlsEl.appendChild(s2.el);

      controlsEl.appendChild(createButton('play', play));
      controlsEl.appendChild(createButton('pause', pause));
    },

    reset: function (demo) {
      demo.pause();
      demo.step();
      demo.step();
      demo.step();
    }
  }
};

window.addEventListener('DOMContentLoaded', function () {
  installDemo(document.getElementById('cq-demo-buffering'), demos.buffering);
  installDemo(document.getElementById('cq-demo-basic'), demos.basic);
  installDemo(document.getElementById('cq-demo-eviction'), demos.eviction);
});

