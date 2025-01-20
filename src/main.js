import { CHART_CONFIG } from './config.js';
import { generateData } from './data.js';
import { createScales } from './scales.js';
import { createQuadrants } from './components/quadrants.js';
import { createDataPoints } from './components/dataPoints.js';
import { createLegend } from './components/legend.js';

function setupChart() {
  const isMobile = window.innerWidth <= 768;
  const chartWidth = isMobile ? CHART_CONFIG.mobileWidth : CHART_CONFIG.width;
  const chartHeight = isMobile ? CHART_CONFIG.mobileHeight : CHART_CONFIG.height;
  const margins = isMobile ? CHART_CONFIG.mobileMargin : CHART_CONFIG.margin;
  const textOffset = isMobile ? CHART_CONFIG.mobileTextOffset : 0;

  const width = chartWidth - (margins.left + margins.right);
  const height = chartHeight - (margins.top + margins.bottom);

  const svg = d3
    .select('.viz')
    .append('svg')
    .attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`);

  const group = svg
    .append('g')
    .attr('transform', `translate(${margins.left}, ${margins.top})`);

  return { svg, group, width, height, isMobile, textOffset };
}

function createLink(parent, href, text) {
  return parent
    .append('a')
    .attr('xlink:href', href)
    .attr('target', '_blank')
    .style('fill', 'hsl(184, 30%, 70%)')
    .attr('text-decoration', 'underline')
    .attr('text-decoration-thickness', '1')
    .text(text);
}

function createCreditsGroup(group, width, height, textOffset, isMobile) {
  const className = isMobile ? 'credits-mobile' : 'credits-desktop';
  const yOffset = isMobile ? 80 : 45;
  const xPos = width / 2 - (isMobile ? textOffset : 0);

  const credits = group
    .append('g')
    .attr('class', `credits ${className}`)
    .attr('transform', `translate(${xPos}, ${height + yOffset})`);

  const creditsText = credits
    .append('text')
    .attr('text-anchor', 'middle')
    .style('font-size', '0.7rem')
    .style('fill', 'hsl(184, 30%, 70%)');

  creditsText.append('tspan').text('Created by ');
  createLink(creditsText, 'https://www.linkedin.com/in/zhu-liang/', 'Zhu Liang');
  creditsText.append('tspan').text(' (');
  createLink(creditsText, 'https://prompt.16x.engineer/', '16x Prompt');
  creditsText.append('tspan').text(') using d3 and Cursor. ');
  createLink(
    creditsText,
    'https://prompt.16x.engineer/blog/ai-coding-l1-l5',
    'Learn more about L1-L5'
  );
  creditsText.append('tspan').text(' | ');
  createLink(creditsText, 'https://github.com/paradite/ai-coding', 'Source code');
}

function createDisclaimer(group, width, height, textOffset, isMobile) {
  const className = isMobile ? 'disclaimer-mobile' : 'disclaimer-desktop';
  const yOffset = isMobile ? 60 : 20;
  const xPos = width / 2 - (isMobile ? textOffset : 0);

  group
    .append('text')
    .attr('class', `disclaimer ${className}`)
    .attr('x', xPos)
    .attr('y', height + yOffset)
    .attr('text-anchor', 'middle')
    .style('font-size', '0.7rem')
    .style('fill', 'hsl(184, 30%, 70%)')
    .text('Note: Item positions within quadrants are arbitrary.');
}

function initializeChart() {
  const data = generateData();
  const { group, width, height, textOffset, isMobile } = setupChart();
  const { domainScale, levelScale } = createScales(width, height);

  createQuadrants(group, width, height);
  createDataPoints(group, data, domainScale, levelScale, width, height);
  createLegend(group, width, height);

  // Add disclaimers for both mobile and desktop
  createDisclaimer(group, width, height, textOffset, false);
  createDisclaimer(group, width, height, textOffset, true);

  // Add credits for both mobile and desktop
  createCreditsGroup(group, width, height, textOffset, false);
  createCreditsGroup(group, width, height, textOffset, true);
}

// Start the visualization
initializeChart();
