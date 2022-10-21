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
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const authors = blogs.map((blog) => blog.author);
  const authorCounts = countBy(authors);
  const authorWithMostLikes = reduce(
    authorCounts,
    (result, value, key) => {
      // get the blogs for the current author
      const authorBlogs = blogs.filter((blog) => blog.author === key);
      // get the total likes for the current author
      const authorLikes = authorBlogs.reduce(
        (sum, blog) => sum + blog.likes,
        0
      );
      if (result.likes < authorLikes) {
        return { author: key, likes: authorLikes };
      }
      return result;
    },
    { author: "none", likes: 0 }
  );
  return authorWithMostLikes;
};

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
