"use client";
import Image from "next/image";
import Link from "next/link";
import { CommentTypes } from "../types/Posts";

interface PropType {
  id: string | undefined;
  avatar: string;
  name: string | undefined;
  postTitle: string | undefined;
  comments: {
    id: string;
    message: string;
    createdAt: string;
    userId: string;
    postId: string;
  }[];
}

const Post = ({ id, avatar, name, comments, postTitle }: PropType) => {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 items-center cursor-pointer">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">
            {comments.length} Comment{comments.length > 1 ? "s" : ""}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Post;
