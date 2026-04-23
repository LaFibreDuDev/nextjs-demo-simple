import sql from "@/lib/db";

type Post = { id: number; title: string; body: string };

export default async function Home() {
  const posts = await sql<Post[]>`SELECT id, title, body FROM posts ORDER BY id`;

  return (
    <main className="max-w-2xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">Posts</h1>
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <li key={post.id} className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-2 text-black dark:text-white">{post.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400">{post.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
