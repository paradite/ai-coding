import { CHART_CONFIG } from '../config.js';

export function createQuadrants(group, width, height) {
  const quadrantsGroup = group.append('g').attr('class', 'quadrants');

  // Create quadrants based on domains and levels
  const quadrants = [
    { name: 'Frontend', x: 0, y: 0 },
    { name: 'Fullstack', x: width / 3, y: 0 },
    { name: 'General', x: (width / 3) * 2, y: 0 },
  ];

  const quadrantGroups = quadrantsGroup
    .selectAll('g.quadrant')
    .data(quadrants)
    .enter()
    .append('g')
    .attr('class', 'quadrant')
    .attr('transform', (d) => `translate(${d.x} 0)`);

  // Add rectangles for each quadrant
  quadrantGroups
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width / 3)
    .attr('height', height)
    .attr('fill', 'hsl(0, 0%, 0%)')
    .attr('opacity', (d, i) => (i === 1 ? 0.15 : i === 2 ? 0.05 : 0.1));

  // Add vertical lines between quadrants (skip the rightmost line)
  quadrantGroups
    .filter((d, i) => i < 2) // Only add lines for first two quadrants
    .append('line')
    .attr('x1', width / 3)
    .attr('y1', 0)
    .attr('x2', width / 3)
    .attr('y2', height)
    .attr('stroke', 'hsl(184, 30%, 70%)')
    .attr('stroke-width', 1)
    .attr('opacity', 0.2);

  // Add horizontal lines and labels for levels (skip the top line)
  CHART_CONFIG.levels
    .slice()
    .reverse()
    .forEach((level, i) => {
      const y = (height / CHART_CONFIG.levels.length) * i;

      // Skip the first line (top line)
      if (i > 0) {
        // Add line
        quadrantsGroup
          .append('line')
          .attr('class', 'level')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)
          .attr('stroke', 'hsl(184, 30%, 70%)')
          .attr('stroke-width', 1)
          .attr('opacity', 0.2);
      }

      // Add level label
      const labelGroup = quadrantsGroup
        .append('text')
        .attr('x', -20)
        .attr('y', y + height / CHART_CONFIG.levels.length / 2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle');

      // Add first line (L1, L2, etc)
      labelGroup
        .append('tspan')
        .attr('x', -20)
        .attr('dy', '-0.7em')
        .text(level[0])
        .style('font-size', '0.7rem');

      // Add second line (description)
      labelGroup
        .append('tspan')
        .attr('x', -20)
        .attr('dy', '1.4em')
        .text(level[1])
        .style('font-size', '0.6rem');
    });

  // Add labels for each quadrant
  quadrantGroups
    .append('text')
    .attr('x', width / 6)
    .attr('y', -20)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .text((d) => d.name)
    .style('font-size', '0.8rem')
    .style('fill', 'hsl(184, 30%, 85%)');

  return quadrantsGroup;
}
