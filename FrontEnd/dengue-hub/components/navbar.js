import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import '../styles/global.css';
import Image from 'next/image';
import Logo from '../public/logo-mosquito.svg';
import Drawer from './drawer';

const Navbar = () => {
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
      <div className="navbar bg-button rounded-full">
        <div className="flex-1">
          <Drawer />
          <a href='/' className="btn btn-ghost text-2xl font-bold">
            DENGUE HUB
            <img src="/logo-mosquito.svg" alt="Logo" width={40} height={40} className="mr-1" />
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control" ref={searchBarRef}>
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto bg-sidebar font-bold"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm.length > 0 && filteredItems.length > 0 && (
              <div className="results" style={{ width: searchBarRef.current ? searchBarRef.current.offsetWidth : 'auto' }}>
                {filteredItems.map((item) => (
                  <Link key={item.slug} href={`/wiki/${item.slug}`} legacyBehavior>
                    <a className="result-item">{item.title}</a>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/user-icon-small.svg" alt="Logo" width={0} height={0} className="mr-1" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-sidebar rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
      <style jsx>{`
        .results {
          position: absolute;
          background: white;
          border: 1px solid #ccc;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
          margin-top: 2.5rem; /* Adjust this value as needed */
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

export default Navbar;