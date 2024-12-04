import Card from "../Card";
import Navbar from "../Navbar";
import Search from "../Search";

import { useState, useEffect } from "react";

interface DataItem {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
  contact: string;
  location: string;
}

const Home = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  console.log(filteredData, "filter");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        console.log("Fetched data:", jsonData);
        setData(jsonData);
        // setFilteredData(jsonData);
      })
      .catch(() => {
        setError("Failed to load data");
      });
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredData([]);
      setError("Please enter a search term");
      return;
    }

    const filtered = data.filter((item) =>
      item.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setError("");
  };

  const handleFilter = (query: string) => {
    if (!query.trim()) {
      setFilteredData([]);
      setError("Please enter a valid name to filter");
      return;
    }

    const filtered = data.filter(
      (item) =>
        item.first_name.toLowerCase().includes(query.toLowerCase()) ||
        item.last_name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredData(filtered);
    setError(
      filtered.length === 0 ? "No results found for the applied filters." : ""
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-[#b7cffe]">
      <Navbar filteredData={filteredData} onSearch={handleFilter} />

      {filteredData.length > 0 ? (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, index) => (
              <Card key={index} data={item} />
            ))}
          </div>
        </div>
      ) : (
        <Search
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
          error={error}
        />
      )}
    </div>
  );
};

export default Home;
