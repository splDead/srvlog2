// @flow

import * as d3 from 'd3';
import React from 'react';
import type { StatisticsLogType } from '../types/types';

import './LinearChart.css';

type Props = {
    logs: Array<StatisticsLogType>
};

export class LinearChart extends React.Component<Props> {

    refreshChart = () => {
        d3.select('svg').remove();
        this.showChart();
    };

    showChart = () => {
        let group;
        const { logs } = this.props;
        const { target } = this.refs;

        const margin = {
            top : 10,
            right : 40,
            bottom : 30,
            left : 50
        };

        const addTooltipDiv = () => {
            let tooltipDiv = d3.select('body').append('div')
                .attr('class', 'tooltip')
                .style('opacity', 0);

            return tooltipDiv;
        };

        const width = target.clientWidth - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
        const parseTime = d3.timeParse('%Y-%m-%d');

        const x = d3.scaleTime()
            .domain(d3.extent(logs.map(el => parseTime(el.date))))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain(d3.extent(logs.map(el => el.count)))
            .range([height, 0]);

        const line = d3.line()
            .x(d => x(parseTime(d.date)) + 10)
            .y(d => y(d.count));

        group = d3.select(target)
            .append('svg')
            .attr('height', height + margin.top + margin.bottom + 40)
            .attr('width', width + margin.left + margin.right)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        group.append('path')
            .attr('d', line(logs))
            .style('stroke', '#ccc')
            .style('stroke-width', 2)
            .style('fill', 'none');

        let tooltipDiv = addTooltipDiv();

        group.selectAll('circle')
            .data(logs)
            .enter()
            .append('circle')
            .attr('cx', d => x(parseTime(d.date)) + 10)
            .attr('cy', d => y(d.count))
            .attr('r', 4)
            .attr('class', 'tooltip__circle')
            .style('fill', 'orange')
            .on('mouseover', d => {
                tooltipDiv.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltipDiv.html(`
                        <div class='tooltip__title'>
                            ${d.date}
                        </div>
                        <div class='tooltip__count'>
                            Counts of logs = ${d.count}
                        </div>
                    `)
                    .style('left', (d3.event.pageX - 150) + 'px')
                    .style('top', (d3.event.pageY - 28) + 'px');
            })
            .on('mouseout', () => {
                tooltipDiv.transition()
                    .duration(500)
                    .style('opacity', 0);
            });

        group.append('g')            
            .call(
                d3.axisBottom(x)
                .ticks(logs.length)
                .tickFormat(d3.timeFormat("%Y-%m-%d"))
            )
            .attr("class", "x-axis")
            .attr('transform', `translate(10, ${height + 10})`);

        d3.selectAll('g.x-axis g.tick')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', -height - 10)
            .style('stroke', 'rgba(0, 0, 0, .05)');

        d3.selectAll('g.x-axis g.tick text')
            .attr('transform', `translate(-25, 20) rotate(-45)`);

        group.append('g')
            .call(
                d3.axisLeft(y)
                .ticks(7)
                .tickFormat(d3.format('.2s'))
            )
            .attr('transform', `translate(-10, 0)`);

        d3.select(window)
            .on("resize", () => {
                this.refreshChart();
            });
    };

    componentDidMount() {
        this.showChart();        
    }

    componentDidUpdate() {
        this.refreshChart();
    }

    render() {
        return (
            <div className='border-top' ref='target'></div>
        )
    }
}
