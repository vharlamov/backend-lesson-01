const express = require('express')
const chalk = require('chalk')
const path = require('path')
const {
	addNote,
	getNotes,
	removeNote,
	editNote,
} = require('./notes.controller')

const port = 3000

const basePath = path.join(__dirname, './pages')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.static(path.resolve(__dirname, 'public'))) //
app.use(express.urlencoded({ extended: true })) // Для получения данных в правильном формате
app.use(express.json())
app.get('/', async (req, res) => {
	const notes = await getNotes()

	res.render('index', {
		title: 'Express App',
		notes,
		created: false,
	})
})

app.post('/', async (req, res) => {
	await addNote(req.body.title)

	const notes = await getNotes()

	res.render('index', {
		title: 'Express App',
		notes,
		created: true,
	})
})

app.delete('/:id', async (req, res) => {
	removeNote(req.params.id)

	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	})
})

app.put('/:id', async (req, res) => {
	const id = req.params.id
	await editNote(id, {
		id,
		title: req.body.title,
	})

	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	})
})

app.listen(port, () => {
	console.log(chalk.greenBright(`Server has been started on port ${port}...`))
})
