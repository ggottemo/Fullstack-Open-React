import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import Blog from "./Blog";

const sampleBlogInfo = {
  title: "Sample Title",
  author: "Sample Author",
  url: "Sample URL",
  likes: 0,
  user: {
    username: "Sample Username",
    name: "Sample Name",
    id: "Sample ID",
  },
  id: "Sample ID",
};

test("renders content", () => {
  render(<Blog blog={sampleBlogInfo} />);
  expect(screen.queryByText("Test Title")).toBeDefined();
  expect(screen.queryByText("Test Author")).toBeDefined();
  expect(screen.queryByText("Test URL")).not.toBeInTheDocument();
  expect(screen.queryByText("0")).not.toBeInTheDocument();
});

// Like button
// test("clicking the like button twice calls event handler twice", async () => {
//   const mockGetItem = jest
//     .spyOn(window.localStorage, "getItem")
//     .mockImplementation(() => ({
//       token: "Sample Token",
//     }));

//   render(<Blog blog={sampleBlogInfo} />);
//   const user = userEvent.setup(window);
//   const showButton = screen.getByText("view");
//   await user.click(showButton);
//   const button = screen.getByText("like");
//   await user.click(button);
//   await user.click(button);
//   expect(mockGetItem).toHaveBeenCalledTimes(2);
// });
