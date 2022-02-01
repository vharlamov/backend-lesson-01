const os = require('os')

console.log(os.platform()) // ОС (mac, win и т.д.)
console.log(os.arch()) // Архитектура (х32, х64)
console.log(os.cpus()) // Процессоры
console.log(os.freemem()) // Свободная память
console.log(os.totalmem()) // Всего памяти
console.log(os.uptime()) // Время работы компа
console.log(os.homedir()) // Текущая корневая директория
