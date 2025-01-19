import { CHART_CONFIG } from '../config.js';

export function createLegend(group, width, height) {
  const legendData = [
    { label: 'Waitlist', status: 'waitlist' },
    { label: 'Beta / Contact Sales', status: 'beta' },
    { label: 'Available', status: 'available' },
    { label: 'Foundation Model', status: 'foundation' },
  ];

  const legendGroup = group
    .append('g')
    .attr('class', 'legend')
    .attr('transform', `translate(20, ${height - 15})`);

  const legendItems = legendGroup
    .selectAll('g')
    .data(legendData)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${-i * 20})`);

  // Add circles
  legendItems
    .append('circle')
    .attr('r', 4)
    .attr('fill', (d) => CHART_CONFIG.availability[d.status])
    .style('opacity', 0.9);

  // Add labels
  legendItems
    .append('text')
    .attr('x', 12)
    .attr('y', 0)
    .attr('dominant-baseline', 'middle')
    .style('font-size', '0.7rem')
    .style('font-weight', '300')
    .style('letter-spacing', '0.05rem')
    .style('fill', 'hsl(184, 30%, 85%)')
    .text((d) => d.label);

  return legendGroup;
}
