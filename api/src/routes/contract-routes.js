module.exports = (app) => {
  const router = require('express').Router()
  const controller = require('../controllers/front/contract-controller.js')

  router.post('/', controller.create)

  app.use('/api/front/contracts', router)
}
