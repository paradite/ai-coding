import { CHART_CONFIG } from '../config.js';

export function createLegend(group, width, height) {
  const legendData = [
    { label: 'Waitlist', status: 'waitlist' },
    { label: 'Contact Sales', status: 'beta' },
    { label: 'Available', status: 'available' },
    { label: 'Foundation Model', status: 'foundation' },
    { label: 'Popular', status: 'popular' },
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

  // Mobile legend items (adjust for 5 items - 3 on top row, 2 on bottom)
  const mobileLegendItems = mobileLegendGroup
    .selectAll('g')
    .data(legendData)
    .enter()
    .append('g')
    .attr('transform', (d, i) => {
      if (i < 3) {
        // First row: 3 items
        return `translate(${i * 100}, 0)`;
      } else {
        // Second row: 2 items, centered
        return `translate(${(i - 3) * 100 + 50}, 25)`;
      }
    });

  // Add circles for desktop
  desktopLegendItems
    .append('circle')
    .attr('r', (d) => (d.status === 'popular' ? 6 : 5)) // Make popular legend item larger
    .attr('fill', (d) => {
      if (d.status === 'popular') {
        return CHART_CONFIG.popular.fillColor;
      }
      return CHART_CONFIG.availability[d.status];
    })
    .attr('stroke', (d) => {
      if (d.status === 'popular') {
        return CHART_CONFIG.popular.strokeColor;
      }
      return 'none';
    })
    .attr('stroke-width', (d) => {
      if (d.status === 'popular') {
        return CHART_CONFIG.popular.strokeWidth;
      }
      return 0;
    })
    .style('opacity', (d) => (d.status === 'popular' ? 1 : 0.9));

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
    .attr('r', (d) => (d.status === 'popular' ? 6 : 5)) // Make popular legend item larger
    .attr('fill', (d) => {
      if (d.status === 'popular') {
        return CHART_CONFIG.popular.fillColor;
      }
      return CHART_CONFIG.availability[d.status];
    })
    .attr('stroke', (d) => {
      if (d.status === 'popular') {
        return CHART_CONFIG.popular.strokeColor;
      }
      return 'none';
    })
    .attr('stroke-width', (d) => {
      if (d.status === 'popular') {
        return CHART_CONFIG.popular.strokeWidth;
      }
      return 0;
    })
    .style('opacity', (d) => (d.status === 'popular' ? 1 : 0.9));

  // Add labels for mobile
  mobileLegendItems
    .append('text')
    .attr('x', 15)
    .attr('y', 0)
    .attr('dominant-baseline', 'middle')
    .text((d) => d.label);

  return { desktopLegendGroup, mobileLegendGroup };
}
