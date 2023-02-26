export const contactsList = [
  {
    id: 0,
    name: 'Chiwetel Ejiofor',
    mobile: '(632) 460-0280',
    mail: 'ejiofor_231@gmail.com',
    address: '3626 N Stelling Rd, Wandsworth, London',
    photo:
      'https://cdn.lorem.space/images/face/.cache/150x150/pexels-creation-hill-1681010.jpg',
    fav: false,
  },
  {
    id: 1,
    name: 'Lin Stefancik',
    mobile: '(331) 799-6146',
    mail: 'stefancik_543@gmail.com',
    address: '5808 Preston Rd, Buffalo Park, NYC',
    photo:
      'https://cdn.lorem.space/images/face/.cache/150x150/stefan-stefancik-QXevDflbl8A-unsplash.jpg',
    fav: false,
  },
  {
    id: 2,
    name: 'Omer Karakus',
    mobile: '(890) 332-0190',
    mail: 'pitzalis_931@gmail.com',
    address: '7031 Pockrus Rd, Sugar House, Salt Lake City',
    photo:
      'https://cdn.lorem.space/images/face/.cache/150x150/omer-karakus-AjGyA81epeI-unsplash.jpg',
    fav: false,
  },
  {
    id: 3,
    name: 'Taylor Hernandez',
    mobile: '(242) 416-3912',
    mail: 'hernandez_343@gmail.com',
    address: '6374 Spring St, Dallas, Texas',
    photo:
      'https://cdn.lorem.space/images/face/.cache/150x150/pexels-roberto-hund-5357589.jpg',
    fav: false,
  },
  {
    id: 4,
    name: 'Nishanth Avva',
    mobile: '9804545443',
    mail: 'avva_nishanth@gmail.com',
    address: '4562 Pani Poori St, Bandra, Mumbai',
    photo:
      'https://cdn.lorem.space/images/face/.cache/150x150/nishanth-avva-SdCaK9YKdwk-unsplash.jpg',
    fav: false,
  },
  {
    id: 5,
    name: 'Megan Taylor',
    mobile: '9804545443',
    mail: 'callmelin@gmail.com',
    address: '0984 Croissant St, Paris',
    photo:
      'https://cdn.lorem.space/images/face/.cache/150x150/jason-yoder-s4nS3munSg8-unsplash.jpg',
    fav: false,
  },
  {
    id: 6,
    name: 'Chiwetel Ejiofor',
    mobile: '(632) 460-0280',
    mail: 'ejiofor_231@gmail.com',
    address: '3626 N Stelling Rd, Wandsworth, London',
    photo:
      'https://cdn.lorem.space/images/face/.cache/150x150/pexels-creation-hill-1681010.jpg',
    fav: false,
  },
  {
    id: 7,
    name: 'Lin Stefancik',
    mobile: '(331) 799-6146',
    mail: 'stefancik_543@gmail.com',
    address: '5808 Preston Rd, Buffalo Park, NYC',
    photo:
      'https://cdn.lorem.space/images/face/.cache/150x150/stefan-stefancik-QXevDflbl8A-unsplash.jpg',
    fav: false,
  },
  {
    id: 8,
    name: 'Omer Karakus',
    mobile: '(890) 332-0190',
    mail: 'pitzalis_931@gmail.com',
    address: '7031 Pockrus Page Rd, Sugar House, Salt Lake City',
    photo:
      'https://cdn.lorem.space/images/face/.cache/150x150/omer-karakus-AjGyA81epeI-unsplash.jpg',
    fav: false,
  },
  {
    id: 9,
    name: 'Taylor Hernandez',
    mobile: '(242) 416-3912',
    mail: 'hernandez_343@gmail.com',
    address: '6374 Spring St, Dallas, Texas',
    photo:
      'https://cdn.lorem.space/images/face/.cache/150x150/pexels-roberto-hund-5357589.jpg',
    fav: false,
  },
  {
    id: 10,
    name: 'Nishanth Avva',
    mobile: '9804545443',
    mail: 'avva_nishanth@gmail.com',
    address: '4562 Pani Poori St, Bandra, Mumbai',
    photo:
      'https://cdn.lorem.space/images/face/.cache/150x150/nishanth-avva-SdCaK9YKdwk-unsplash.jpg',
    fav: false,
  },
  {
    id: 11,
    name: 'Megan Taylor',
    mobile: '9804545443',
    mail: 'callmelin@gmail.com',
    address: '0984 Croissant St, Paris',
    photo:
      'https://cdn.lorem.space/images/face/.cache/150x150/jason-yoder-s4nS3munSg8-unsplash.jpg',
    fav: false,
  },
];

export function getContactsFromStorage() {
  const contactList = [];
  const keys = Object.keys(sessionStorage);
  for (let key of keys) {
    const contact = JSON.parse(sessionStorage.getItem(key));
    contactList.push(contact);
  }
  return contactList.sort((c1, c2) => c1.id - c2.id);
}
