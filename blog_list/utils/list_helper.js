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

export default { dummy, totalLikes, favoriteBlog };
