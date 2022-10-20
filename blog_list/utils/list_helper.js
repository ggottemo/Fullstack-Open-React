import "lodash-es";
import { countBy, reduce } from "lodash-es";
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const favorite = blogs.reduce((favorite, blog) => {
    if (favorite.likes < blog.likes) {
      return blog;
    }
    return favorite;
  }, blogs[0]);
  return favorite;
};
// return author and blog count for the author with the most blogs using lodash
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const authors = blogs.map((blog) => blog.author);
  const authorCounts = countBy(authors);
  const authorWithMostBlogs = reduce(
    authorCounts,
    (result, value, key) => {
      if (result.blogCount < value) {
        return { author: key, blogCount: value };
      }
      return result;
    },
    { author: "none", blogCount: 0 }
  );
  return authorWithMostBlogs;
};

export default { dummy, totalLikes, favoriteBlog, mostBlogs };
