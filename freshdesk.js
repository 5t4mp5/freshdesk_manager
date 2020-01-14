import axios from 'axios';
import email from './email.js';

const selfAssignTickets = () => {
  return axios
    .get(
      'https://pricereporter.freshdesk.com/api/v2/tickets?&updated_since=2018-01-01T00:00:00.000z&per_page=100&order_by=created_at',
      {
        headers: { Authorization: process.env.API_KEY },
      }
    )
    .then(results => {
      const tickets = results.data.filter(
        ticket => ticket.responder_id === null && ticket.status !== 5
      );
      console.log(tickets.length);
      return Promise.all(
        tickets.map(ticket => {
          console.log('ID: ', ticket.id);
          return axios
            .put(
              `https://pricereporter.freshdesk.com/api/v2/tickets/${ticket.id}`,
              { responder_id: 16000091123 },
              {
                headers: { Authorization: process.env.API_KEY },
              }
            )
            .catch(e => {
              throw e;
            });
        })
      );
    })
    .then(results => {
      results.forEach(result => {
        const { id, subject, description } = result.data;
        email(id, subject, description);
      });
    })
    .catch(e => {
      throw e;
    });
};

setInterval(selfAssignTickets, 60000);
