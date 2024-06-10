const connection = require('../config/db');
const dotenv = require('dotenv').config();

async function storeAppoitment(request, response) {

  const params = Array(
      request.body.dia,
      request.body.hora
  )

  const query = "INSERT INTO consultas(dia, hora) VALUES(?,?)"

  connection.query(query, params, (err, results) => {
      console.log(err, results);
      if (results) {
          response
              .status(201)
              .json({
                  success: true,
                  message: "sucesso gurizada!",
                  data: results
              })
      } else {
          response
              .status(400)
              .json({
                  succes: false,
                  message: "Ops, deu problema!",
                  data: err
              })
      }
  })
}

module.exports = {
  storeAppoitment
}