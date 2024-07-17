import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import css from './addnewItem.module.scss'

const AddNewItem = ({ newItem, setNewItem, handleAddItem, }) => {
  return (
    <div className={css.container}>
      <TextField
        className={css.input}
        required
        id="outlined-required"
        label="Name"
        
        name="name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <TextField
        className={css.input}
        required
        id="outlined-required"
        label="Price"
        
        name="Price"
        value={newItem.price}
        margin="normal"
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
      />
      <TextField
        className={css.input}
        required
        id="outlined-required"
        label="Text"
        
        name="text"
        value={newItem.text}
        onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
      />
      <Button className={css.button} variant="contained" size="small" onClick={() => handleAddItem(newItem)}>
        Add new Item
      </Button>
    </div>
  );
};


export default AddNewItem;
