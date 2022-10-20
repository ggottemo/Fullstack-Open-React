const { dummy, totalLikes, favoriteBlog, mostBlogs } = (
  await import("../utils/list_helper.js")
).default;
debugger;
describe("Util Functions", () => {
  test("dummy returns one", () => {
    const blogs = [];
    const result = dummy(blogs);
    expect(result).toBe(1);
  });
  ////////////////////////////////////////
  describe("total likes", () => {
    test("total likes", () => {
      const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          likes: 7,
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          likes: 5,
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          likes: 12,
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          likes: 10,
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          likes: 0,
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          likes: 2,
        },
      ];
      const result = totalLikes(blogs);
      expect(result).toBe(36);
    });
    ////////////////////////////////////////////
    test("likes with 0 blogs", () => {
      const blogs = [];
      const result = totalLikes(blogs);
      expect(result).toBe(0);
    });
    ////////////////////////////////////////////
    test("likes with 1 blog", () => {
      const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          likes: 7,
        },
      ];
      const result = totalLikes(blogs);
      expect(result).toBe(7);
    });
  });

  describe("favorite blog", () => {
    test("favorite blog", () => {
      const blogs = [
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          likes: 5,
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          likes: 12,
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          likes: 10,
        },
      ];
      const result = favoriteBlog(blogs);
      expect(result).toEqual({
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        likes: 12,
      });
    });
    ////////////////////////////////////////////
    test("favorite blog with 0 blogs", () => {
      const blogs = [];
      const result = favoriteBlog(blogs);
      expect(result).toEqual({});
    });
    ////////////////////////////////////////////
    test("favorite blog with 1 blog", () => {
      const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          likes: 7,
        },
      ];
      const result = favoriteBlog(blogs);
      expect(result).toEqual({
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        likes: 7,
      });
    });
  });

  describe("most blogs", () => {
    test("Three blogs", () => {
      const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
        },
      ];

      const result = mostBlogs(blogs);
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        blogCount: 2,
      });
    });
    ////////////////////////////////////////////
    test("One blog", () => {
      const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
        },
      ];
      const result = mostBlogs(blogs);
      expect(result).toEqual({
        author: "Michael Chan",
        blogCount: 1,
      });
    });
    ////////////////////////////////////////////
    test("Zero blogs", () => {
      const blogs = [];
      const result = mostBlogs(blogs);
      expect(result).toEqual({});
    });
    ////////////////////////////////////////////
    test("Multiple authors with same number of blogs", () => {
      const blogs = [
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
        },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
        },
      ];
      const result = mostBlogs(blogs);
      expect(result).toEqual(
        {
          author: "Edsger W. Dijkstra",
          blogCount: 2,
        } || {
          author: "Robert C. Martin",
          blogCount: 2,
        }
      );
    });
  });
});
