let noteInnerHtml = ''
let nowEdited = false
let liElem = ''

document.addEventListener('click', async (e) => {
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

			const inputValue = liElem.querySelector('span').innerText.trim()
			liElem.innerHTML = getForm(inputValue, id)
			break
		case 'submit':
			const data = liElem.querySelector('input').value
			if (!data) return

			await edit(id, data)

			liElem.innerHTML = noteInnerHtml
			liElem.querySelector('span').innerText = data

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
  <input type="text" class="form-control me-3" value="${value}"/>
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
