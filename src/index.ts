import { Hono } from 'hono';
import { neon } from '@neondatabase/serverless';
import { drizzle} from  'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm'
import { epithets, names, users } from './db/schema';
import { prettyJSON } from 'hono/pretty-json'

type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>()

app.use(prettyJSON());

app.get('/', async (c) => {
  const sqlClient = neon(c.env.DATABASE_URL)
  const db = drizzle(sqlClient);

  const epithet = await db
    .select()
    .from(epithets)
    .orderBy(sql`RANDOM()`)
    .limit(1);

  const name = await db
    .select()
    .from(names)
    .orderBy(sql`RANDOM()`)
    .limit(1);
  
  c.status(200);

  return c.json({ 
    epithet: epithet[0],
    name: name[0],
    full_name: `${epithet[0].epithet} ${name[0].name}`,
    createdAt: new Date()
   })
})

app.get('/:custom_name', async (c) => {
  const sqlClient = neon(c.env.DATABASE_URL)
  const db = drizzle(sqlClient);

  const custom_name = c.req.param('custom_name').replace(/[&`<>\/\\'"]/g, '');

  const epithet = await db
    .select()
    .from(epithets)
    .orderBy(sql`RANDOM()`)
    .limit(1);
  
  c.status(200);

  return c.json({ 
    epithet: epithet[0],
    name: {name: custom_name, source: "input"},
    full_name: `${epithet[0].epithet} ${custom_name}`,
    createdAt: new Date()
   })
})

export default app
