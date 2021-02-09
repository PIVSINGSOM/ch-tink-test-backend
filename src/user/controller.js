'use strict'

const jwt = require('jsonwebtoken')
const util = require('util');
const con = require('../condb').connect
const query = util.promisify(con.query).bind(con);

class UserController {
  constructor() {

  }

  async Login(req, res, next) {
    try {
      let { username, password } = req.body
      if (username == 'admin' && password == 1234) {
        let token = jwt.sign(req.body, process.env.TOKEN_SECRET);
        res.status(200).send({ accessToken: token })
      } else {
        res.status(200).send({ message: 'username or password is wrong!' })
      }
      res.status(200).send(response)
    } catch (e) {
      console.log(e)
      res.status(500).send({ message: 'Internal server error.' })
    }
  }






}

module.exports = UserController
