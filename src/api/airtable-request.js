const apiKey = 'keyEP1Ky8tJP7sodr'
const table = 'appHkRvpA0XNVEQ8f/table_sheet'

export const api = (offset) =>
  `https://api.airtable.com/v0/${table}` +
    `?api_key=${apiKey}` +
    `&view=Grid%20view` +
    `&offset=${offset ? offset : ''}`