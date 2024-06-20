import React, { useEffect, useState } from 'react';
import axios from './api/LvhApi';
import './App.css';
import LvhCategoryList from './components/LvhCategoryList';
import LvhCategoryForm from './components/LvhCategoryForm';

function LvhApp() {
  const [lvhCategories, setLvhCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const lvhGetCategories = async () => {
    try {
      const LvhCateResponse = await axios.get('LvhCategory');
      setLvhCategories(LvhCateResponse.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const lvhAddCategory = async (newCategory) => {
    try {
      const response = await axios.post('LvhCategory', newCategory);
      setLvhCategories([...lvhCategories, response.data]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const lvhUpdateCategory = async (updatedCategory) => {
    try {
      const response = await axios.put(`LvhCategory/${updatedCategory.LvhId}`, updatedCategory);
      setLvhCategories(lvhCategories.map(cat => cat.LvhId === updatedCategory.LvhId ? response.data : cat));
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const lvhDeleteCategory = async (LvhId) => {
    try {
      await axios.delete(`LvhCategory/${LvhId}`);
      setLvhCategories(lvhCategories.filter(cat => cat.LvhId !== LvhId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  useEffect(() => {
    lvhGetCategories();
  }, []);

  return (
    <div className="container border my-3">
      <h1>Lê Văn Hoàng - Call API</h1>
      <LvhCategoryList
        renderLvhCategories={lvhCategories}
        onDelete={lvhDeleteCategory}
        onEdit={setEditingCategory}
      />
      <hr />
      <LvhCategoryForm
        onAdd={lvhAddCategory}
        onEdit={lvhUpdateCategory}
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
      />
    </div>
  );
}

export default LvhApp;
