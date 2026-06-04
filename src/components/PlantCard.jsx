import React from "react";

function PlantCard({ plant, onToggleSoldOut }) {
  const buttonText = plant.inStock ? "In Stock" : "Out of Stock";

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button
        className={plant.inStock ? "primary" : undefined}
        onClick={() => onToggleSoldOut(plant.id)}
      >
        {buttonText}
      </button>
    </li>
  );
}

export default PlantCard;
