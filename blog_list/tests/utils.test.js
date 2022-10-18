const { dummy } = (await import("../utils/list_helper.js")).default;

describe("Util Functions", () => {
  test("dummy returns one", () => {
    const blogs = [];
    const result = dummy(blogs);
    expect(result).toBe(1);
  });
});
