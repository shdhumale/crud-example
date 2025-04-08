// components/ItemList.tsx
'use client';

import { useState } from 'react';
import { Item } from '@/data/items';
import EditItemForm from './EditItemForm';
import AddItemForm from './AddItemForm';

interface ItemListProps {
  initialItems: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ initialItems }) => {
  const [error, setError] = useState('');
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [itemsState, setItems] = useState<Item[]>(initialItems);

  const handleItemAdded = async () => {
    try {
      const response = await fetch('/api/items');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch items');
      }
      const data: Item[] = await response.json();
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to fetch items');
    }
  };

  const handleItemUpdated = async () => {
    try {
      const response = await fetch('/api/items');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch items');
      }
      const data: Item[] = await response.json();
      setItems(data);
      setEditingItemId(null);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to fetch items');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(`Are you sure you want to delete item with ID ${id}?`)) {
      try {
        const response = await fetch(`/api/items/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete item');
        }
        const response2 = await fetch('/api/items');
        if (!response2.ok) {
          const errorData = await response2.json();
          throw new Error(errorData.error || 'Failed to fetch items');
        }
        const data: Item[] = await response2.json();
        setItems(data);
      } catch (error) {
        console.error('Error deleting item:', error);
        setError('Failed to delete item');
      }
    }
  };

  return (
    <>
 
     <AddItemForm
                  onItemAdded={handleItemAdded}
                 />

      <h2>Item List</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {itemsState.map((item) => (
            <li key={item.id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
              <strong>{item.name}</strong>
              {item.description && <p>{item.description}</p>}
              <button onClick={() => setEditingItemId(item.id)} style={{ marginRight: '10px' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: 'red', color: 'white' }}>
                Delete
              </button>
              {editingItemId === item.id && (
                <EditItemForm
                  itemId={item.id}
                  onItemUpdated={handleItemUpdated}
                  onCancel={() => setEditingItemId(null)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ItemList;
