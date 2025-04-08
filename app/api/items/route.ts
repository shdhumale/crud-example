// app/api/items/route.ts
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAllItems, createItem, Item } from '@/data/items';

export async function GET() {
  const items = getAllItems();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newItem = createItem(body); 
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
