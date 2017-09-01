export class Post {
  title: string;
  date: string;
  year?: string;
  month?: string;
  day?: string;
  category: string;
  tags: Array<string>;
  slug: string;
  content?: string;
};
