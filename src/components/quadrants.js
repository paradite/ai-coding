import { CHART_CONFIG } from '../config.js';

export function createQuadrants(group, width, height) {
  const quadrantsGroup = group.append('g').attr('class', 'quadrants');

  // Create quadrants based on domains and levels
  const quadrants = [
    { name: 'Web Development', x: 0, y: 0 },
    { name: 'General', x: width / 2, y: 0 },
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
    .attr('width', width / 2)
    .attr('height', height)
    .attr('fill', 'hsl(0, 0%, 0%)')
    .attr('opacity', (d, i) => (i === 1 ? 0.1 : 0.1));

  // Add vertical lines between quadrants (skip the rightmost line)
  quadrantGroups
    .filter((d, i) => i < 1) // Only add line for first quadrant
    .append('line')
    .attr('x1', width / 2)
    .attr('y1', 0)
    .attr('x2', width / 2)
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
        .attr('dy', '-1.4em')
        .attr('class', 'level-number')
        .text(level[0]);

      // Add description first line
      labelGroup
        .append('tspan')
        .attr('x', -20)
        .attr('dy', '1.4em')
        .attr('class', 'level-description')
        .text(level[1][0]);

      // Add description second line
      labelGroup
        .append('tspan')
        .attr('x', -20)
        .attr('dy', '1.2em')
        .attr('class', 'level-description')
        .text(level[1][1]);
    });

  // Add labels for each quadrant
  quadrantGroups
    .append('text')
    .attr('x', width / 4)
    .attr('y', -20)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('class', 'quadrant-label')
    .text((d) => d.name);

  return quadrantsGroup;
}
