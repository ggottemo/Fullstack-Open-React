const { dummy, totalLikes, favoriteBlog } = (
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
});
