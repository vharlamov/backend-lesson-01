const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
	const notes = await getNotes()

	const note = {
		id: Date.now().toString(),
		title,
	}

	notes.push(note)

	await fs.writeFile(notesPath, JSON.stringify(notes))
	console.log(chalk.green.inverse('Note was added'))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })

	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
	const notes = await getNotes()
	notes.forEach((e) => {})
}

async function removeNote(id) {
	const notes = await getNotes()
	const newNotes = notes.filter((e) => e.id !== id.toString())

	console.log(chalk.red.inverse(`Note ${id} deleted`))

	await fs.writeFile(notesPath, JSON.stringify(newNotes))
}

async function editNote(id, data) {
	const notes = await getNotes()
	const noteIndex = notes.findIndex((e) => e.id === id.toString())
	notes[noteIndex] = data

	console.log(chalk.blue.inverse(`Note ${id} edited`))

	await fs.writeFile(notesPath, JSON.stringify(notes))
}

module.exports = {
	addNote,
	getNotes,
	printNotes,
	removeNote,
	editNote,
}
