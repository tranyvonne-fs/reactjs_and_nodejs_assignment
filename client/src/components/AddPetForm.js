import React, { useState, useEffect } from 'react';
import { getOwners, createPet } from '../api';

function AddPetForm({ onPetAdded, ownerRefreshKey, showToast }) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('Dog');
  const [age, setAge] = useState(0);
  const [vaccinated, setVaccinated] = useState('Yes');
  const [owner, setOwner] = useState('');
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    getOwners()
      .then(res => setOwners(res.data))
      .catch(err => console.error(err));
  }, [ownerRefreshKey]); // 🔁 re-runs when this changes
  

  const handleSubmit = (e) => {
    e.preventDefault();
    createPet({
        name,
        species,
        age,
        owner,
        vaccinated: vaccinated === 'Yes',
      })      
      .then((res) => {
        setName('');
        setSpecies('Dog');
        setAge(0);
        setOwner('');
        onPetAdded(res.data.data); 
      })      
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={styles.label}>Pet Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
        required
      />

      <label style={styles.label}>Species</label>
      <select
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        style={styles.input}
      >
        <option>Dog</option>
        <option>Cat</option>
        <option>Bird</option>
        <option>Other</option>
      </select>

      <label style={styles.label}>Age</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        style={styles.input}
      />

      <label style={styles.label}>Vaccinated?</label>
      <select
        value={vaccinated ? 'Yes' : 'No'}
        onChange={(e) => setVaccinated(e.target.value === 'Yes')}
        style={styles.input}
      >
        <option>Yes</option>
        <option>No</option>
        
      </select>

      <label style={styles.label}>Owner</label>
      <select
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        style={styles.input}
        required
      >
        <option value="">-- Select Owner --</option>
        {owners.map(o => (
          <option key={o._id} value={o._id}>{o.name}</option>
        ))}
      </select>

      <button type="submit" style={styles.button}>Add Pet</button>
    </form>
  );
}

const styles = {
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.25rem',
    display: 'block',
    marginTop: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    marginTop: '1.5rem',
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  }
};


export default AddPetForm;
