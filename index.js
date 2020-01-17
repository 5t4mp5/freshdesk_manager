import selfAssignTickets from './selfAssignTickets.js';
import generateReport from './generateReport.js';
import schedule from 'node-schedule';

//set up scheduler for morning reports
const morningRule = new schedule.RecurrenceRule();
morningRule.hour = 8;
morningRule.minute = 0;

const openReportJob = schedule.scheduleJob(morningRule, () =>
  generateReport('open').catch(e => console.log(e))
);

const waitingCustReportJob = schedule.scheduleJob(morningRule, () =>
  generateReport('waiting_customer').catch(e => console.log(e))
);

const waitingThirdReportJob = schedule.scheduleJob(morningRule, () =>
  generateReport('waiting_third_party').catch(e => console.log(e))
);

const pendingReportJob = schedule.scheduleJob(morningRule, () =>
  generateReport('pending').catch(e => console.log(e))
);

//Check for open unassigned tickets regularly and assign
setInterval(selfAssignTickets, 60000);

generateReport('pending');
