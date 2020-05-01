import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import transactions from './transactions'
/*
=====================
Phonebook
=====================
*/
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(0);
  const [message, setMessage] = useState({ content: '', type: ''});

  //notification
  const showNotification = (msg, t) => {
    setMessage({ content : msg, type: t });
    setTimeout(() => setMessage({
      content: '',
      type: ''
    }), 5000);
  }

  const submit = (e) => {
    e.preventDefault();
    
    let duplicateName = persons.some(({ name }) => name === newName);
    let duplicateNumber = persons.some(({ number }) => number === newNumber);
    let numberUpdate = persons.find(({ name, number}) => name === newName && number !== newNumber);

    if (newName === "" || newNumber === "") {
      return showNotification(`Please enter a valid name and phone number`, 'warning');
    } 
    else if (numberUpdate !== undefined) {
      let contactName = numberUpdate.name,
      confirmed = window.confirm(`${ contactName } already exists. Do you want to replace it?`)
      
      if (confirmed) {
        return transactions.updateContact(numberUpdate.id, {
          ...numberUpdate,
          number: newNumber
        })
        .then(res => {
          setPersons(persons.filter(({ id }) => id !== res.data.id).concat(res.data));
          showNotification(`Updated ${res.data.name} successfully`, 'success');
          setNewName("");
          setNewNumber("");
        })
        .catch(err => {
          console.log(err.message);
          showNotification(`Unable to update ${numberUpdate.name}. This person's info has been removed from the server.`, 'error');
        });
      }
    } 
    else if (duplicateName && duplicateNumber) {
      return showNotification(`${newName} already exists`, 'warning');
    } else {
      transactions.addContact({ name: newName, number: newNumber, id: Date.now() })
      .then(res => {
        setPersons([...persons, res.data]);
        showNotification(`Added ${ res.data.name } successfully!`, 'success')
      })
      .catch(err => {
        console.log(err.message);
        showNotification(`Unable to save ${ newName }.`, 'error');
      })
      setNewName("");
      return setNewNumber("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (e.target.value === 0) return setResults(0);

    setSearch(e.target.value);
    let results = persons.filter((person) =>
      new RegExp(`^${e.target.value}`, "i").test(person.name)
    );
    setResults(results);
  };

  //delete
  const handleDelete = e => {
    e.preventDefault();

    if (e.target.className === 'delete-contact') {
      let contactName = e.target.closest('div').firstChild.textContent,
      contactId = e.target.closest('div').dataset.id,
      confirmed = window.confirm(`Delete ${ contactName }?`);

      if (confirmed) {
        transactions.deleteContact(contactId)
        .then(res => {
          console.log(contactId);
          setPersons(persons.filter(({ id }) => id !== Number(contactId)));
          showNotification(`${ contactName } deleted successfully!`, 'success')
        })
        .catch(err => {
          showNotification(`Unable to delete ${ contactName }. It has been removed from the server.`, 'error')
        })
      }
    }
  }

  useEffect(() => {
    transactions.getContacts('http://localhost:3001/persons')
    .then(res => setPersons(res.data))
  }, []);

  return (
    <div id="phonebook">
      <h2>Phonebook</h2>
      {
        message.content !== '' ?
        <p className={`message message-${message.type}`}>{ message.content }</p> :
        ''
      }
      <div id="left">
        <SearchFilter handleSearch={handleSearch} search={search} />
        <AddPerson
          submit={submit}
          setName={(e) => setNewName(e.target.value)}
          name={newName}
          setNumber={(e) => setNewNumber(e.target.value)}
          number={newNumber}
        />
      </div>
      <Contacts results={results} persons={persons} deleteContact={ handleDelete } />
    </div>
  );
};
/*
=====================
Filter
=====================
*/
const SearchFilter = ({ handleSearch, search }) => {
  return (
    <div id="search-filter">
      <label htmlFor="search">Search:</label>
      <input onChange={handleSearch} type="search" value={search} />
    </div>
  );
};
/*
========================
Form for adding contacts
========================
*/
const AddPerson = ({ submit, setName, name, setNumber, number }) => {
  return (
    <form onSubmit={submit}>
      <h3>Add new contact</h3>
      <label htmlFor="name">Name:</label>
      <input type="text" onChange={setName} value={name} />

      <label htmlFor="number">Number:</label>
      <input type="text" onChange={setNumber} value={number} />
      <button type="submit">Add</button>
    </form>
  );
};
/*
=====================
Contacts
=====================
*/
const Contacts = ({ results, persons, deleteContact }) => {
  return (
    <div id="contacts" onClick={ deleteContact }>
      <h2>Numbers</h2>
      {results !== 0
        ? results.map(({ name, number, id }) => (
            <div key={ id } className="contact" data-id={ id }>
              <p>{name}</p>
              <p>{number} <button className="delete-contact">Delete</button></p>
            </div>
          ))
        : persons.map(({ name, number, id }) => (
            <div key={ id } className="contact" data-id={ id }>
              <p>{name}</p>
              <p>{number} <button className="delete-contact">Delete</button></p>
            </div>
          ))}
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));