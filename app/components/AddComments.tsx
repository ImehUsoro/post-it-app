"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

type CommentProps = {
  id: string | undefined;
};

type Comment = {
  title: string;
  postId: string | undefined;
};
export default function AddComment({ id }: CommentProps) {
  const [title, setTitle] = useState("");
  const [disabled, setDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastId: string;

  const { mutate } = useMutation(
    async (data: Comment) =>
      axios.post("/api/posts/addComment", {
        data,
      }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["detail-post"]);
        toast.success("Comment Added", { id: commentToastId });
        setTitle("");
        setDisabled(false);
      },
      onError: (error) => {
        setDisabled(false);

        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message, { id: commentToastId });
        }
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    commentToastId = toast.loading("Adding comment...", {
      id: commentToastId,
    });
    mutate({ postId: id, title });
  };

  return (
    <form onSubmit={handleSubmit} className="my-8">
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 text-lg rounded-md my-2"
        />
        <div className="flex items-center gap-4">
          <button
            disabled={disabled || title.length < 1 || title.length > 300}
            className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            type="submit"
          >
            Add a comment
          </button>
          <p>{title.length}/300</p>
        </div>
      </div>
    </form>
  );
}
