'use strict';

var COLORS = {
  white : '#fff',
  gray  : '#f0f0f0',
  black : '#231f20',
  blue  : '#1982d1'
};

function sliceColor (d) {
  if (d.data.head) {
    return COLORS.blue;
  }
  else if (typeof d.data.value === 'number') {
    return COLORS.black;
  }
  else {
    return COLORS.gray;
  }
}

function sliceKey (d) {
  return '' + d.data.index + d.data.value + d.data.head;
}

function sliceLabel (d) {
  return d.data.value;
}

module.exports = function (width, height, el) {

  var radius = Math.min(width, height) / 2;

  var svg = d3.select(el).append("svg")
    .attr("width", width)
    .attr("height", height);

  var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius - 30);

  var pie = d3.layout.pie()
    .padAngle(0.05)
    .value(function () { return 1; });

  return function update (data) {

    var g = svg.selectAll('.arc')
      .data(pie(data), sliceKey);

    var enteringGroup = g.enter()
      .append('g')
        .attr('class', 'arc')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    enteringGroup.append('path')
      .attr('d', arc)
      .attr('fill', sliceColor);

    enteringGroup.append('text')
     .attr('transform', function (d) { return 'translate(' + arc.centroid(d) + ')'; })
     .attr('dy', '.35em')
     .style('text-anchor', 'middle')
     .style('fill', COLORS.white)
     .text(sliceLabel);

    g.selectAll('path')
      .attr('fill', sliceColor);

    g.exit().remove();
  };
};

