export interface Blog {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  mainImage?: string;
  mainVideo?: string;
  previewImage?: string;
  previewVideo?: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BlogResponse {
  success: boolean;
  count: number;
  total?: number;
  page?: number;
  pages?: number;
  data: Blog[];
}

export interface SingleBlogResponse {
  success: boolean;
  data: Blog;
}
