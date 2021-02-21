import React, { Component } from 'react';

import { CSSTransition } from 'react-transition-group';
import {v4 as uuidv4} from 'uuid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import './App.css';

class App extends Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidMount() {
    const persistedContacts = localStorage.getItem('contacts');
    if (persistedContacts) {
        this.setState({
          contacts: JSON.parse(persistedContacts),
        })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      }
    });
  }

  handleChangeFilter = filter => {
    this.setState({filter});
  }

  getFilteredContacts = () => {
    const {contacts, filter} = this.state;
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }

  handleRemove = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({id}) => id !== contactId)
      }
    })
  }

  render() {
    const {contacts, filter} = this.state;
    return(
      <>
        <div className="Container">
          <section title="Phonebook" className="Section">
            <CSSTransition in={true} timeout={500} appear classNames="Title-anime" unmountOnExit>
              <h1>Phonebook</h1>
            </CSSTransition>
            <ContactForm contacts={contacts} onAddContact={this.addContact}/>
          </section>
          <section title="Contacts" className="Section">
            <h2>Contacts</h2>
            <Filter value={filter} onChangeFilter={this.handleChangeFilter}/>
            <ContactList filteredContacts={this.getFilteredContacts()} onRemove={this.handleRemove} />
          </section>
        </div>
      </>
    )
  }
}

export default App;
