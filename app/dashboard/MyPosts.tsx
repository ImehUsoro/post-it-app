"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";
import EditPost from "./EditPosts";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

export default function MyPosts() {
  const { data, isLoading, error } = useQuery<AuthPosts>({
    queryKey: ["authPosts"],
    queryFn: fetchAuthPosts,
  });

  if (error) return <div>Something went wrong</div>;

  if (isLoading) return <div>Posts are Loading...</div>;

  return (
    <main>
      {data?.Post?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.Comment}
        />
      ))}
    </main>
  );
}
