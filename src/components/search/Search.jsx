export default function Search({ search, setSearch, handleSearch }) {
  return (
    <div className="search-engine">
      <input
        className="city-search"
        type="text"
        placeholder="Enter a name of a city..."
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search Weather
      </button>
    </div>
  );
}
