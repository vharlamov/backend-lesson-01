document.addEventListener('click', (e) => {
	const id = e.target.dataset.id
	let noteInnerHtml = ''

	if (e.target.dataset.type === 'remove') {
		remove(id).then(() => {
			e.target.closest('li').remove()
		})
	} else if (e.target.dataset.type === 'edit') {
		// const data = prompt(
		// 	'Новый текст: ',
		// 	e.target.closest('li').firstChild.data.trim()
		// )
		noteInnerHtml = e.target.closest('li').innerHTML
		const inputValue = e.target.closest('li').firstChild.data.trim()

		edit(id, data).then(() => {
			e.target.closest('li').firstChild.data = data
		})
	}
})

function getForm(value) {
	return `<form action="/" method="post">
  <input type="text" value=${value}/>
<div class="d-flex">
  <button
    class="btn btn-primary me-2"
    data-type="edit"
    data-id=${id}
    type="submit"
  >
    Обновить
  </button>
  <button
    class="btn btn-danger"
    data-type="remove"
    data-id="<%= notes[i].id %>"
  >
    Отмена
  </button>
</div></form>`
}

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
