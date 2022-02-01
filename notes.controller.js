const fs = require('fs/promises')
const path = require('path')
// const chalk = require('chalk') Не работает

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
	const notes = await getNotes()

	const note = {
		title,
		id: Date.now().toString(),
	}

	notes.push(note)

	await fs.writeFile(notesPath, JSON.stringify(notes))
	// console.log(chalk.green.inverse('Note was added'))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })

	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
	const notes = await getNotes()
	notes.forEach((e) => {
		console.log(e.id, ' ', e.title)
	})
}

async function removeNote(id) {
	console.log('id', typeof id)
	const notes = await getNotes()
	const newNotes = notes.filter((e) => e.id !== id.toString())

	await fs.writeFile(notesPath, JSON.stringify(newNotes))
}

module.exports = {
	addNote,
	getNotes,
	printNotes,
	removeNote,
}
