const { Pool } = require('pg');
const cors = require('cors');
const config = require('./config.json');
const { api_to_query } = require('./api');
const express = require('express');
const app = express();
const port = config.backend_port;
const pool = new Pool(config);

app.use(cors({
  origin: '*'
}));

app.get('/', async (req, res) => {
  try {

    const query_string = api_to_query(req.query);
    res.json(await pool.query(query_string));
  }
  catch (e) {
    res.send(e.toString());
  }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})
