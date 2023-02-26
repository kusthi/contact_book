import { getContactsFromStorage } from './Data';
import Search from './Search';
import ListContacts from './ListContacts';
import { useState } from 'react';
import ShowContact from './ShowContact';
import AddContact from './AddContact';

export default function App() {
  const [contacts, setContacts] = useState(getContactsFromStorage());
  const [selectedContactId, setSelectedContactId] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('Show'); //Show, Editing, Deletion, Adding
  const [isSearching, setIsSearching] = useState(false); //true

  const selectedContact = contacts.filter(
    contact => contact.id === selectedContactId
  )[0];

  const sidebarClassName = 'contacts-sidebar-cont';
  const sidebarId = 'contacts-sidebar-cont-display';
  const heroClassName = 'contacts-hero-cont';

  isSearching && searchText === '' && setIsSearching(false);

  console.log(isSearching);

  return (
    <main>
      <div className='add-contact-btn-cont'>
        <button
          className='add-contact-btn'
          onClick={() => {
            const sideEl = document.getElementById(sidebarId);
            const mainEl = document.getElementsByClassName(heroClassName)[0];
            if (mainEl.style.display !== 'block') {
              sideEl.style.display = 'none';
              mainEl.style.display = 'block';
            }
            setStatus('Adding');
          }}
        >
          <span>+</span>
        </button>
      </div>
      {contacts.length === 0 && status !== 'Adding' ? (
        <div className='empty-list'>
          <p>No Contacts</p>
        </div>
      ) : (
        <div className='main-pane-cont'>
          {contacts.length !== 0 ? (
            <div
              className={sidebarClassName}
              id={sidebarId}
            >
              <Search
                setIsSearching={setIsSearching}
                searchText={searchText}
                setSearchText={setSearchText}
              />
              <ListContacts
                contacts={contacts}
                setContacts={setContacts}
                selectedContactId={selectedContactId}
                setSelectedContactId={setSelectedContactId}
                isSearching={isSearching}
                setStatus={setStatus}
                searchText={searchText}
                sidebarId={sidebarId}
                heroClassName={heroClassName}
              />
            </div>
          ) : null}
          <div className={heroClassName}>
            {status !== 'Adding' ? (
              <ShowContact
                contact={selectedContact}
                contacts={contacts}
                setContacts={setContacts}
                setSelectedContactId={setSelectedContactId}
                status={status}
                setStatus={setStatus}
              />
            ) : (
              <AddContact
                contacts={contacts}
                setContacts={setContacts}
                setStatus={setStatus}
                setSelectedContactId={setSelectedContactId}
              />
            )}
          </div>
          <div className='back-btn'>
            <button
              onClick={e => {
                e.stopPropagation();
                const sideEl = document.getElementById(sidebarId);
                const mainEl =
                  document.getElementsByClassName(heroClassName)[0];
                if (sideEl.style.display !== 'block') {
                  sideEl.style.display = 'block';
                  mainEl.style.display = 'none';
                } else {
                  sideEl.style.display = 'none';
                  mainEl.style.display = 'block';
                }
              }}
            >
              {'<'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
