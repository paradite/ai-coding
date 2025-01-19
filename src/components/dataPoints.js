import { CHART_CONFIG } from '../config.js';

export function createDataPoints(group, data, domainScale, levelScale, width, height) {
  // Create scales for each domain's x values
  const domainXScales = {
    frontend: d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, width / 3]),
    fullstack: d3
      .scaleLinear()
      .domain([1, 2])
      .range([0, width / 3]),
    general: d3
      .scaleLinear()
      .domain([2, 3])
      .range([0, width / 3]),
  };

  const yScale = d3
    .scaleLinear()
    .domain([0, 5]) // Update domain to match our 0-5 range
    .range([height, 0]); // Invert range to match SVG coordinates

  const dataGroup = group.append('g').attr('class', 'data');

  const dataPointsGroup = dataGroup
    .selectAll('g.data-point')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'data-point')
    .attr('transform', (d) => {
      // Get the appropriate x scale for the domain
      const xScale = domainXScales[d.domain];
      // Calculate x position within quadrant
      let baseX = xScale(d.x);

      // Offset x based on domain
      if (d.domain === 'fullstack') {
        baseX += width / 3;
      } else if (d.domain === 'general') {
        baseX += (2 * width) / 3;
      }

      return `translate(${baseX}, ${yScale(d.y)})`;
    });

  // Add circles
  dataPointsGroup
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 4.5)
    .attr('fill', (d) => CHART_CONFIG.availability[d.status])
    .attr('stroke', (d) =>
      d.isFoundationModel ? CHART_CONFIG.foundation.strokeColor : 'none'
    )
    .attr('stroke-width', (d) =>
      d.isFoundationModel ? CHART_CONFIG.foundation.strokeWidth : 0
    )
    .style('opacity', 0.9);

  // Add labels
  dataPointsGroup
    .append('text')
    .attr('x', 8)
    .attr('y', 0)
    .attr('class', 'name')
    .text((d) => d.name)
    .attr('dominant-baseline', 'central')
    .style('font-size', '0.65rem')
    .style('font-weight', '300')
    .style('letter-spacing', '0.05rem')
    .style('fill', 'hsl(184, 30%, 85%)');

  return dataGroup;
}
