import React, { useEffect } from 'react'
import * as d3 from 'd3'
import './style.css'

function BarChart() {

  useEffect(() => {
    const data = [{
      name: "1123123",
      value: 45
    },
    {
      name: "2asdasdas",
      value: 47
    }
    ]

    const arrColor = ["#6af543", "#fc13ce", "#6c3be5", "#b48520", "#f30a38", "#65ddda", "#2d804c", "#ac6dbf",
      "#6901a4", "#842e16", "#687f15", "#4b0ce0", "#6df1ac", "#e7b98f", "#3995a1", "#760c7c", "#9ac6a9"
    ];

    var svg = d3.select("svg"),
      margin = 400,
      width = svg.attr("width") - margin,
      height = svg.attr("height") - margin


    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
      yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
      .attr("transform", "translate(" + 100 + "," + 100 + ")");

    xScale.domain(data.map(function (d) {
      return d.name;
    }));

    yScale.domain([0, d3.max(data, function (d) {
      return getCeilNumber(d.value);
    })]);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .append("text")
      .attr("y", height - 265)
      .attr('x', width / 2)
      .attr("text-anchor", "middle")
      .text("2018");

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .append("text")
      .attr("y", height - 230)
      .attr('x', width / 2)
      .attr("text-anchor", "middle")
      .attr("stroke", "black")
      .text("Year");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("fill", function (d, i) {
        return arrColor[i];

      })
      .attr("width", xScale.bandwidth())
      .attr("x", function (d) {
        console.log(xScale(d.name));

        return xScale(d.name);
      })
      .attr("y", function (d) {
        return yScale(d.value);
      })
      .attr("height", function (d) {
        return height - yScale(d.value);
      }).style("z-index", function (d) {
        return 999;
      });


    svg.append('g')
      .attr('class', 'grid')
      .attr("transform", "translate(" + 100 + "," + 100 + ")")
      .call(d3.axisLeft()
        .scale(yScale).tickFormat(function (d) {
          return d;
        })
        .ticks(2)
        .tickSize(-width, 0, 0)

      )

    //Make legend
    // var n = data.length / 2;
    // var itemWidth = 100;
    // var itemHeight = 500;

    // let total = 0;

    // var legend = svg.selectAll(".legend")
    //   .data(data)
    //   .enter()
    //   .append("g")
    //   .attr("transform", function (d, i) {
    //     const result = "translate(" + total + "," + itemHeight + ")"
    //     total += d.name.length * 8 + 30;
    //     return result;
    //   })
    //   .attr("class", "legend");

    // var rects = legend.append('rect')
    //   .attr("width", 15)
    //   .attr("height", 15)
    //   .attr("fill", function (d, i) {
    //     return arrColor[i];;
    //   });

    // var text = legend.append('text')
    //   .attr("x", 20)
    //   .attr("y", 14)
    //   .text(function (d) {
    //     return d.name;
    //   });


    function getCeilNumber(value) {
      let len = value.toString().length;
      return Math.ceil(value / Math.pow(10, len - 1)) * Math.pow(10, len - 1);
    }
  })

  return (
    <div>
      BarChart
      <svg width="1800" height="700"></svg>
    </div>
  )
}

export default BarChart
