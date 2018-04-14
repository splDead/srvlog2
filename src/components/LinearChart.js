import * as d3 from 'd3';
import React from 'react';

export class LinearChart extends React.Component {
    componentDidMount() {
        let group;
        const { logs } = this.props;
        const { target } = this.refs;

        const margin = {
            top : 10,
            right : 40,
            bottom : 30,
            left : 50
        };

        const width = target.clientWidth - margin.left - margin.right;
        const heigth = (target.clientWidth / 16) * 9 - margin.top - margin.bottom;
        const parseTime = d3.timeParse('%Y-%m-%d');

        const x = d3.scaleTime()
            .domain(d3.extent(logs.map(el => parseTime(el.date))))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain(d3.extent(logs.map(el => el.count)))
            .range([heigth, 0]);

        const line = d3.line()
            .x(d => x(parseTime(d.date)) + 10)
            .y(d => y(d.count));

        group = d3.select(target)
            .append('svg')
            .attr('height', heigth + margin.top + margin.bottom)
            .attr('width', width + margin.left + margin.right)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        group.append('path')
            .attr('d', line(logs))
            .style('stroke', '#ccc')
            .style('stroke-width', 2)
            .style('fill', 'none');

        group.selectAll('circle')
            .data(logs)
            .enter()
            .append('circle')
            .attr('cx', d => x(parseTime(d.date)) + 10)
            .attr('cy', d => y(d.count))
            .attr('r', 4)
            .style('fill', 'orange');

        group.append('g')            
            .call(
                d3.axisBottom(x)
                .ticks(logs.length)
                .tickFormat(d3.timeFormat("%Y-%m-%d"))
            )
            .attr("class", "x-axis")
            .attr('transform', `translate(10, ${heigth + 10})`);

        d3.selectAll('g.x-axis g.tick')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', -heigth - 10)
            .style('stroke', 'rgba(0, 0, 0, .05)')

        group.append('g')
            .call(
                d3.axisLeft(y)
                .ticks(7)
                .tickFormat(d3.format('.2s'))
            )
            .attr('transform', `translate(-10, 0)`);
    }

    render() {
        return (
            <div className='border-top' ref='target'></div>
        )
    }
}
