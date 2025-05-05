import React, { useEffect, useState } from 'react';
import { getPets } from '../api';

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    getPets()
      .then(res => setPets(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 style={styles.title}>Current Pets</h2>
      {pets.length === 0 ? (
        <p style={styles.empty}>No pets available. Add one above! 🐶</p>
      ) : (
        <ul style={styles.list}>
          {pets.map(pet => (
            <li key={pet._id} style={styles.card}>
              <strong>{pet.name}</strong> ({pet.species})<br />
              Age: {pet.age || 'Unknown'}<br />
              Vaccinated: {pet.vaccinated === true ? 'Yes' : pet.vaccinated === false ? 'No' : 'Unknown'}<br />
              Owner: {pet.owner?.name || "Unknown"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  title: {
    marginBottom: '1rem',
    color: '#444',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  card: {
    backgroundColor: '#fff',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
  empty: {
    fontStyle: 'italic',
    color: '#888',
  },
};

export default PetList;
