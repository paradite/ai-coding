import { CHART_CONFIG } from './config.js';

export function createScales(width, height) {
  const domainScale = d3
    .scalePoint()
    .domain(CHART_CONFIG.domains)
    .range([0, width])
    .padding(0.5);

  const levelScale = d3
    .scalePoint()
    .domain(CHART_CONFIG.levels)
    .range([height, 0])
    .padding(0.5);

  return { domainScale, levelScale };
}
