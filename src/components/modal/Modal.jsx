import React, { useState } from 'react';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '1rem',
    padding: '2rem',
    width: '80%',
    maxWidth: '400px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    border: '1px solid #ccc',
    borderRadius: '0.5rem',
    padding: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#4C1D95',
    color: '#fff',
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default function Modal({ name, address, pincode, number, setName, setAddress, setPincode, setNumber, buyNow}) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
     <div class="custom-container">
    <button type="button" class="custom-button" onClick={openModal}>
        Buy Now
    </button>
</div>

      {isOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <form style={modalStyles.form}>
              <label htmlFor="name">Enter Full Name</label>
              <input
              value={name} onChange={(e) =>{setName(e.target.value)}}
                type="text"
                name="name"
                id="name"
                style={modalStyles.input}
                required
              />

              <label htmlFor="address">Enter Full Address</label>
              <input
              value={address} onChange={(e) =>{setAddress(e.target.value)}}
                type="text"
                name="address"
                id="address"
                style={modalStyles.input}
                required
              />

              <label htmlFor="pincode">Enter Pincode</label>
              <input
              value={pincode} onChange={(e) =>{setPincode(e.target.value)}}
                type="text"
                name="pincode"
                id="pincode"
                style={modalStyles.input}
                required
              />

              <label htmlFor="mobileNumber">Enter Mobile Number</label>
              <input
              value={number} onChange={(e) =>{setNumber(e.target.value)}}
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                style={modalStyles.input}
                required
              />

              <button
                type="button"
                onClick={closeModal}
                style={modalStyles.button}
              >
                Order Now
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
