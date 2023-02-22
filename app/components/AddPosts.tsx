"use client";

import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

const AddPosts = () => {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  // Create a post
  const { mutate } = useMutation(
    async (title: string) => {
      const { data } = await axios.post("/api/posts/addPosts", { title });
      return data;
    },
    {
      onSuccess: () => {
        setIsDisabled(false);
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    await mutate(title);
    setTitle("");
    // setIsDisabled(false);
  };

  return (
    <form
      className="bg-white my-8 p-8 rounded-md border"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          placeholder="What's on your mind?"
          value={title}
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>

      <div className={`flex items-center justify-between gap-2 `}>
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >
          {title.length}/300
        </p>
        <button
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
          disabled={isDisabled || title.length > 300}
        >
          Create a post
        </button>
      </div>
    </form>
  );
};

export default AddPosts;
