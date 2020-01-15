import selfAssignTickets from './selfAssignTickets.js';
import * as generateReports from './generateReports.js';
import schedule from 'node-schedule';

//set up scheduler for morning reports
const schedRule = new schedule.RecurrenceRule();
schedRule.hour = 9;

const openReportJob = schedule.scheduleJob(schedRule, () =>
  generateReports.aging('open')
);

const waitingCustReportJob = schedule.scheduleJob(schedRule, () =>
  generateReports.aging('waiting_customer')
);

const waitingThirdReportJob = schedule.scheduleJob(schedRule, () =>
  generateReports.aging('waiting_third_party')
);

const pendingReportJob = schedule.scheduleJob(schedRule, () =>
  generateReports.aging('pending')
);

setInterval(selfAssignTickets, 60000);
