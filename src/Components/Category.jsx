import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from './Modal';

const Category = () => {
  const [categories, setCategories] = useState([{}]);
  const [newCategory, setNewCategory] = useState('');
  const [open,setOpen]=useState(false);
  const [uid,setUid]=useState('')

  useEffect(() => {
    axios.get('http://localhost:8800/categories')
      .then(res => {
        setCategories(res.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [categories]);

  const handleAddCategory = async (e) => {
    
    e.preventDefault();
    const newCategoryId=parseInt(categories[categories.length-1].id)+1;
    const header={
        'Content-Type': 'application/json'
    }
    const body={
        id:(newCategoryId).toString(),
        name: newCategory,
        value: newCategory.toLowerCase()
    }
    await axios.post('http://localhost:8800/categories', body,header)
      .then(res => {
        console.log(res)
      })
     await axios.get('http://localhost:8800/categories')
      .then(res => {
        setCategories(res.data);
      })
      setNewCategory('')
  };

  const handleDelete = (uid) => {
    axios
      .delete(`http://localhost:8800/categories/${uid}`)
      .then((res) => {
        setCategories((prevData) => prevData.filter((category) => category.id !== uid));
      })
      .catch((error) => {
        console.error('Error deleting vendor:', error);
      
      });
      axios.get('http://localhost:8800/categories')
      .then(res => {
        setCategories(res.data);
      })
      setOpen(false)
  };


  return (
    <div className="category-container">
      <h2 className="category-heading">Categories</h2>
      <ul className="category-list">
        {categories.map(category => (
          <li key={category.id} className="category-item">
            <span>{category.name}</span>
            <span onClick={()=>{
                setOpen(true)
                setUid(category.id)
            }}>
                <DeleteIcon 
                sx={{
                    color:'red',
                    cursor:'pointer'
                    }}/>
            </span>
          </li>
        ))}
      </ul>
      <div className="add-category">
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="category-input"
        />
        <button
          onClick={handleAddCategory}
          className="add-category-button"
        >
          Add Category
        </button>
      </div>
      <Modal 
      onClose={()=>setOpen(false) }
      onClick={()=>handleDelete(uid)}
      open={open}
      desc="category"
      />
    </div>
  );
};

export default Category;
