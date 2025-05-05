import React, { useState, useEffect } from "react";
import AddPetForm from "./components/AddPetForm";
import AddOwnerForm from "./components/AddOwnerForm";
import { getPets } from "./api";

function App() {
  const [pets, setPets] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshOwners, setRefreshOwners] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleRefresh = () => setRefresh(!refresh);

  const handlePetAdded = (newPet) => {
    setPets(prev => [newPet, ...prev]); 
  };

  const triggerOwnerRefresh = () => {
    setRefreshOwners(prev => !prev); 
  };
  
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };  

  useEffect(() => {
    getPets().then(res => setPets(res.data));
  }, []);

  const getEmoji = (species) => {
    switch (species) {
      case "Dog":
        return "🐶";
      case "Cat":
        return "🐱";
      case "Bird":
        return "🐦";
      case "Other":
      default:
        return "🐾";
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🐾Pet Manager</h1>

      <div style={styles.contentWrap}>
        <div style={styles.column}>
          <h2 style={styles.sectionTitle}>Add a New Hooman</h2>
          <div style={styles.formSection}>
          <AddOwnerForm onOwnerAdded={triggerOwnerRefresh} showToast={showToast} />
          </div>
        </div>

        <div style={styles.column}>
          <h2 style={styles.sectionTitle}>Add a New Pet</h2>
          <div style={styles.formSection}>
          <AddPetForm onPetAdded={handlePetAdded} ownerRefreshKey={refreshOwners} />
          </div>
        </div>

        <div style={styles.column}>
          <h2 style={styles.sectionTitle}>Current Pets</h2>
          <div style={styles.listSection}>
            {pets.map((pet) => (
              <div key={pet._id} style={styles.card}>
                <strong>
                  {getEmoji(pet.species)} {pet.name}
                </strong>{" "}
                ({pet.species})<br />
                Age: {pet.age}
                <br />
                Owner: {pet.owner?.name || "Unknown"}
                <br />
                Vaccinated:{" "}
                <span
                  style={{
                    color: pet.vaccinated ? "#28a745" : "#dc3545",
                    fontWeight: "bold",
                  }}>
                  {pet.vaccinated ? "Yes ✅" : "No ❌"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toastMessage && (
      <div style={styles.toast}>
        {toastMessage}
      </div>
    )} 
    </div>     
  );
}

export default App;

const styles = {
  contentWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '2rem',
    flexWrap: 'wrap',
    marginTop: '100px',
  },
  column: {
    flex: '1 1 300px',
    maxWidth: '400px',
  },  
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f3f4f6',
    height: '100vh', // lock height
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden', // block scroll
  },  
  header: {
    textAlign: 'center',
    fontSize: '2rem',
    margin: 0,
    padding: '1rem 0',
    flexShrink: 0, // don’t let it grow
  },  
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "2rem",
    flexWrap: "wrap",
    margin: "0 auto",
    maxWidth: "1000px",
  },
  formSection: {
    backgroundColor: "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    flex: "1 1 350px",
    minWidth: "300px",
  },
  listSection: {
    maxHeight: '500px',
    overflowY: 'auto',
    paddingRight: '0.5rem',
  },
  card: {
    backgroundColor: "#fff",
    padding: "1rem 1.25rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    marginBottom: "1rem",
    borderLeft: "4px solid #007bff",
  },
  sectionTitle: {
    fontSize: "1.3rem",
    color: "#333",
    marginBottom: "1rem",
    fontWeight: "600",
    textAlign: "left", // or 'center'
  },
  card: {
    backgroundColor: "#fff",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
    marginBottom: "1rem",
    borderLeft: "4px solid #007bff",
    fontSize: "0.95rem",
    lineHeight: "1.4",
    maxWidth: "350px",
  },
  toast: {
    position: 'fixed',
    bottom: '1.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#28a745',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    zIndex: 1000,
    fontWeight: 'bold',
  },  
};
