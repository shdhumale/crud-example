// app/page.tsx
import { Item } from '@/data/items';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';

export default async function Home() {
  let initialItems: Item[] = [];
  let error = '';

  // Fetch initial data on the server
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch items');
    }
    initialItems = await response.json();
  } catch (err) {
    console.error('Error fetching initial items:', err);
    error = 'Failed to fetch initial items';
  }

  return (
    <main style={{ padding: '20px' }}>
      <h1>Simple CRUD Example</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
         
          <hr style={{ margin: '20px 0' }} />
          <ItemList initialItems={initialItems} />
        </>
      )}
    </main>
  );
}
