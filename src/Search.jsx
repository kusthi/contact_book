export default function Search({ setIsSearching, searchText, setSearchText }) {
  return (
    <div className='input-contact-cont'>
      <div className='search-icon-cont'>
        <ion-icon
          name='search'
          className='search-icon'
        />
      </div>
      <input
        className='search-contact'
        type='text'
        placeholder='Search'
        value={searchText}
        onChange={e => {
          setIsSearching(true);
          setSearchText(e.target.value);
        }}
      />
    </div>
  );
}
