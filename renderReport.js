export default (headers, printedHeaders, data) => {
  const report = [];
  report[0] = printedHeaders.join(',');
  data.forEach(row =>
    report.push(headers.map(header => row[header]).join(','))
  );
  return report.join('\n');
};
