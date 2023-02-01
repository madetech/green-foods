import './SearchBar.css';

const SearchBar = ({ handleClick, handleSearch, onChange }) => {
  return (
    <form id='search-form' onSubmit={handleSearch}>
      <label className='hidden' htmlFor='search-field'>
        search field
      </label>
      <input
        id='search-field'
        name='searchField'
        onChange={onChange}
        placeholder='search a product'
        type='text'
        required
      />
      <button type='submit' onClick={handleClick}>
        Submit
      </button>
    </form>
  );
};

export default SearchBar;
