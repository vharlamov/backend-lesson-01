let noteInnerHtml = ''
let nowEdited = false

document.addEventListener('click', (e) => {
	const id = e.target.dataset.id
	const type = e.target.dataset.type

	if (type === 'remove') {
		remove(id).then(() => {
			e.target.closest('li').remove()
		})
	} else if (type === 'edit') {
		if (nowEdited) return
		nowEdited = true
		const liElem = e.target.closest('li')

		noteInnerHtml = liElem.innerHTML
		const inputValue = liElem.children[0].firstChild.data.trim()
		liElem.innerHTML = getForm(inputValue, id)
	} else if (type === 'submit') {
		const data = e.target.form[0].value
		const liElem = e.target.closest('li')

		liElem.innerHTML = noteInnerHtml

		edit(id, data).then(() => {
			liElem.children[0].firstChild.data = data
		})
		nowEdited = false
	} else if (type === 'cancel') {
		e.target.closest('li').innerHTML = noteInnerHtml
		nowEdited = false
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
