import "./Search.css";
import { useState } from "react";
export default function Search() {
  const [search, setSearch] = useState("");

  const fetchGists = (value: string) => {
    const url = `https://api.github.com/gists/public?per_page=10&search=${value}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const results = data.map((gist: any) => ({
          id: gist.id,
          description: gist.description,
          url: gist.html_url,
          created_at: gist.created_at,
          updated_at: gist.updated_at,
        }));
        console.log("Fetched Gists:", results);
      })
      .catch((error) => {
        console.error("Error fetching gists:", error);
      });
  };

  const handleChange = (value: string) => {
    setSearch(value);
    fetchGists(value);
  }

  return (
    <div className="search">
      <input type="text"
        placeholder="Search Gists"
        value={search}
        onChange={(e) => handleChange(e.target.value)}
        className="search__input" />

      <button className="login__button">Login</button>
    </div>
  );
}