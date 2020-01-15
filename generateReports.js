import searchTickets from './searchTickets.js';
import renderReport from './renderReport.js';
import email from './email.js';

export const aging = status => {
  const statusMap = {
    open: 2,
    pending: 3,
    resolved: 4,
    closed: 5,
    waiting_customer: 6,
    waiting_third_party: 7,
  };
  return searchTickets(`status:${statusMap[status]}`).then(tickets => {
    const reportData = tickets
      .filter(ticket => {
        const today = new Date().getTime();
        const updated = new Date(ticket.updated_at).getTime();
        return (today - updated) / (1000 * 3600 * 24) >= 2;
      })
      .map(ticket => {
        const { id, subject, created_at, updated_at } = ticket;
        console.log(id);
        return { id, subject, created_at, updated_at };
      });
    const title = 'Aging Tickets: Waiting for Customer';
    const headers = ['Ticket #', 'Subject', 'Created', 'Last Updated'];
    const report = renderReport(title, headers, reportData);
    email(title, report);
  });
};
