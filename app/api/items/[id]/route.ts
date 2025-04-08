// app/api/items/[id]/route.ts
import { NextResponse } from 'next/server';
import { getItemById, updateItem, deleteItem, Item } from '@/data/items';

interface Params {
  id: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const id = parseInt(params.id);
  const item = getItemById(id);

  if (!item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const updatedItem = updateItem(id, body);

    if (!updatedItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const id = parseInt(params.id);
  const deleted = deleteItem(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Item deleted successfully' });
}
