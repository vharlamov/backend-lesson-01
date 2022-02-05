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
			// console.log(noteInnerHtml)

			const inputValue = liElem.firstChild.data.trim()
			// console.log(inputValue)
			liElem.innerHTML = getForm(inputValue, id)
			break
		case 'submit':
			// console.log(liElem.children[0].value)
			const data = liElem.children[0].value

			edit(id, data)

			liElem.innerHTML = noteInnerHtml
			liElem.firstChild.data = data

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
	return `
  <input type="text" value="${value}"/>
<div class="d-flex">
  <button
    class="btn btn-success me-2"
    data-type="submit"
    data-id=${id}
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
</div>`
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
