import selfAssignTickets from './selfAssignTickets.js';
import * as generateReports from './generateReports.js';
import schedule from 'node-schedule';

//set up scheduler for morning reports
const morningRule = new schedule.RecurrenceRule();
morningRule.hour = 9;

const openReportJob = schedule.scheduleJob(morningRule, () =>
  generateReports.aging('open')
);

const waitingCustReportJob = schedule.scheduleJob(morningRule, () =>
  generateReports.aging('waiting_customer')
);

const waitingThirdReportJob = schedule.scheduleJob(morningRule, () =>
  generateReports.aging('waiting_third_party')
);

const pendingReportJob = schedule.scheduleJob(morningRule, () =>
  generateReports.aging('pending')
);

//Check for open unassigned tickets regularly and assign
setInterval(selfAssignTickets, 60000);
