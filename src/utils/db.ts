// db.ts
import Dexie, { type EntityTable } from 'dexie';

interface Chat {
  id: number;
  title: string;
  messages:any[];
}

const db = new Dexie('ChatsDatabase') as Dexie & {
  chats: EntityTable<
    Chat,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  chats: '++id, title, messages' // primary key "id" (for the runtime!)
});

export type { Chat };
export { db };