import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AddPosts from "./components/AddPosts";

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allPosts"],
    queryFn: allPosts,
  });

  if (error) return <div>Something went wrong</div>;

  if (isLoading) return <div>Loading...</div>;
  return (
    <main>
      <AddPosts />
    </main>
  );
}
