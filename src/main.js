import { CHART_CONFIG } from './config.js';
import { generateData } from './data.js';
import { createScales } from './scales.js';
import { createQuadrants } from './components/quadrants.js';
import { createDataPoints } from './components/dataPoints.js';
import { createLegend } from './components/legend.js';

function setupChart() {
  const width =
    CHART_CONFIG.width - (CHART_CONFIG.margin.left + CHART_CONFIG.margin.right);
  const height =
    CHART_CONFIG.height - (CHART_CONFIG.margin.top + CHART_CONFIG.margin.bottom);

  const svg = d3
    .select('.viz')
    .append('svg')
    .attr('viewBox', `0 0 ${CHART_CONFIG.width} ${CHART_CONFIG.height}`);

  const group = svg
    .append('g')
    .attr(
      'transform',
      `translate(${CHART_CONFIG.margin.left}, ${CHART_CONFIG.margin.top})`
    );

  return { svg, group, width, height };
}

function initializeChart() {
  const data = generateData();
  const { group, width, height } = setupChart();
  const { domainScale, levelScale } = createScales(width, height);

  createQuadrants(group, width, height);
  createDataPoints(group, data, domainScale, levelScale, width, height);
  createLegend(group, width, height);

  // Add disclaimer text
  group
    .append('text')
    .attr('class', 'disclaimer')
    .attr('x', width / 2)
    .attr('y', height + 20)
    .attr('text-anchor', 'middle')
    .style('font-size', '0.7rem')
    .style('fill', 'hsl(184, 30%, 70%)')
    .text(
      'Note: Positioning of items within each quadrant is arbitrary and does not indicate relative performance.'
    );

  // Add credits
  const credits = group
    .append('g')
    .attr('class', 'credits')
    .attr('transform', `translate(${width / 2}, ${height + 45})`);

  const creditsText = credits
    .append('text')
    .attr('text-anchor', 'middle')
    .style('font-size', '0.7rem')
    .style('fill', 'hsl(184, 30%, 70%)');

  creditsText.append('tspan')
    .text('Author: ');

  creditsText.append('a')
    .attr('xlink:href', 'https://www.linkedin.com/in/zhu-liang/')
    .attr('target', '_blank')
    .style('fill', 'hsl(184, 30%, 70%)')
    .attr('text-decoration', 'underline')
    .attr('text-decoration-thickness', '1')
    .text('Zhu Liang');

  creditsText.append('tspan')
    .text(' (');

  creditsText.append('a')
    .attr('xlink:href', 'https://prompt.16x.engineer/')
    .attr('target', '_blank')
    .style('fill', 'hsl(184, 30%, 70%)')
    .attr('text-decoration', 'underline')
    .attr('text-decoration-thickness', '1')
    .text('16x Prompt');

  creditsText.append('tspan')
    .text('). Tools used: d3, Cursor. ');

  creditsText.append('a')
    .attr('xlink:href', 'https://github.com/paradite/ai-coding')
    .attr('target', '_blank')
    .style('fill', 'hsl(184, 30%, 70%)')
    .attr('text-decoration', 'underline')
    .attr('text-decoration-thickness', '1')
    .text('View source code');
}

// Start the visualization
initializeChart();
