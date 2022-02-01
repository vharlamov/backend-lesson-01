const fs = require('fs/promises')
const fsSync = require('fs')
const path = require('path')

const base = path.join(__dirname, 'temp')
const content = process.argv[2] ? process.argv[2] + '\r' : ''

async function start() {
	try {
		if (!fsSync.existsSync(base)) {
			await fs.mkdir(base)
			console.log('Folder created')
		}
		await fs.appendFile(path.join(base, 'logs.txt'), content)
	} catch (error) {
		console.log(error.message)
	}
}

start()
