import generateReport from './generateReport.js';
import schedule from 'node-schedule';

//set up scheduler for morning reports
const morningRule = new schedule.RecurrenceRule();
morningRule.hour = 13;
morningRule.minute = 00;

export default statusReports =>
  Promise.all(
    statusReports.map(report =>
      schedule.scheduleJob(morningRule, () => generateReport(report))
    )
  );
