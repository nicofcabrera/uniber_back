const express = require('express');
const cors = require('cors')
const app = express();
const port = 8000;
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin1',
  database: 'sys'
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión OK');
});

app.use(cors());

app.get('/venta', (req, res) => {
  const sql = `SELECT st_movivta_c.ID, st_movivta_c.TOTAL, st_movivta_c.FEC, st_movivta_c.NUM 
FROM st_movivta_c`;

  connection.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error query venta' });
    }
    res.json(results);
  });
})

app.get('/entrega', (req, res) => {
  const sql = `SELECT lg_entrega_c.ID, lg_entrega_i.ITEM, lg_entrega_c.FECHA_ENT, lg_entrega_c.MOVIVTA_ID, lg_entrega_c.MOVIVTA_SUC
FROM lg_entrega_c, lg_entrega_i `;

  connection.query(sql, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error query entrega' });
    }
    res.json(results);
  });
})

app.listen(port, () => {
  console.log(`Ejecutando en el puerto ${port}`);
})