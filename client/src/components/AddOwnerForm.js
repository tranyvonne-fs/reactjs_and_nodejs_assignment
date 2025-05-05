import React, { useState } from "react";
import { createOwner } from "../api";

function AddOwnerForm({ onOwnerAdded, showToast }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createOwner({ name, email, phone })
      .then(() => {
        setName('');
        setEmail('');
        setPhone('');
        onOwnerAdded();
        showToast?.('Owner added successfully!');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label style={styles.label}>Hooman Name</label>
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
        required
      />
      <label style={styles.label}>Hooman Email</label>
      <input
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
        required
      />
      <label style={styles.label}>Hooman Phone</label>
      <input
        type="tel"
        value={phone}
        placeholder="Phone"
        onChange={(e) => setPhone(e.target.value)}
        style={styles.input}
        required
      />

      <button type="submit" style={styles.button}>
        Add Owner
      </button>
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
  

export default AddOwnerForm;
