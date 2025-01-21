import { CHART_CONFIG } from './config.js';
import { generateData } from './data.js';
import { createScales } from './scales.js';
import { createQuadrants } from './components/quadrants.js';
import { createDataPoints } from './components/dataPoints.js';
import { createLegend } from './components/legend.js';

function setupChart() {
  const isMobile = window.innerWidth < 767;
  const isTiny = window.innerWidth < 400;
  const chartWidth = isMobile ? CHART_CONFIG.mobileWidth : CHART_CONFIG.width;
  const chartHeight = isMobile ? CHART_CONFIG.mobileHeight : CHART_CONFIG.height;
  const margins = isTiny
    ? CHART_CONFIG.tinyMargin
    : isMobile
    ? CHART_CONFIG.mobileMargin
    : CHART_CONFIG.margin;
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

  return { svg, group, width, height, isMobile, isTiny, textOffset };
}

function initializeChart() {
  const data = generateData();
  const { group, width, height } = setupChart();
  const { domainScale, levelScale } = createScales(width, height);

  createQuadrants(group, width, height);
  createDataPoints(group, data, domainScale, levelScale, width, height);
  createLegend(group, width, height);
}

// Start the visualization
initializeChart();
