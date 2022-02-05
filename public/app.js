let noteInnerHtml = ''
let nowEdited = false
let liElem = ''

document.addEventListener('click', (e) => {
	const id = e.target.dataset.id
	const type = e.target.dataset.type
	liElem = e.target.closest('li')

	switch (type) {
		case 'remove':
			remove(id).then(() => {
				liElem.remove()
			})
			break
		case 'edit':
			if (nowEdited) return
			nowEdited = true

			noteInnerHtml = liElem.innerHTML

			const inputValue = liElem.children[0].firstChild.data.trim()
			liElem.innerHTML = getForm(inputValue, id)
			break
		case 'submit':
			const data = e.target.form[0].value

			edit(id, data)

			liElem.innerHTML = noteInnerHtml
			liElem.children[0].firstChild.data = data

			nowEdited = false
			liElem = ''
			break
		case 'cancel':
			liElem.innerHTML = noteInnerHtml
			nowEdited = false
			liElem = ''
			break
		default:
			return
	}
})

function getForm(value, id) {
	return `<form action="/" method="put">
  <div class="d-flex justify-content-between align-items-center">
  <input type="text" value="${value}"/>
<div class="d-flex">
  <button
    class="btn btn-success me-2"
    data-type="submit"
    data-id=${id}
    type="submit"
  >
    Сохранить
  </button>
  <button
    class="btn btn-danger"
    data-type="cancel"
    data-id=${id}
  >
    Отмена
  </button>
</div></div></form>`
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
