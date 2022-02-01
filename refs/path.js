const path = require('path')

console.log(path.dirname(__filename)) // Абс. путь до файла или папки
console.log(path.basename(__filename)) // Имя файла
console.log(path.extname(__filename).slice(1)) // Расширение файла без точки
console.log(path.parse(__filename)) // Путь, разложенный на составляющие (корень, путь до файла, имя файла, расширение)
console.log(path.resolve(__dirname, '..', './modules', './app.js')) // Строит путь до нужного файла (ищет заданный файл)
console.log(path.join(__dirname, '..', './modules', './app.js')) // Строит путь до нужного файла (простая конкатенация)
console.log(
	path.relative(
		__filename,
		'D:\\JSStudy\\vladilen-cource-all\\module-03\\lesson-01\\node-training\\modules\\app.js'
	)
) // ..\..\modules\app.js
