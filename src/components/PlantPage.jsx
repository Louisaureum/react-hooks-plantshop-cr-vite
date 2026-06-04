import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const PLANTS_URL = "http://localhost:6001/plants";

function PlantPage() {
  const [allPlants, setAllPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(PLANTS_URL)
      .then((response) => response.json())
      .then((data) => {
        const normalizedPlants = data.map((plant) => ({
          ...plant,
          inStock: plant.inStock ?? true,
        }));
        setAllPlants(normalizedPlants);
      });
  }, []);

  function filterPlants(plantList, term) {
    return plantList.filter((plant) =>
      plant.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  function handleAddPlant(newPlant) {
    fetch(PLANTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((createdPlant) => {
        const plantWithStock = { ...createdPlant, inStock: true };
        setAllPlants((prevPlants) => [...prevPlants, plantWithStock]);
      });
  }

  function handleSearch(value) {
    setSearchTerm(value);
  }

  function handleToggleSoldOut(id) {
    setAllPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === id ? { ...plant, inStock: !plant.inStock } : plant
      )
    );
  }

  const plants = filterPlants(allPlants, searchTerm);

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearch={handleSearch} />
      <PlantList plants={plants} onToggleSoldOut={handleToggleSoldOut} />
    </main>
  );
}

export default PlantPage;
