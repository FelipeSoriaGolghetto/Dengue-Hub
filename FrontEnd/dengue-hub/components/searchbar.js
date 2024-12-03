import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import '../styles/global.css';
import Image from 'next/image';
import Logo from '../public/logo-mosquito.svg';
import Drawer from './drawer.js';

const SearchBar = () => {
  const [items, setItems] = useState([]); // List of items from the API
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items
  const searchBarRef = useRef(null); // Reference to the search bar

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/articles/slugs');
        const data = await response.json();
        if (Array.isArray(data)) {
          setItems(data); // Stores API data in the state
          setFilteredItems(data); // Initially, show all data
        } else {
          console.error('API response is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter API items based on the search term
    if (term === "") {
      setFilteredItems([]); // Clear filtered items if the term is empty
    } else {
      setFilteredItems(
        items.filter((item) =>
          item.title && item.title.toLowerCase().includes(term)
        )
      );
    }
  };

  return (
    <>
      <div className="input flex items-end gap-1 h-14 w-2/5" ref={searchBarRef}>
          <Drawer/>
        <input
          type="text"
          className="grow border-none w-screen mb-1.5 ml-10"
          placeholder="O que deseja saber sobre a dengue?"
          value={searchTerm}
          onChange={handleSearch}
          />
        <img src="/lupa.svg" alt="search" width={90} className="mr-1 mb-0.5" />  
      </div>
      {searchTerm.length > 0 && filteredItems.length > 0 && (
        <div className="results" style={{ width: searchBarRef.current ? searchBarRef.current.offsetWidth : 'auto' }}>
          {filteredItems.map((item) => (
            <Link key={item.slug} href={`/wiki/${item.slug}`} legacyBehavior>
              <a className="result-item">{item.title}</a>
            </Link>
          ))}
        </div>
      )}
      <style jsx>{`
        .results {
          position: absolute;
          background: white;
          border: 1px solid #ccc;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
        }
        .result-item {
          display: block;
          padding: 10px;
          border-bottom: 1px solid #ccc;
          text-decoration: none;
          color: black;
        }
        .result-item:hover {
          background: #f0f0f0;
        }
      `}</style>
    </>
  );
};

export default SearchBar;