import selfAssignTickets from './selfAssignTickets.js';
import * as generateReports from './generateReports.js';
import schedule from 'node-schedule';

//set up scheduler for morning reports
const morningRule = new schedule.RecurrenceRule();
morningRule.hour = 8;
morningRule.minute = 0;

const openReportJob = schedule.scheduleJob(morningRule, () =>
  generateReports.aging('open').catch(e => console.log(e))
);

const waitingCustReportJob = schedule.scheduleJob(morningRule, () =>
  generateReports.aging('waiting_customer').catch(e => console.log(e))
);

const waitingThirdReportJob = schedule.scheduleJob(morningRule, () =>
  generateReports.aging('waiting_third_party').catch(e => console.log(e))
);

const pendingReportJob = schedule.scheduleJob(morningRule, () =>
  generateReports.aging('pending').catch(e => console.log(e))
);

//Check for open unassigned tickets regularly and assign
setInterval(selfAssignTickets, 60000);
