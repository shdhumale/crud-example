This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Here is a detailed explanation of the uploaded file **`shdhumale-crud-example.txt`**, which represents a **Next.js CRUD (Create, Read, Update, Delete) application** built using modern technologies like **TypeScript**, **Tailwind CSS**, and **Next.js App Router**.

I'll explain each part of the project structure and code in a clean **Markdown format**, suitable for documentation or sharing with developers.

---

# 🧾 Next.js CRUD Example — Project Overview

This is a full-featured **CRUD (Create, Read, Update, Delete)** example built using **Next.js 15**, **TypeScript**, **Tailwind CSS**, and the **App Router**. It allows users to manage a list of items stored in-memory using an API route that mimics backend behavior without needing a real database.

---

## 📁 Directory Structure

```
shdhumale-crud-example/
├── README.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── api/
│   │   └── items/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   └── components/
│       ├── AddItemForm.tsx
│       ├── EditItemForm.tsx
│       └── ItemList.tsx
├── data/
│   └── items.ts
└── public/
```

---

## 📦 Key Features

- ✅ Create new items  
- ✅ Read/display all items  
- ✅ Edit existing items  
- ✅ Delete items  
- ✅ Server-side fetching via `fetch()`  
- ✅ Client-side interactivity using React hooks (`useState`, `useEffect`)  
- ✅ In-memory mock data layer  

---

## 🔧 Technologies Used

| Tool/Technology | Description |
|------------------|-------------|
| **Next.js 15** | Framework for server-rendered React apps |
| **TypeScript** | Static typing for JavaScript |
| **Tailwind CSS** | Utility-first CSS framework |
| **React Hooks** | State management on the client |
| **Next.js App Router** | File-based routing system |
| **API Routes** | Serverless functions for handling CRUD operations |

---

## 🗂️ Core Files Explained

### 1. `app/page.tsx` – Main Page

Renders the homepage and fetches all items from the API endpoint `/api/items`. Displays them using the `ItemList` component.

```tsx
export default async function Home() {
  let initialItems: Item[] = [];
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/items`);
    if (!response.ok) throw new Error('Failed to fetch items');
    initialItems = await response.json();
  } catch (err) { ... }

  return (
    <main>
      <h1>Simple CRUD Example</h1>
      <ItemList initialItems={initialItems} />
    </main>
  );
}
```

---

### 2. `app/api/items/route.ts` – API Route for All Items

Handles:

- **GET**: Fetch all items
- **POST**: Create a new item

```ts
export async function GET() {
  const items = getAllItems();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newItem = createItem(body);
  return NextResponse.json(newItem, { status: 201 });
}
```

---

### 3. `app/api/items/[id]/route.ts` – API Route for Single Item

Handles:

- **GET**: Get one item by ID
- **PUT**: Update item by ID
- **DELETE**: Delete item by ID

```ts
export async function GET(request: Request, { params }: { params: Params }) {
  const id = parseInt(params.id);
  const item = getItemById(id);
  if (!item) return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  return NextResponse.json(item);
}
```

---

### 4. `data/items.ts` – In-Memory Data Store

Contains the mock data store and logic for managing items.

```ts
let items: Item[] = [
  { id: 1, name: 'First Item', description: '...' },
  { id: 2, name: 'Second Item', description: '...' }
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
```

---

### 5. `components/ItemList.tsx` – List of Items

Renders the list of items and provides buttons for editing and deleting.

```tsx
const ItemList: React.FC<ItemListProps> = ({ initialItems }) => {
  const [itemsState, setItems] = useState<Item[]>(initialItems);
  // ...
}
```

Also includes inline rendering of `EditItemForm` when editing.

---

### 6. `components/AddItemForm.tsx` – Form to Add New Item

A form component that sends a POST request to `/api/items`.

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });
  onItemAdded(); // Refresh list
};
```

---

### 7. `components/EditItemForm.tsx` – Form to Edit Existing Item

Fetches the current item and updates it via PUT request.

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await fetch(`/api/items/${itemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });
  onItemUpdated(); // Refresh list
};
```

---

## 🧪 Running the Application

To run this locally:

1. Clone the project.
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open in browser:
   ```
   http://localhost:3000
   ```

---

## 🚀 Deployment

You can deploy this app directly to **Vercel** using their CLI or UI.

```bash
vercel
```

Or use the Vercel dashboard: https://vercel.com/new?from-git

---

## ✅ Summary

| Feature | Status |
|--------|--------|
| TypeScript | ✅ |
| Tailwind CSS | ✅ |
| CRUD Operations | ✅ |
| API Routes | ✅ |
| Server-Side Rendering | ✅ |
| Client-Side Interactivity | ✅ |
| Responsive Design | ⚠️ Basic styling only |
| Authentication | ❌ Not implemented |
| Database | ❌ In-memory only |

---

## 💡 Possible Improvements

- Add real database integration (e.g., MongoDB, PostgreSQL)
- Implement user authentication
- Add pagination for large datasets
- Improve accessibility and responsive design
- Add unit/integration tests

---

If you'd like, I can provide a downloadable `.zip` version of this project or help convert this into a **MongoDB-backed version** or **Firebase integration**.

Let me know how you’d like to proceed!
