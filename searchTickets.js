import axios from 'axios';

export default queryStr =>
  axios
    .get(
      `https://pricereporter.freshdesk.com/api/v2/search/tickets?query="${queryStr}"`,
      { headers: { Authorization: process.env.API_KEY } }
    )
    .then(response => {
      const pageCount = Math.ceil(response.data.total / 30);
      const pages = [...new Array(pageCount < 10 ? pageCount : 10)];
      return Promise.all(
        pages.map((page, idx) => {
          return axios.get(
            `https://pricereporter.freshdesk.com/api/v2/search/tickets?query="${queryStr}"&page=${idx +
              1}`,
            { headers: { Authorization: process.env.API_KEY } }
          );
        })
      );
    })
    .then(results => {
      return results.reduce(
        (acc, result) => [...acc, ...result.data.results],
        []
      );
    })
    .catch(e => console.log(e.response.data.errors));
