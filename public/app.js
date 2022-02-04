document.addEventListener('click', (e) => {
	const id = e.target.dataset.id

	if (e.target.dataset.type === 'remove') {
		remove(id).then(() => {
			e.target.closest('li').remove()
		})
	}

	if (e.target.dataset.type === 'edit') {
		console.log('data in app', e.target.closest('li').firstChild.data.trim())

		const data = prompt(
			'Новый текст: ',
			e.target.closest('li').firstChild.data.trim()
		)

		console.log('data from prompt', data)
		edit(id, data)
			.then(() => {
				console.log('edit.then', id, data)
				e.target.closest('li').firstChild.data = data
			})
			.catch((e) => console.log(e))
	}
})

async function remove(id) {
	await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id, data) {
	console.log('Edit in app run', data)
	await fetch(`/${id}`, {
		method: 'PUT',
		body: JSON.stringify({ id, title: data }),
	})
	console.log('edit fetch completed')
}
