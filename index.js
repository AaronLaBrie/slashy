// Deps
const newrelic = require('newrelic')
const express = require('express')
const bodyParser = require('body-parser')

const slashCommands = require('./slash-commands')

const app = express()
app.set('port', process.env.PORT || 3000)

// Slack posts using urlencoded data
app.use(bodyParser.urlencoded({ extended: false }))

// Base route for the slash commands
app.use('/commands', slashCommands())

app.get('/', (req, res) => {
  res.send('<a href="https://github.com/AaronLaBrie/slashy">home</a>')
})

// Pretend to use oauth
app.get('/oauth', (req, res) => {
  res.send('Success!')
})

// 404 if nothing else got hit.
app.use((req, res) => res.status(404).send('404: Not Found'))

const server = app.listen(app.get('port'), () => console.log('Server up! 🎉'))
