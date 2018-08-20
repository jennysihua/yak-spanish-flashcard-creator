'use strict'

const express = require('express')
const path = require('path')
const volleyball = require('volleyball')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db/database')
const sessionStore = new SequelizeStore({db})

const app = express()

if (process.env.NODE_ENV !== 'production') require('../secrets')

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) =>
  db.models.user
    .findById(id)
    .then(user => done(null, user))
    .catch(done))

// logging middleware
app.use(volleyball)

// body parsing middleware
app.use(express.json())
app.use(express.urlencoded())

//session middleware with passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())

//auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

// static middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
}) // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app
