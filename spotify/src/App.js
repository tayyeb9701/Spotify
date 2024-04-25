import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "artists":
      case "albums":
      case "genres":
        return <ContentPage activeTab={activeTab} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <button className="button" onClick={() => handleTabChange("home")}>Home</button>
        <button className="button" onClick={() => handleTabChange("artists")}>Artists</button>
        <button className="button" onClick={() => handleTabChange("albums")}>Albums</button>
        <button className="button" onClick={() => handleTabChange("genres")}>Genres</button>
      </div>
      {renderContent()}
    </div>
  );
}

function Home() {
  const albumsUrl = "http://localhost:8000/albums";
  const [randomAlbums, setRandomAlbums] = useState([]);

  useEffect(() => {
    fetchRandomAlbums();
  }, []);

  const fetchRandomAlbums = () => {
    fetch(albumsUrl)
      .then((res) => res.json())
      .then((data) => {
        let randomAlbumsArray = [];
        while (randomAlbumsArray.length < 40 && data.length > 0) {
          let random = data[Math.floor(Math.random() * 100 )];
          randomAlbumsArray.push(random);
        }
        setRandomAlbums(randomAlbumsArray);
      })
      .catch((error) => console.log("Error fetching data: ", error));
  };

  return (
    <div className="home">
      <center><h1>Home</h1></center>
      <div className="album-container">
        {randomAlbums.map((random) => (
          <div className="album-card" key={random.id}>
            <h5>{random.name}</h5>
            <img src={random.cover} alt={random.name} />
          </div>
        ))}
      </div>
    </div>
  );
}



function ContentPage({ activeTab }) {
  const url = `http://localhost:8000/${activeTab}`;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log("Error fetching data: ", error));
  }, [url]);

  return (
    <div className="album-container">
      <h1>{activeTab}</h1>
      <div className="album-container">
        {data.map((item) => (
          <div key={item.id} className="album-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;