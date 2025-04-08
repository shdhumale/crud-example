// components/EditItemForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { Item } from '@/data/items';

interface EditItemFormProps {
  itemId: number;
  onItemUpdated: () => void;
  onCancel: () => void;
}

const EditItemForm: React.FC<EditItemFormProps> = ({ itemId, onItemUpdated, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/items/${itemId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch item');
        }
        const data: Item = await response.json();
        setName(data.name);
        setDescription(data.description || '');
      } catch (error) {
        console.error('Error fetching item:', error);
        setError('Failed to fetch item');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update item');
      }

      onItemUpdated(); // Refresh the item list
      onCancel(); // Go back to the list
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Failed to update item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Edit Item</h2>
      {loading ? (
        <p>Loading item...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Item'}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default EditItemForm;
