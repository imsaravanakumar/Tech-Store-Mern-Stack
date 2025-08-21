// src/components/Searchbar.jsx
import React, { useState } from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Searchbar = ({ products }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

   const toggleSearch = () => {
    setIsOpen(!isOpen);
  };
  // ✅ Handle typing
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Show suggestions for typing
    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Show only first 5 suggestions
    }
  };

  // ✅ On search click → go to SearchProducts page
  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search/${encodeURIComponent(query)}`);
      setSuggestions([]);
    }
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute left-0 top-0 h-24 z-50 bg-white" : "w-auto"
      }`}
    >

      {isOpen ? (
        <div className="relative w-full flex items-center justify-center">
          <div className="w-1/2 relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        className="p-2 w-full rounded border-2 text-black"

      />

      <button
        onClick={handleSearch}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white h-full px-5 bg-amber-400 cursor-pointer rounded-r"
      >
        <FaMagnifyingGlass/>
      </button>
      </div>
      <button
            type="button"
            onClick={toggleSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <FaXmark className="h-6 w-6 text-white bg-red-500 rounded" />
          </button>
        </div>
        ) : (
        <button onClick={toggleSearch}>
          <FaMagnifyingGlass className="h-5 w-5 md:h-6 md:w-6" />
        </button>)}
        


      {suggestions.length > 0 && (
        <ul className="absolute top-16 left-[338px] right-0 bg-black border rounded shadow mt-1 w-1/2 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setQuery(item.name);
                navigate(`/search/${encodeURIComponent(item.name)}`);
                setSuggestions([]);
              }}
              className="p-2 hover:bg-white hover:text-black cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
