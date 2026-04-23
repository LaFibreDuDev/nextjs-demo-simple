import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql = postgres(url);

await sql`
  CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  )
`;

await sql`
  INSERT INTO posts (title, body) VALUES
    ('Bienvenue sur le blog', 'Premier post de démonstration avec PostgreSQL et Next.js.'),
    ('Docker Compose et Next.js', 'Comment orchestrer un service Next.js avec une base de données.'),
    ('Server Components', 'Les React Server Components permettent de requêter la DB directement dans le composant.')
  ON CONFLICT DO NOTHING
`;

console.log("Done.");
await sql.end();
