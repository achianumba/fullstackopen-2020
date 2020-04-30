import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
/*
=====================
Phonebook
=====================
*/
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(0);

  const submit = (e) => {
    e.preventDefault();
    console.log(newName, newNumber);

    if (newName === "" || newNumber === "") {
      return alert("Please enter a valid contact");
    } else if (persons.some(({ name }) => name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
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

  return (
    <div id="phonebook">
      <h2>Phonebook</h2>
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
      <Contacts results={results} persons={persons} />
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
const Contacts = ({ results, persons }) => {
  return (
    <div id="contacts">
      <h2>Numbers</h2>
      {results !== 0
        ? results.map(({ name, number }, i) => (
            <div key={i} className="contact">
              <p>{name}</p>
              <p>{number}</p>
            </div>
          ))
        : persons.map(({ name, number }, i) => (
            <div key={i} className="contact">
              <p>{name}</p>
              <p>{number}</p>
            </div>
          ))}
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
