"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddPosts from "./components/AddPosts";
import Post from "./components/Post";

import { PostTypes } from "./types/Posts";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, isLoading, error } = useQuery<PostTypes[]>({
    queryKey: ["allPosts"],
    queryFn: allPosts,
  });


  if (error) return <div>Something went wrong</div>;

  if (isLoading) return <div>Loading...</div>;
  return (
    <main>
      <AddPosts />

      {data?.map((post) => (
        <Post
          comments={post.Comment}
          key={post.id}
          id={post.id}
          avatar={post.user.image}
          name={post.user.name}
          postTitle={post.title}
        />
      ))}
    </main>
  );
}
