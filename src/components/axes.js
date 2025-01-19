export function createAxes(group, width, height, domainScale, levelScale) {
  // Create x-axis with only bottom line
  const xAxis = d3.axisBottom(domainScale).tickSize(0);
  group
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .call((g) => {
      const path = g.select('.domain');
      const d = path.attr('d');
      // Only keep the bottom line by modifying the path
      path.attr('d', d.split('V')[0] + 'H' + width);
    })
    .selectAll('text')
    .style('text-anchor', 'middle')
    .style('font-size', '0.7rem')
    .style('font-weight', '300')
    .style('fill', 'hsl(184, 30%, 85%)');

  // Create y-axis with only left line
  const yAxis = d3.axisLeft(levelScale).tickSize(0);
  group
    .append('g')
    .call(yAxis)
    .call((g) => {
      const path = g.select('.domain');
      const d = path.attr('d');
      // Only keep the left line by modifying the path
      path.attr('d', 'M0,' + height + 'V0');
    })
    .selectAll('text')
    .style('font-size', '0.7rem')
    .style('font-weight', '300')
    .style('fill', 'hsl(184, 30%, 85%)');

  // Add axis labels
  group
    .append('text')
    .attr('transform', `translate(${width / 2}, ${height + 40})`)
    .style('text-anchor', 'middle')
    .style('font-size', '0.7rem')
    .style('font-weight', '300')
    .style('fill', 'hsl(184, 30%, 85%)')
    .text('Domain');

  group
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -40)
    .attr('x', -height / 2)
    .style('text-anchor', 'middle')
    .style('font-size', '0.7rem')
    .style('font-weight', '300')
    .style('fill', 'hsl(184, 30%, 85%)')
    .text('AI Level');
}
