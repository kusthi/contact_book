import { getContactsFromStorage } from './Data';
import { useState, useRef } from 'react';

export default function ShowContact({
  contact,
  contacts,
  setContacts,
  setSelectedContactId,
  status,
  setStatus,
}) {
  const [name, setName] = useState(contact.name);
  const [mobile, setMobile] = useState(contact.mobile);
  const [mail, setMail] = useState(contact.mail);
  const [address, setAddress] = useState(contact.address);
  const [photo, setPhoto] = useState(contact.photo);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const nameInputField = useRef(null);
  const isEditing = status === 'Editing';

  return (
    <form
      className='display-contact-cont'
      onSubmit={e => {
        e.preventDefault();
        setStatus('Show');
        sessionStorage.removeItem(contact.id);
        sessionStorage.setItem(
          String(contact.id),
          JSON.stringify({
            ...contact,
            photo: photo !== '' ? photo : contact.photo,
            name: name,
            mobile: mobile,
            mail: mail,
            address: address,
          })
        );
        setContacts(getContactsFromStorage());
        setIsImageLoaded(false);
        setPhoto('');
      }}
    >
      <div className='contact-img-large-cont'>
        {isEditing ? (
          isImageLoaded ? (
            <img
              className='contact-img-large'
              src={
                photo !== ''
                  ? photo.replace('150x150', '350x350')
                  : contact.photo
              }
              alt="contact's portait that is large sized"
            />
          ) : (
            <div>
              <label
                className='contact-photo-input-label'
                htmlFor='contact-photo-input'
              >
                Upload profile picture
              </label>
              <input
                type='file'
                id='contact-photo-input'
                defaultValue={''}
                onChange={() => {
                  const reader = new FileReader();
                  reader.readAsDataURL(
                    document.getElementById('contact-photo-input').files[0]
                  );

                  reader.onload = () => {
                    setIsImageLoaded(true);
                    setPhoto(reader.result);
                    nameInputField.current.focus();
                  };
                }}
              />
            </div>
          )
        ) : (
          <img
            className='contact-img-large'
            src={contact.photo.replace('150x150', '350x350')}
            alt="contact's portait that is large sized"
          />
        )}
      </div>
      <div
        className='contact-details-cont'
        id={isEditing ? 'contact-details-cont-comfy' : ''}
      >
        <div>
          {isEditing ? (
            <input
              ref={nameInputField}
              className='input-text-field contact-name-large'
              id='input-text-field-name'
              type='text'
              spellCheck='false'
              defaultValue={contact.name}
              onChange={e => setName(e.target.value)}
              autoFocus
              required
            />
          ) : (
            <p className='contact-name-large'>{contact.name}</p>
          )}
        </div>
        <div>
          <ion-icon name='call'></ion-icon>
          {isEditing ? (
            <input
              className='input-text-field'
              type='tel'
              spellCheck='false'
              defaultValue={contact.mobile}
              onChange={e => setMobile(e.target.value)}
              required
            />
          ) : (
            <p>{contact.mobile}</p>
          )}
        </div>
        <div>
          <ion-icon name='mail'></ion-icon>
          {isEditing ? (
            <input
              className='input-text-field'
              type='email'
              spellCheck='false'
              defaultValue={contact.mail}
              onChange={e => setMail(e.target.value)}
            />
          ) : (
            <p>{contact.mail}</p>
          )}
        </div>
        <div>
          <ion-icon name='home'></ion-icon>
          {isEditing ? (
            <textarea
              className='input-text-field'
              type='text'
              spellCheck='false'
              defaultValue={contact.address}
              onChange={e => setAddress(e.target.value)}
            />
          ) : (
            <p>{contact.address}</p>
          )}
        </div>
        <div className='change-buttons-cont'>
          {isEditing ? (
            <>
              <button
                className='btns'
                onClick={e => {
                  e.preventDefault();
                  setStatus('Show');
                  setIsImageLoaded(false);
                  setPhoto('');
                }}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='btns'
              >
                Save
              </button>
            </>
          ) : (
            <>
              <button
                className='btns'
                onClick={e => {
                  e.preventDefault();
                  setStatus('Editing');
                  setName(contact.name);
                  setMobile(contact.mobile);
                  setMail(contact.mail);
                  setAddress(contact.address);
                  setPhoto(contact.photo);
                }}
              >
                Edit
              </button>
              <button
                className='btns'
                onClick={e => {
                  e.preventDefault();
                  sessionStorage.removeItem(contact.id);
                  setContacts(getContactsFromStorage());
                  setSelectedContactId(
                    getNextSelectionId(contacts, contact.id)
                  );
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function getNextSelectionId(contacts, currentId) {
  const getAllIds = contacts.map(contact => contact.id);
  const indexofCurrentId = getAllIds.indexOf(currentId);
  const indexForNextId = (indexofCurrentId + 1) % contacts.length;
  return getAllIds[indexForNextId];
}
