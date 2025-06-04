import { CHART_CONFIG } from '../config.js';

export function createDataPoints(group, data, domainScale, levelScale, width, height) {
  // Create scales for each domain's x values
  const domainXScales = {
    webdev: d3
      .scaleLinear()
      .domain([0, 1])
      .range([0, width / 2]),
    general: d3
      .scaleLinear()
      .domain([1, 2])
      .range([0, width / 2]),
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
      if (d.domain === 'general') {
        baseX += width / 2;
      }

      return `translate(${baseX}, ${yScale(d.y)})`;
    });

  // Add circles
  dataPointsGroup
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', (d) => (d.leader ? 6 : 4.5)) // Make leader items noticeably larger
    .attr('fill', (d) => {
      if (d.leader) {
        return CHART_CONFIG.leader.fillColor;
      }
      return CHART_CONFIG.availability[d.status];
    })
    .attr('stroke', (d) => {
      if (d.leader) {
        return CHART_CONFIG.leader.strokeColor;
      }
      return d.isFoundationModel ? CHART_CONFIG.foundation.strokeColor : 'none';
    })
    .attr('stroke-width', (d) => {
      if (d.leader) {
        return CHART_CONFIG.leader.strokeWidth;
      }
      return d.isFoundationModel ? CHART_CONFIG.foundation.strokeWidth : 0;
    })
    .style('opacity', (d) => (d.leader ? 1 : 0.9)); // Make leader items fully opaque

  // Add labels
  dataPointsGroup
    .append('text')
    .attr('x', (d) => (d.leader ? 10 : 8)) // Adjust spacing for larger leader circles
    .attr('y', 0)
    .attr(
      'class',
      (d) => `name ${d.domain === 'general' ? 'name-general' : 'name-webdev'}`
    )
    .text((d) => d.name)
    .attr('dominant-baseline', 'central')
    .style('font-size', '0.8rem') // Keep consistent text size
    .style('font-weight', '400') // Keep consistent text weight
    .style('letter-spacing', '0.05rem')
    .style('fill', 'hsl(184, 30%, 85%)'); // Keep consistent text color

  return dataGroup;
}
