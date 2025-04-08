// data/items.ts
export interface Item {
    id: number;
    name: string;
    description?: string;
  }
  
  let items: Item[] = [
    { id: 1, name: 'First Item', description: 'This is the first item.' },
    { id: 2, name: 'Second Item' },
  ];
  
  let nextId = items.length + 1;
  
  export const getAllItems = (): Item[] => items;
  
  export const getItemById = (id: number): Item | undefined =>
    items.find((item) => item.id === id);
  
  export const createItem = (newItem: Omit<Item, 'id'>): Item => {
    const item = { id: nextId++, ...newItem };
    items.push(item);
    return item;
  };
  
  export const updateItem = (id: number, updatedItem: Omit<Item, 'id'>): Item | undefined => {
    const index = items.findIndex((item) => item.id === id);
    if (index !== -1) {
      items[index] = { id, ...updatedItem };
      return items[index];
    }
    return undefined;
  };
  
  export const deleteItem = (id: number): boolean => {
    const initialLength = items.length;
    items = items.filter((item) => item.id !== id);
    return items.length < initialLength;
  };
  