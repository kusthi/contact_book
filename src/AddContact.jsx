import { useState } from 'react';
import { getContactsFromStorage } from './Data';

export default function AddContact({
  contacts,
  setContacts,
  setStatus,
  setSelectedContactId,
}) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [mail, setMail] = useState('');
  const [photo, setPhoto] = useState('');
  const [address, setAddress] = useState('');

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <form
      className='display-contact-cont'
      onSubmit={e => {
        e.preventDefault();
        const nextId = getNextId(contacts);
        sessionStorage.setItem(
          String(nextId),
          JSON.stringify({
            id: nextId,
            name: name,
            mobile: mobile,
            mail: mail,
            address: address,
            photo: photo,
          })
        );
        setContacts(getContactsFromStorage());
        setSelectedContactId(nextId);
        setStatus('Show');
      }}
    >
      <div className='contact-img-large-cont'>
        {isImageLoaded ? (
          <img
            className='contact-img-large'
            src={photo.replace('150x150', '350x350')}
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
              value={photo}
              onChange={() => {
                const reader = new FileReader();
                reader.readAsDataURL(
                  document.getElementById('contact-photo-input').files[0]
                );
                reader.onload = () => {
                  setIsImageLoaded(true);
                  setPhoto(reader.result);
                };
              }}
              required
            />
          </div>
        )}
      </div>
      <div className='contact-details-cont'>
        <div>
          <ion-icon name='person'></ion-icon>
          <input
            className='input-text-field'
            type='text'
            spellCheck='false'
            value={name}
            placeholder='Name'
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <ion-icon name='call'></ion-icon>
          <input
            className='input-text-field'
            type='tel'
            spellCheck='false'
            value={mobile}
            placeholder='Mobile'
            onChange={e => setMobile(e.target.value)}
            required
          />
        </div>
        <div>
          <ion-icon name='mail'></ion-icon>
          <input
            className='input-text-field'
            type='email'
            spellCheck='false'
            value={mail}
            placeholder='E-mail'
            onChange={e => setMail(e.target.value)}
          />
        </div>
        <div>
          <ion-icon name='home'></ion-icon>
          <textarea
            className='input-text-field'
            type='text'
            spellCheck='false'
            value={address}
            placeholder='Address'
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div className='change-buttons-cont'>
          <>
            <button
              className='btns'
              onClick={e => {
                e.preventDefault();
                setStatus('Show');
              }}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='btns'
            >
              Add
            </button>
          </>
        </div>
      </div>
    </form>
  );
}

function getNextId(contacts) {
  if (contacts.length === 0) {
    return 0;
  } else {
    const getAllIds = contacts.map(contact => contact.id).sort((a, b) => a - b);
    let getFirstMissingId = getAllIds[getAllIds.length] + 1;
    for (let i = 0; i < getAllIds.length; i++) {
      const nextId = getAllIds[i + 1];
      const exceptedNextId = getAllIds[i] + 1;
      if (nextId !== exceptedNextId) {
        getFirstMissingId = exceptedNextId;
        break;
      }
    }
    return getFirstMissingId;
  }
}
