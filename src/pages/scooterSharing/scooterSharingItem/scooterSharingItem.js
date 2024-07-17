import React, { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import css from './scooterSharingItem.module.scss'
import Button from "@mui/material/Button";


const ScooterSharingItem = ({ item, handleItemChange,index,handleDeleteItem}) => {
  const [formData, setFormData] = useState(item);

  useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleChange = (field, value) => {
    const updatedData = {
      ...formData,
      [field]: value
    };

    setFormData(updatedData);
    handleItemChange(updatedData, index);
  };


  return (
    <div className={css.container}>
      <TextField
        required
        id="outlined-required"
        label="Name"
        
        name="name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Price"
        
        name="price"
        value={formData.price}
        margin="normal"
        onChange={(e) => handleChange('price', e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Text"
        
        name="text"
        value={formData.text}
        onChange={(e) => handleChange('text', e.target.value)}
      />
      <Button variant="outlined" size="small"   onClick={handleDeleteItem}>
        remove
      </Button>
    </div>
  );
};

export default ScooterSharingItem;



