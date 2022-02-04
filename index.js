const express = require('express')
const chalk = require('chalk')
const path = require('path')
const { addNote, getNotes, removeNote } = require('./notes.controller')

const port = 3000

const basePath = path.join(__dirname, './pages')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.static(path.resolve(__dirname, 'public'))) //
app.use(express.urlencoded({ extended: true })) // Для получения данных в правильном формате
app.use(express.json())
app.use(function (err, req, res, next) {
	console.error(err.stack)
})

app.get('/', async (req, res) => {
	const notes = await getNotes()
	// res.sendFile(path.join(basePath, 'index.html')) // Отправка контента клиенту
	res.render('index', {
		title: 'Express App',
		notes,
		created: false,
	})
})

app.post('/', async (req, res) => {
	await addNote(req.body.title)
	// console.log(req)
	const notes = await getNotes()
	// res.sendFile(path.join(basePath, 'index.html'))
	res.render('index', {
		title: 'Express App',
		notes,
		created: true,
	})
})

app.delete('/:id', async (req, res) => {
	removeNote(req.params.id)
	// console.log('req.params', req.params)

	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
	})
})

app.put(
	('/:id',
	async (req, res) => {
		console.log('req.params', req.params)
		await editNote(req.params.id)

		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			created: false,
		})
	})
)

app.listen(port, () => {
	console.log(chalk.greenBright(`Server has been started on port ${port}...`))
})
