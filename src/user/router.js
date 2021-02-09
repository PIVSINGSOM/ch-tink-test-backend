'use strict'

const express = require('express')
const UserController = require('./controller')
const controller = new UserController()


function setupRouter () {
  let router = express.Router()

  router.post('/login',controller.Login.bind(controller))

  return router
}

module.exports = function (app) {
  let router = app || express()

  router.use(setupRouter())

  return router
}
