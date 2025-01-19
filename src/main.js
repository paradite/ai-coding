import { CHART_CONFIG } from './config.js';
import { generateData } from './data.js';
import { createScales } from './scales.js';
import { createQuadrants } from './components/quadrants.js';
import { createDataPoints } from './components/dataPoints.js';
import { createLegend } from './components/legend.js';

function setupChart() {
  const isMobile = window.innerWidth <= 768;
  const chartWidth = isMobile ? CHART_CONFIG.mobileWidth : CHART_CONFIG.width;
  const margins = isMobile ? CHART_CONFIG.mobileMargin : CHART_CONFIG.margin;

  const width = chartWidth - (margins.left + margins.right);
  const height = CHART_CONFIG.height - (margins.top + margins.bottom);

  const svg = d3
    .select('.viz')
    .append('svg')
    .attr('viewBox', `0 0 ${chartWidth} ${CHART_CONFIG.height}`);

  const group = svg
    .append('g')
    .attr('transform', `translate(${margins.left}, ${margins.top})`);

  return { svg, group, width, height };
}

function initializeChart() {
  const data = generateData();
  const { group, width, height } = setupChart();
  const { domainScale, levelScale } = createScales(width, height);

  createQuadrants(group, width, height);
  createDataPoints(group, data, domainScale, levelScale, width, height);
  createLegend(group, width, height);

  // Add desktop disclaimer text
  const desktopDisclaimer = group
    .append('text')
    .attr('class', 'disclaimer disclaimer-desktop')
    .attr('x', width / 2)
    .attr('y', height + 20)
    .attr('text-anchor', 'middle')
    .style('font-size', '0.7rem')
    .style('fill', 'hsl(184, 30%, 70%)')
    .text(
      'Note: Positioning of items within each quadrant is arbitrary and does not indicate relative performance.'
    );

  // Add mobile disclaimer text
  const mobileDisclaimer = group
    .append('text')
    .attr('class', 'disclaimer disclaimer-mobile')
    .attr('x', width / 2)
    .attr('y', height + 60)
    .attr('text-anchor', 'middle')
    .style('font-size', '0.7rem')
    .style('fill', 'hsl(184, 30%, 70%)')
    .text(
      'Note: Positioning of items within each quadrant is arbitrary and does not indicate relative performance.'
    );

  // Add desktop credits
  const desktopCredits = group
    .append('g')
    .attr('class', 'credits credits-desktop')
    .attr('transform', `translate(${width / 2}, ${height + 45})`);

  const desktopCreditsText = desktopCredits
    .append('text')
    .attr('text-anchor', 'middle')
    .style('font-size', '0.7rem')
    .style('fill', 'hsl(184, 30%, 70%)');

  desktopCreditsText.append('tspan').text('Created by ');

  desktopCreditsText
    .append('a')
    .attr('xlink:href', 'https://www.linkedin.com/in/zhu-liang/')
    .attr('target', '_blank')
    .style('fill', 'hsl(184, 30%, 70%)')
    .attr('text-decoration', 'underline')
    .attr('text-decoration-thickness', '1')
    .text('Zhu Liang');

  desktopCreditsText.append('tspan').text(' (');

  desktopCreditsText
    .append('a')
    .attr('xlink:href', 'https://prompt.16x.engineer/')
    .attr('target', '_blank')
    .style('fill', 'hsl(184, 30%, 70%)')
    .attr('text-decoration', 'underline')
    .attr('text-decoration-thickness', '1')
    .text('16x Prompt');

  desktopCreditsText.append('tspan').text(') using d3 and Cursor. ');

  desktopCreditsText
    .append('a')
    .attr('xlink:href', 'https://prompt.16x.engineer/blog/ai-coding-l1-l5')
    .attr('target', '_blank')
    .style('fill', 'hsl(184, 30%, 70%)')
    .attr('text-decoration', 'underline')
    .attr('text-decoration-thickness', '1')
    .text('Learn more about L1-L5');

  desktopCreditsText.append('tspan').text(' | ');

  desktopCreditsText
    .append('a')
    .attr('xlink:href', 'https://github.com/paradite/ai-coding')
    .attr('target', '_blank')
    .style('fill', 'hsl(184, 30%, 70%)')
    .attr('text-decoration', 'underline')
    .attr('text-decoration-thickness', '1')
    .text('Source code');

  // Add mobile credits
  const mobileCredits = group
    .append('g')
    .attr('class', 'credits credits-mobile')
    .attr('transform', `translate(${width / 2}, ${height + 80})`);

  const mobileCreditsText = mobileCredits
    .append('text')
    .attr('text-anchor', 'middle')
    .style('font-size', '0.7rem')
    .style('fill', 'hsl(184, 30%, 70%)');

  mobileCreditsText.append('tspan').text('Created by ');

  mobileCreditsText
    .append('a')
    .attr('xlink:href', 'https://www.linkedin.com/in/zhu-liang/')
    .attr('target', '_blank')
    .style('fill', 'hsl(184, 30%, 70%)')
    .attr('text-decoration', 'underline')
    .attr('text-decoration-thickness', '1')
    .text('Zhu Liang');

  mobileCreditsText.append('tspan').text(' (');

  mobileCreditsText
    .append('a')
    .attr('xlink:href', 'https://prompt.16x.engineer/')
    .attr('target', '_blank')
    .style('fill', 'hsl(184, 30%, 70%)')
    .attr('text-decoration', 'underline')
    .attr('text-decoration-thickness', '1')
    .text('16x Prompt');

  mobileCreditsText.append('tspan').text(') using d3 and Cursor. ');

  mobileCreditsText
    .append('a')
    .attr('xlink:href', 'https://prompt.16x.engineer/blog/ai-coding-l1-l5')
    .attr('target', '_blank')
    .style('fill', 'hsl(184, 30%, 70%)')
    .attr('text-decoration', 'underline')
    .attr('text-decoration-thickness', '1')
    .text('Learn more about L1-L5');

  mobileCreditsText.append('tspan').text(' | ');

  mobileCreditsText
    .append('a')
    .attr('xlink:href', 'https://github.com/paradite/ai-coding')
    .attr('target', '_blank')
    .style('fill', 'hsl(184, 30%, 70%)')
    .attr('text-decoration', 'underline')
    .attr('text-decoration-thickness', '1')
    .text('Source code');
}

// Start the visualization
initializeChart();
