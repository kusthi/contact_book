import { getContactsFromStorage } from './Data';

export default function ListContacts({
  contacts,
  setContacts,
  selectedContactId,
  setSelectedContactId,
  isSearching,
  setStatus,
  searchText,
  sidebarId,
  heroClassName,
}) {
  const searchWords = searchText.toLowerCase().trim().split(' ');
  const contactsForSearch = contacts.filter(
    contact =>
      contact.name
        .toLowerCase()
        .split(' ')
        .filter(
          name =>
            name.startsWith(searchWords[0]) || name.startsWith(searchWords[1])
        ).length > 0
  );

  const getContacts = (contacts, isFav) =>
    contacts.filter(c => (isFav ? c.fav : !c.fav));

  const favContacts = getContacts(contacts, true);
  const nonFavContacts = getContacts(contacts, false);
  const favSearchableContacts = getContacts(contactsForSearch, true);
  const nonFavSearchableContacts = getContacts(contactsForSearch, false);

  const getContactsListForRender = contacts =>
    contacts.map(contact => (
      <div
        key={contact.id}
        className='contact-cont'
        onClick={() => {
          setStatus('Show');
          setSelectedContactId(contact.id);
          const sideEl = document.getElementById(sidebarId);
          const mainEl = document.getElementsByClassName(heroClassName)[0];
          if (mainEl.style.display !== 'block') {
            sideEl.style.display = 'none';
            mainEl.style.display = 'block';
          }
        }}
      >
        <div className='contact-thumb-profile-cont'>
          <img
            className='contact-img'
            src={contact.photo}
            alt="contact's portait that is thumbnail sized"
          />
          <span
            className={
              selectedContactId === contact.id
                ? 'contact-name on-contact-selection'
                : 'contact-name'
            }
          >
            {contact.name}
          </span>
        </div>
        <div
          className='contact-fav-icon-cont'
          onClick={e => {
            e.stopPropagation();
            sessionStorage.removeItem(contact.id);
            sessionStorage.setItem(
              String(contact.id),
              JSON.stringify({
                ...contact,
                fav: !contact.fav,
              })
            );
            setContacts(getContactsFromStorage());
          }}
        >
          <span
            className={
              contact.fav ? 'contact-fav-icon fav-color' : 'contact-fav-icon'
            }
          >
            ❤
          </span>
        </div>
      </div>
    ));

  return (
    <>
      {favContacts.length > 0 ? (
        <div
          className={
            nonFavSearchableContacts.length > 0 &&
            favSearchableContacts.length > 0
              ? 'fav-contacts-cont'
              : favSearchableContacts.length > 0
              ? 'fav-contacts-cont'
              : null
          }
        >
          <div>
            {favSearchableContacts.length > 0 ? <h3>Favorites</h3> : null}
          </div>
          <div className='fav-contacts-list-cont'>
            {!isSearching
              ? getContactsListForRender(favContacts)
              : getContactsListForRender(favSearchableContacts)}
          </div>
          {nonFavSearchableContacts.length > 0 &&
          favSearchableContacts.length > 0 ? (
            <hr className='line-div' />
          ) : null}
        </div>
      ) : null}
      <div className='contacts-book-cont'>
        {!isSearching
          ? getContactsListForRender(nonFavContacts)
          : getContactsListForRender(nonFavSearchableContacts)}
      </div>
    </>
  );
}
