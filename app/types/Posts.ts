export type PostTypes = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  published: boolean;
  userId: string;
  user: {
    image: string;
    name: string;
  };
  Comment: {
    id: string;
    message: string;
    postId: string;
    userId: string;
    createdAt: string;
  }[];
};

export type CommentTypes = {
  id: string;
  message: string;
  postId: string;
  userId: string;
  createdAt: string;
  //   post: PostTypes;
  //   user: {
  //     image: string;
  //     name: string;
  //   };
};
