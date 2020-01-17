import selfAssignTickets from './selfAssignTickets.js';
import scheduleReports from './scheduleReports.js';

//Check for open unassigned tickets regularly and assign
setInterval(selfAssignTickets, 60000);

//Initialize report schedule
scheduleReports(['open', 'pending', 'waiting_customer', 'waiting_third_party'])
  .then(() => console.log('REPORT SCHEDULE INITIALIZED'))
  .catch(e => console.error(e));
