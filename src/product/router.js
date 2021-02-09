'use strict'

const express = require('express')


const ProductController = require('./controller')

const controller = new ProductController()

const authorization = require('../auth')



function setupRouter() {
  let router = express.Router()

  router.get('/', authorization, controller.getProduct.bind(controller))
  router.post('/create', authorization, controller.createProduct.bind(controller))


  return router
}

module.exports = function (app) {
  let router = app || express()

  router.use(setupRouter())

  return router
}
