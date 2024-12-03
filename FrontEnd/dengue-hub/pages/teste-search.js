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
        const response = await fetch('http://localhost:8000/articles/');
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
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter API items based on the search term
    if (term === "") {
      setFilteredItems(items); // Show all items if the term is empty
    } else {
      setFilteredItems(
        items.filter((item) =>
          item.title && item.title.toLowerCase().includes(term)
        )
      );
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search articles..."
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            <a href={`/wiki/${item.id}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}