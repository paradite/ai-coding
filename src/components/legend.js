import { CHART_CONFIG } from '../config.js';

export function createLegend(group, width, height) {
  const legendData = [
    { label: 'Waitlist', status: 'waitlist' },
    { label: 'Beta / Contact Sales', status: 'beta' },
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
    .attr('transform', `translate(${width / 2 - 140}, ${height + 15})`);

  // Desktop legend items (vertical layout)
  const desktopLegendItems = desktopLegendGroup
    .selectAll('g')
    .data(legendData)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0, ${i * 20})`);

  // Mobile legend items (2x2 grid layout)
  const mobileLegendItems = mobileLegendGroup
    .selectAll('g')
    .data(legendData)
    .enter()
    .append('g')
    .attr('transform', (d, i) => {
      const row = Math.floor(i / 2);
      const col = i % 2;
      return `translate(${col * 140}, ${row * 20})`;
    });

  // Add circles for desktop
  desktopLegendItems
    .append('circle')
    .attr('r', 4)
    .attr('fill', (d) => CHART_CONFIG.availability[d.status])
    .style('opacity', 0.9);

  // Add labels for desktop
  desktopLegendItems
    .append('text')
    .attr('x', 12)
    .attr('y', 0)
    .attr('dominant-baseline', 'middle')
    .style('font-size', '0.75rem')
    .style('font-weight', '300')
    .style('letter-spacing', '0.05rem')
    .style('fill', 'hsl(184, 30%, 85%)')
    .text((d) => d.label);

  // Add circles for mobile
  mobileLegendItems
    .append('circle')
    .attr('r', 4)
    .attr('fill', (d) => CHART_CONFIG.availability[d.status])
    .style('opacity', 0.9);

  // Add labels for mobile
  mobileLegendItems
    .append('text')
    .attr('x', 12)
    .attr('y', 0)
    .attr('dominant-baseline', 'middle')
    .style('font-size', '0.6rem')
    .style('font-weight', '300')
    .style('letter-spacing', '0.05rem')
    .style('fill', 'hsl(184, 30%, 85%)')
    .text((d) => d.label);

  return { desktopLegendGroup, mobileLegendGroup };
}
