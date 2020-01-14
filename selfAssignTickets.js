import axios from 'axios';
import email from './email.js';
import searchTickets from './searchTickets.js';

export default () => {
  return searchTickets('status:2 OR status:3 OR status:6 OR status:7')
    .then(results => {
      const tickets = results.filter(ticket => ticket.responder_id === null);
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
