export type AuthPosts = {
  id: string;
  email: string;
  image: string;
  name: string;

  Post: {
    id: string;
    createdAt: string;
    title: string;
    Comment?: {
      id: string;
      message: string;
      postId: string;
      userId: string;
      createdAt: string;
    }[];
  }[];
};
