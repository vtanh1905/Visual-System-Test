import * as d3 from 'd3'

export default (title, data) => {
    var margin = { top: 5, right: 0, bottom: 60, left: 50 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    document.querySelector("#BarChart").textContent = ''
    var svg = d3.select("#BarChart")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom));

    var chart = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var yScale = d3.scaleLinear()
        .range([height, 0]);

    var xScale = d3.scaleBand()
        .range([0, width])
        .padding(0.1);


    yScale.domain([0, d3.max(data, function (d) { return d.value; }) + 1000]);
    xScale.domain(data.map(function (d) { return d.name; }));

    chart.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d.name); })
        .attr("y", function (d) { return yScale(d.value); })
        .attr("height", function (d) { return height - yScale(d.value); })
        .attr("width", function (d) { return xScale.bandwidth(); })
        .attr("fill", "steelblue");

    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll(".textlabel")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "textlabel")
        .attr("x", function (d) { return xScale(d.name) + (xScale.bandwidth() / 2); })
        .attr("y", function (d) { return yScale(d.value) - 3; })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .text(function (d) { return d3.format(",")(d.value); });

    //adding y axis to the left of the chart
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(d3.axisLeft(yScale).tickFormat(d3.format(",")))


    //adding x axis to the bottom of chart
    svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)")

    // Tên biểu đồ
    svg.append("g")
        .attr("transform", "translate(" + (width / 2) + ", 15)")
        .append("text")
        .text(title || "")
        .style("text-anchor", "middle")
        .style("font-family", "Arial")
        .style("font-weight", "800")

}