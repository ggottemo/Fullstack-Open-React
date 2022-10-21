const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = (
  await import("../utils/list_helper.js")
).default;

// setup the test blogs
const setup = () => {
  const manyBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      likes: 7,
      author: "Michael Chan",
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      likes: 5,
      author: "Edsger W. Dijkstra",
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      likes: 12,
      author: "Edsger W. Dijkstra",
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      likes: 10,
      author: "Robert C. Martin",
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      likes: 0,
      author: "Robert C. Martin",
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      likes: 2,
      author: "Robert C. Martin",
    },
  ];

  const oneBlog = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      likes: 7,
      author: "Michael Chan",
    },
  ];

  const noBlogs = [];

  const emptyBlog = [{}];

  const noLikes = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
    },
  ];

  const noAuthor = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      likes: 7,
    },
  ];

  const noTitle = [
    {
      _id: "5a422a851b54a676234d17f7",
      author: "Michael Chan",
      likes: 7,
    },
  ];

  const noId = [
    {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    },
  ];

  const tiedLikes = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      likes: 7,
      author: "Michael Chan",
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      likes: 7,
      author: "Edsger W. Dijkstra",
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      likes: 7,
      author: "Edsger W. Dijkstra",
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      likes: 7,
      author: "Michael Chan",
    },
  ];

  return {
    manyBlogs,
    oneBlog,
    noBlogs,
    emptyBlog,
    noLikes,
    noAuthor,
    noTitle,
    noId,
    tiedLikes,
  };
};

describe("Util Functions", () => {
  test("dummy returns one", () => {
    const blogs = [];
    const result = dummy(blogs);
    expect(result).toBe(1);
  });
  ////////////////////////////////////////
  describe("total likes", () => {
    test("total likes", () => {
      const { manyBlogs } = setup();
      const result = totalLikes(manyBlogs);
      expect(result).toBe(36);
    });
    ////////////////////////////////////////////
    test("likes with 0 blogs", () => {
      const { noBlogs } = setup();
      const result = totalLikes(noBlogs);
      expect(result).toBe(0);
    });
    ////////////////////////////////////////////
    test("likes with 1 blog", () => {
      const { oneBlog } = setup();
      const result = totalLikes(oneBlog);
      expect(result).toBe(7);
    });
  });

  describe("favorite blog", () => {
    test("favorite blog", () => {
      const { manyBlogs } = setup();
      const result = favoriteBlog(manyBlogs);
      expect(result).toEqual({
        _id: "5a422b3a1b54a676234d17f9",
        author: "Edsger W. Dijkstra",
        title: "Canonical string reduction",
        likes: 12,
      });
    });
    ////////////////////////////////////////////
    test("favorite blog with 0 blogs", () => {
      const { noBlogs } = setup();
      const result = favoriteBlog(noBlogs);
      expect(result).toEqual({});
    });
    ////////////////////////////////////////////
    test("favorite blog with 1 blog", () => {
      const { oneBlog } = setup();
      const result = favoriteBlog(oneBlog);
      expect(result).toEqual({
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        likes: 7,
        author: "Michael Chan",
      });
    });
  });

  describe("most blogs", () => {
    test("Three blogs", () => {
      const { manyBlogs } = setup();

      const result = mostBlogs(manyBlogs);
      expect(result).toEqual({
        author: "Robert C. Martin",
        blogCount: 3,
      });
    });
    ////////////////////////////////////////////
    test("One blog", () => {
      const { oneBlog } = setup();
      const result = mostBlogs(oneBlog);
      expect(result).toEqual({
        author: "Michael Chan",
        blogCount: 1,
      });
    });
    ////////////////////////////////////////////
    test("Zero blogs", () => {
      const { noBlogs } = setup();
      const result = mostBlogs(noBlogs);
      expect(result).toEqual({});
    });
    ////////////////////////////////////////////
    test("Multiple authors with same number of blogs", () => {
      const { tiedLikes } = setup();
      const result = mostBlogs(tiedLikes);
      expect(result).toEqual({
        author: "Michael Chan",
        blogCount: 2,
      });
    });
  });
  describe("most likes", () => {
    test("Three blogs", () => {
      const { manyBlogs } = setup();
      const result = mostLikes(manyBlogs);
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 17,
      });
    });
    ////////////////////////////////////////////
    test("One blog", () => {
      const { oneBlog } = setup();
      const result = mostLikes(oneBlog);
      expect(result).toEqual({
        author: "Michael Chan",
        likes: 7,
      });
    });
    ////////////////////////////////////////////
    test("Zero blogs", () => {
      const { noBlogs } = setup();
      const result = mostLikes(noBlogs);
      expect(result).toEqual({});
    });
    ////////////////////////////////////////////
    test("Multiple authors with same number of likes", () => {
      const { tiedLikes } = setup();
      const result = mostLikes(tiedLikes);
      expect(result).toEqual({
        author: "Michael Chan",
        likes: 14,
      });
    });
  });
});
