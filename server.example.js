const chalk = require('chalk')
const http = require('http')
const fs = require('fs/promises')
const path = require('path')
const { addNote } = require('./notes.controller')
const express = require('express')

const port = 3000

const basePath = path.join(__dirname, './pages')

const app = express()

const server = http.createServer(async (req, res) => {
	if (req.method === 'GET') {
		const content = await fs.readFile(path.join(basePath, 'index.html')) // Получение контента

		res.writeHead(200, { 'Content-Type': 'text/html' }) // Задание заголовков ответа
		res.end(content) // Завершение ответа, возвращение клиенту контента
	} else if (req.method === 'POST') {
		const body = []
		res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })

		req.on('data', (data) => {
			// Получение данных от клиента
			body.push(Buffer.from(data))
		})

		req.on('end', () => {
			// Завершение получения данных
			const title = body.toString().split('=')[1].replaceAll('+', ' ')
			console.log('title:', title)
			addNote(title) // Отправка данных в базу

			res.end(`Title = ${title}`) // Завершение ответа, возвращение клиенту контента
		})
	}
})

app.listen(port, () => {
	console.log(chalk.greenBright(`Server has been started on port ${port}...`))
})
