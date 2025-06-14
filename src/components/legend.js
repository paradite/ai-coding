import { CHART_CONFIG } from '../config.js';

export function createLegend(group, width, height) {
  const legendData = [
    { label: 'Waitlist', status: 'waitlist' },
    { label: 'Contact Sales', status: 'beta' },
    { label: 'Available', status: 'available' },
    // { label: 'Foundation Model', status: 'foundation' },
    { label: 'Leader', status: 'leader' },
  ];

  // Create two legend groups - one for desktop (right side) and one for mobile (bottom)
  const desktopLegendGroup = group
    .append('g')
    .attr('class', 'legend legend-desktop')
    .attr('transform', `translate(${width + 20}, 20)`);

  const mobileLegendGroup = group
    .append('g')
    .attr('class', 'legend legend-mobile')
    .attr('transform', `translate(${width / 2 - 140}, ${height + 24})`);

  // Desktop legend items (vertical layout)
  const desktopLegendItems = desktopLegendGroup
    .selectAll('g')
    .data(legendData)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${i * 25})`);

  // Mobile legend items (adjust for 2 items - 2 on top row, 2 on bottom)
  const mobileLegendItems = mobileLegendGroup
    .selectAll('g')
    .data(legendData)
    .enter()
    .append('g')
    .attr('transform', (d, i) => {
      if (i < 2) {
        // First row: 2 items
        return `translate(${i * 140}, 0)`;
      } else {
        // Second row: 2 items, centered
        return `translate(${(i - 2) * 140}, 25)`;
      }
    });

  // Add circles for desktop
  desktopLegendItems
    .append('circle')
    .attr('r', (d) => (d.status === 'leader' ? 6 : 5)) // Make leader legend item larger
    .attr('fill', (d) => {
      if (d.status === 'leader') {
        return CHART_CONFIG.leader.fillColor;
      }
      return CHART_CONFIG.availability[d.status];
    })
    .attr('stroke', (d) => {
      if (d.status === 'leader') {
        return CHART_CONFIG.leader.strokeColor;
      }
      return 'none';
    })
    .attr('stroke-width', (d) => {
      if (d.status === 'leader') {
        return CHART_CONFIG.leader.strokeWidth;
      }
      return 0;
    })
    .style('opacity', (d) => (d.status === 'leader' ? 1 : 0.9));

  // Add labels for desktop
  desktopLegendItems
    .append('text')
    .attr('x', 15)
    .attr('y', 0)
    .attr('dominant-baseline', 'middle')
    .text((d) => d.label);

  // Add circles for mobile
  mobileLegendItems
    .append('circle')
    .attr('r', (d) => (d.status === 'leader' ? 6 : 5)) // Make leader legend item larger
    .attr('fill', (d) => {
      if (d.status === 'leader') {
        return CHART_CONFIG.leader.fillColor;
      }
      return CHART_CONFIG.availability[d.status];
    })
    .attr('stroke', (d) => {
      if (d.status === 'leader') {
        return CHART_CONFIG.leader.strokeColor;
      }
      return 'none';
    })
    .attr('stroke-width', (d) => {
      if (d.status === 'leader') {
        return CHART_CONFIG.leader.strokeWidth;
      }
      return 0;
    })
    .style('opacity', (d) => (d.status === 'leader' ? 1 : 0.9));

  // Add labels for mobile
  mobileLegendItems
    .append('text')
    .attr('x', 15)
    .attr('y', 0)
    .attr('dominant-baseline', 'middle')
    .text((d) => d.label);

  return { desktopLegendGroup, mobileLegendGroup };
}
