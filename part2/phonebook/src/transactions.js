import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getContacts = () =>  axios.get(baseUrl);

const addContact = contact => axios.post(baseUrl, contact);

const updateContact = (id, contact) => axios.put(`${baseUrl}/${id}`, contact);

const deleteContact = id => axios.delete(`${baseUrl}/${id}`);

export default { 
  getContacts: getContacts,
  addContact: addContact,
  updateContact: updateContact,
  deleteContact: deleteContact
}