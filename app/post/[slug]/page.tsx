"use client";
import AddComment from "@/app/components/AddComments";
import Post from "@/app/components/Post";
import { PostTypes } from "@/app/types/Posts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type PageProps = {
  params: {
    slug: string;
  };
  searchParams: string;
};
//Fetch All posts
const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: PageProps) {
  const { data, isLoading } = useQuery<PostTypes>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading";
  console.log(data?.Comment);
  return (
    <div>
      <Post
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image || ""}
        comments={data?.Comment || []}
        postTitle={data?.title}
      />
      <AddComment id={data?.id} />
      {data?.Comment?.map((comment) => (
        <div className="my-6 bg-white p-8 rounded-md" key={comment.id}>
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3 className="font-bold">{comment.user.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div>
            <p className="py-4">{comment.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
