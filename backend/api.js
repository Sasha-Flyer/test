const { table_name } = require('./config.json');

const CELLS = ['date', 'name', 'amount', 'distance'];

const api_to_query = (request) => {
  const { page, limit } = request; // сразу получаем пагинацию
  delete request.page;
  delete request.limit;
  console.log(page);
  console.log(limit);

  let query = `SELECT ${CELLS.join(', ')} FROM items `;
  // парсим запрос для фильтрации:
  for (const [key, value] of Object.entries(request)) {
    const parsed_key = key.split(".");
    if (!CELLS.includes(parsed_key[0])) throw new Error('validation error');

    switch (parsed_key[1]) {
      case 'lt': {
        query += `WHERE ${parsed_key[0]} < ${value} `;
        break;
      }
      case 'gt': {
        query += `WHERE ${parsed_key[0]} > ${value} `;
        break;
      }
      case 'eq': {
        query += `WHERE ${parsed_key[0]} = ${value} `;
        break;
      }
      case 'like': {
        query += `WHERE ${parsed_key[0]} LIKE '%${value}%' `;
        break;
      }
      default: {
        throw new Error('validation error');
      }
    }
  }
  // делаем пагинацию:
  if (page && limit) {
    query += `OFFSET ${(page-1)*limit} LIMIT ${limit} `;
  }

  query += ';';
  console.log(query)
  return query;
}
module.exports.api_to_query = api_to_query
