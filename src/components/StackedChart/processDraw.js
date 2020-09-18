import * as d3 from 'd3'

export default (keys, data) => {
    // var names = [...new Set(data.map(d => d.name))]

    var svg = d3.select("#chart"),
        margin = { top: 35, left: 35, bottom: 0, right: 0 },
        width = document.querySelector('#chart').parentElement.parentElement.clientWidth - margin.left - margin.right,
        height = document.querySelector('#chart').parentElement.parentElement.clientHeight - margin.top - margin.bottom;


    var x = d3.scaleBand()
        .range([margin.left, width - margin.right])
        .padding(0.1)

    var y = d3.scaleLinear()
        .rangeRound([height - margin.bottom, margin.top])

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .attr("class", "x-axis")

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .attr("class", "y-axis")

    var z = d3.scaleOrdinal()
        .range(["steelblue", "darkorange", "lightblue"])
        .domain(keys);

    data.forEach(function (d) {
        d.total = d3.sum(keys, k => +d[k])
        return d
    })

    y.domain([0, d3.max(data, d => d3.sum(keys, k => +d[k]))]).nice();

    svg.selectAll(".y-axis").transition()
        .call(d3.axisLeft(y).ticks(null, "s"))

    x.domain(data.map(d => d.name));

    svg.selectAll(".x-axis").transition()
        .call(d3.axisBottom(x).tickSizeOuter(0))

    // Col
    var group = svg.selectAll("g.layer")
        .data(d3.stack().keys(keys)(data), d => d.key)

    group.exit().remove()

    group.enter().append("g")
        .classed("layer", true)
        .attr("fill", d => z(d.key));

    var bars = svg.selectAll("g.layer").selectAll("rect")
        .data(d => d, e => e.data.name);

    bars.exit().remove()

    bars.enter().append("rect")
        .attr("width", x.bandwidth())
        .merge(bars)
        .transition()
        .attr("x", d => x(d.data.name))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))

    var text = svg.selectAll(".text")
        .data(data, d => d.name);

    text.exit().remove()

    // Text in top Col
    text.enter().append("text")
        .attr("class", "text")
        .attr("text-anchor", "middle")
        .merge(text)
        .transition()
        .attr("x", d => x(d.name) + x.bandwidth() / 2)
        .attr("y", d => y(d.total) - 5)
        .text(d => d.total)
}