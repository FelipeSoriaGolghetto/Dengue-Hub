// pages/index.js
import { useState, useEffect } from 'react';
import '../styles/global.css';

export default function Home() {
  const [items, setItems] = useState([]); // List of items from the API
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setItems(data); // Stores API data in the state
        setFilteredItems(data); // Initially, show all data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter API items based on the search term
    if (term === "") {
      setFilteredItems(items); // Show all items if the term is empty
    } else {
      setFilteredItems(
        items.filter(item =>
          item.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-6">User Search</h1>

      {/* Search Form */}
      <form className="max-w-md w-full mb-6" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filtered Items List */}
      <div className="w-full max-w-md">
        <ul className="menu bg-base-200 rounded-box p-4 space-y-2">
          {filteredItems.map((item) => (
            <li key={item.id} className="p-2 rounded-md hover:bg-primary hover:text-white transition-colors">
              {item.name}
            </li>
          ))}
          {filteredItems.length === 0 && (
            <li className="text-center text-gray-500">No results found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
