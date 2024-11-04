import { cookieBasedClient } from "@/utils/amplify-utils";

export default async function Home() {
  const { data: posts } = await cookieBasedClient.models.Post.list({
    selectionSet: ["title", "id"],
    authMode: "apiKey",
  });

  console.log("POST", posts);
  return (
    <main className="flex flex-col justify-between items-center p-24 w-1/2 m-auto gap-4">
      <h1 className="text-2xl pb-10">List Of All Titles</h1>
      {posts?.map(async (post, idx) => (
        <div key={idx}>
          <div>{post.title}</div>
        </div>
      ))}
    </main>
  );
}
