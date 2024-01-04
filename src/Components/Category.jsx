import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([{}]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8800/categories')
      .then(res => {
        setCategories(res.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const header={
        'Content-Type': 'application/json'
    }
    const body={
        id:(categories.length+1).toString(),
        name: newCategory,
        value: newCategory.toLowerCase()
    }
    axios.post('http://localhost:8800/categories', body,header)
      .then(res => {
        console.log(res)
      })
      axios.get('http://localhost:8800/categories')
      .then(res => {
        setCategories(res.data);
      })
      setNewCategory('')
  };

  return (
    <div className="category-container">
      <h2 className="category-heading">Categories</h2>
      <ul className="category-list">
        {categories.map(category => (
          <li key={category.value} className="category-item">
            <span>{category.name}</span>
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
    </div>
  );
};

export default Category;
