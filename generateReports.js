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

  const titleMap = {
    open: 'Open',
    pending: 'Pending',
    resolved: 'Resolved',
    closed: 'Closed',
    waiting_customer: 'Waiting for Customer',
    waiting_third_party: 'Waiting for Third Party',
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
        return { id, subject, created_at, updated_at };
      })
      .sort((a, b) =>
        new Date(a.updated_at).getTime() < new Date(b.updated_at).getTime()
          ? -1
          : 1
      );
    const title = `Aging Tickets: ${titleMap[status]}`;
    const printedHeaders = ['Ticket #', 'Subject', 'Created', 'Last Updated'];
    const headers = ['id', 'subject', 'created_at', 'updated_at'];
    if (!reportData.length)
      return email(`${title}: NO TICKETS TO REPORT`, 'NO TICKETS').then(() =>
        console.log(`${title.toUpperCase()} NO TICKETS TO REPORT`)
      );
    const report = renderReport(headers, printedHeaders, reportData);
    return email(title, title, [
      { filename: `${title}.csv`, content: report },
    ]).then(() => console.log(`${title.toUpperCase()} REPORT SENT`));
  });
};
