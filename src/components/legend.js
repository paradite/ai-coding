import { CHART_CONFIG } from '../config.js';

export function createLegend(group, width, height) {
  const legendData = [
    { label: 'Waitlist', status: 'waitlist' },
    { label: 'Contact Sales', status: 'beta' },
    { label: 'Available', status: 'available' },
    { label: 'Foundation Model', status: 'foundation' },
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

  // Mobile legend items (2x2 grid layout)
  const mobileLegendItems = mobileLegendGroup
    .selectAll('g')
    .data(legendData)
    .enter()
    .append('g')
    .attr('transform', (d, i) => {
      const row = Math.floor(i / 2);
      const col = i % 2;
      return `translate(${col * 160}, ${row * 25})`;
    });

  // Add circles for desktop
  desktopLegendItems
    .append('circle')
    .attr('r', 5)
    .attr('fill', (d) => CHART_CONFIG.availability[d.status])
    .style('opacity', 0.9);

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
    .attr('r', 5)
    .attr('fill', (d) => CHART_CONFIG.availability[d.status])
    .style('opacity', 0.9);

  // Add labels for mobile
  mobileLegendItems
    .append('text')
    .attr('x', 15)
    .attr('y', 0)
    .attr('dominant-baseline', 'middle')
    .text((d) => d.label);

  return { desktopLegendGroup, mobileLegendGroup };
}
