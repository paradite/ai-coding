export const CHART_CONFIG = {
  width: 1100,
  mobileWidth: 800,
  height: 580,
  mobileHeight: 690,
  mobileTextOffset: 47,
  margin: {
    top: 40,
    right: 190,
    bottom: 0,
    left: 160,
  },
  mobileMargin: {
    top: 40,
    right: 20,
    bottom: 30,
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
  domains: ['webdev', 'general'],
  levels: [
    ['L1', ['Code', 'Completion']],
    ['L2', ['Task', 'Automation']],
    ['L3', ['Project', 'Automation']],
    ['L4', ['AI', 'Engineer']],
    ['L5', ['AI Dev', 'Teams']],
  ],
};
