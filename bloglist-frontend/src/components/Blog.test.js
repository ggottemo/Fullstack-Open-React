import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "Test URL",
    likes: 0,
    user: {
      username: "Test Username",
      name: "Test Name",
      id: "Test ID",
    },
  };

  render(<Blog blog={blog} />);
  expect(screen.queryByText("Test Title")).toBeDefined();
  expect(screen.queryByText("Test Author")).toBeDefined();
  expect(screen.queryByText("Test URL")).not.toBeInTheDocument();
  expect(screen.queryByText("0")).not.toBeInTheDocument();
});
