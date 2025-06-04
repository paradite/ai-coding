export const CHART_CONFIG = {
  width: parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--viz-width-desktop')
  ),
  mobileWidth: 800,
  height: parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--viz-height-desktop')
  ),
  mobileHeight: 690,
  mobileTextOffset: 47,
  margin: {
    top: 40,
    right: parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--margin-right')
    ),
    bottom: 0,
    left: parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--margin-left')
    ),
  },
  mobileMargin: {
    top: 40,
    right: 20,
    bottom: 60,
    left: 115,
  },
  tinyMargin: {
    top: 40,
    right: 20,
    bottom: 0,
    left: 115,
  },
  colors: {
    webdev: 'hsl(33, 100%, 50%)', // Orange
    general: 'hsl(122, 70%, 50%)', // Green
  },
  availability: {
    available: 'hsl(137, 68%, 61%)', // Green
    beta: 'hsl(57, 96%, 64%)', // Yellow
    waitlist: 'hsl(259, 48%, 55%)', // Purple
    foundation: 'hsl(0, 0%, 100%)', // White
  },
  leader: {
    fillColor: 'hsl(320, 100%, 70%)', // Bright magenta/pink
    strokeColor: 'hsl(320, 100%, 85%)', // Lighter magenta for stroke
    strokeWidth: 2,
  },
  domains: ['webdev', 'general'],
  levels: [
    ['L1', ['Code', 'Completion']],
    ['L2', ['Task', 'Automation']],
    ['L3', ['Project', 'Automation']],
    ['L4', ['AI', 'Engineer']],
    ['L5', ['AI Dev', 'Teams']],
  ],
};
