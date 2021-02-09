'use strict'


const util = require('util');
const con = require('../condb').connect
const query = util.promisify(con.query).bind(con);

class ProductController {
  constructor() {

  }

  async getProduct(req, res, next) {
      
    try {
      let sql = `SELECT * FROM product`
      let response = await query(sql)
      res.status(200).send(response)
    } catch (e) {
      console.log(e)
      res.status(500).send({ message: 'Internal server error.' })
    }
  }

  async createProduct(req, res, next) {
    try {
      let { name, price } = req.body
      let sql = `INSERT INTO product (name, price) VALUES ('${name}', '${price}')`
      await query(sql)
      res.status(200).send({message:'Product created'})
    } catch (e) {
      console.log(e)
      res.status(500).send({ message: 'Internal server error.' })
    }
  }




}

module.exports = ProductController
