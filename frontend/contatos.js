'use strict'

const getContact = async (url) => {
    const response = await fetch(url)
    const json = await response.json()
    return json.data
}

const createContact = async (contato) => {
    const url = "http://localhost/consumoAPI/backend/apiphp/contatos/"
    const options = {
        method: 'POST',
        body: JSON.stringify(contato)
    }
    await fetch(url, options)
}

const updateContact = async (contact) => {
    const url = `http://localhost/consumoAPI/backend/apiphp/contatos/${contact.id}`
    const options = {
        method: 'PUT',
        body: JSON.stringify(contact)
    }
    await fetch(url, options)
}

const createRow = (contato) => {

    const tbody = document.querySelector('main>table>tbody')
    const newRow = document.createElement('tr')

    newRow.innerHTML = `
        <td>${contato.id}</td>
        <td>${contato.nome}</td>
        <td>${contato.email}</td>
        <td>${contato.cidade}</td>
        <td>${contato.estado}</td>
    `
    tbody.appendChild(newRow)
}

const clearTable = () => {
    const tbody = document.querySelector('main>table>tbody')
    while (tbody.firstChild) {
        tbody.removeChild(tbody.lastChild)
    }
}

const updateTable = async () => {
    clearTable()
    const url = "http://localhost/consumoAPI/backend/apiphp/contatos/"
    const contatos = await getContact(url)
    contatos.forEach(createRow)
}

const clearFields = () => {
    document.getElementById('nome').value=''
    document.getElementById('email').value=''
    document.getElementById('cidade').value=''
    document.getElementById('estado').value = ''
    document.getElementById('nome').dataset.idcontact = "new"
}

const isValidForm = () => document.querySelector('main>form').reportValidity()

const saveContact = async () => {
    if (isValidForm()) {
        const newContact = {
            'id'    : '',
            'nome'  : document.getElementById('nome').value,
            'email' : document.getElementById('email').value,
            'cidade': document.getElementById('cidade').value,
            'estado': document.getElementById('estado').value
        }
        const idContact = document.getElementById('nome').dataset.idcontact
        if (idContact == "new") {
            await createContact(newContact)
        } else {
            newContact.id = idContact
            console.log (newContact)
            await updateContact(newContact)
            document.getElementById('deletar').disabled = false
        }
        updateTable()
        clearFields() 
    }
}

const fillFields = (contact) => {
    document.getElementById('nome').value = contact.nome
    document.getElementById('email').value = contact.email
    document.getElementById('cidade').value = contact.cidade
    document.getElementById('estado').value = contact.estado
    document.getElementById('nome').dataset.idcontact = contact.id
}

const editContact = async() => {
    const id = prompt("Digite o ID para editar")
    if (id > 0) {
        const url = `http://localhost/consumoAPI/backend/apiphp/contatos/${id}`
        const contact = await getContact(url)
        if (contact == "id não encontrado") {
            alert ("ID não encontrado!")    
        } else {
            fillFields(contact[0])
            document.getElementById('deletar').disabled = true
        }
        
    }
}

const deleteContact = async () => {
    const idContact = prompt("Digite o ID excluir")
    if (idContact > 0) {
        const url = `http://localhost/consumoAPI/backend/apiphp/contatos/${idContact}`
        const options = {
            method: 'DELETE',
        }
        await fetch(url, options)
        updateTable()
    }
}

updateTable()

// Eventos
document.getElementById('salvar').addEventListener('click', saveContact)
document.getElementById('editar').addEventListener('click', editContact)
document.getElementById('deletar').addEventListener('click', deleteContact)