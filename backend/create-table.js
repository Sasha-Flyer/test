const { Client, Pool } = require('pg');
const { argv } = require('node:process');
const config = require('./config.json');

const pool = new Pool(config);

const ITEM_NAMES = ['телевизор', 'монитор', 'планшет', 'смартфон', 'прочее'];

const generate_rows = (count = 100) => {
  const rows = [];
  for (let i = 0; i < count; i += 1) {
    const name = `'${ITEM_NAMES[i%5]}${i}'`;
    const amount = i;
    const distance = count - i;
    rows.push([name, amount, distance]);
  }
  return rows
}

const execute = async (query) => {
  try {
    return pool.query(query);  // sends queries
  } catch (error) {
    console.error(error.stack);
    return false
  }
};

const create = `
    CREATE TABLE IF NOT EXISTS "${config.table_name}" (
	    "id" SERIAL,
	    "date" DATE NOT NULL DEFAULT CURRENT_DATE,
	    "name" VARCHAR(100) NOT NULL,
	    "amount" integer  NOT NULL,
	    "distance" integer NOT NULL,
	    PRIMARY KEY ("id")
    );`;

const drop = `DROP table ${config.table_name}`;

const select = `SELECT id FROM ${config.table_name}`;

const generate_rows_command = (rows_count) => {
  return `
    INSERT INTO ${config.table_name} 
    (name, amount, distance) 
    VALUES 
    (${generate_rows(rows_count).join('), (')});
    `;
}


const create_table_and_set_rows = async (rows_required) => {
  try {
    await execute(create); // создаем бд, затем смотрим на то, сколько строк нам надо добавить или удалить
    const count = await execute(select);
    let current_rows_count = count.rowCount;

    if (rows_required < current_rows_count) { // - если строк нужно меньше чем уже есть, просто дропаем бд и создаем в новой столько строк, сколько нужно
      await execute(drop);
      await execute(create);
      current_rows_count = 0;
    }

    if (rows_required > current_rows_count) {
      await execute(generate_rows_command(rows_required - current_rows_count))
    }
    return true
  } catch (e) {
    throw e
    //return false
  }
  finally {
    pool.end();
  }
};

let rows_count = 100
try {
  rows_count = parseInt(argv[2]);
} catch (e) { }

create_table_and_set_rows(rows_count).then(result => {
  console.log(result);
});
