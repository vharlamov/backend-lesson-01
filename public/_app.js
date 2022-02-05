document.addEventListener('click', (e) => {
	const id = e.target.dataset.id

	if (e.target.dataset.type === 'remove') {
		remove(id).then(() => {
			e.target.closest('li').remove()
		})
	} else if (e.target.dataset.type === 'edit') {
		const data = prompt(
			'Новый текст: ',
			e.target.closest('li').firstChild.data.trim()
		)

		edit(id, data).then(() => {
			e.target.closest('li').firstChild.data = data
		})
	}
})

async function remove(id) {
	await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id, data) {
	await fetch(`/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ id: id, title: data }),
	})
}
