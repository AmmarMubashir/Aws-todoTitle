import Post from "@/components/Post";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { onDeletePost } from "./_actions/actions";

export default async function Home() {
  const isSignedIn = await isAuthenticated();
  const { data: posts } = await cookieBasedClient.models.Post.list({
    selectionSet: ["title", "id"],
    authMode: isSignedIn ? "userPool" : "identityPool",
  });

  console.log("POST", posts);
  return (
    <main className="flex flex-col justify-between items-center p-12 md:p-24 w-full md:w-1/2 m-auto gap-4">
      <h1 className="text-2xl pb-10">List Of All Titles</h1>
      {posts?.map(async (post, idx) => (
        // <div key={idx}>
        //   <div>{post.title}</div>
        // </div>
        <Post
          key={idx}
          post={post}
          onDelete={onDeletePost}
          isSignedIn={isSignedIn}
        />
      ))}
    </main>
  );
}
