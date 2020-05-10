const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

/**
 * Routes at Ongs
 */
routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.store)

/**
 * Routes at Incidents
 */
routes.get('/incidents', IncidentsController.index)
routes.post('/incidents', IncidentsController.store)
routes.delete('/incidents/:id', IncidentsController.remove)

/**
 * Routes at Profile
 */
routes.get('/profile', ProfileController.index)

/**
 * Routes at Session
 */
routes.post('/session', SessionController.store)

module.exports = routes