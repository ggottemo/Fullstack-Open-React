// Test Blog form component
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import CreateBlogForm from "./CreateBlogForm";

test("should display notification upon error", async () => {
  render(<CreateBlogForm />);

  const titleInput = screen.getByText("title:");
  const authorInput = screen.getByText("author:");
  const urlInput = screen.getByText("url:");
  const submitBtn = screen.getByText("create");

  await userEvent.type(titleInput, "Test Title");
  await userEvent.type(authorInput, "Test Author");
  await userEvent.type(urlInput, "Test URL");
  await userEvent.click(submitBtn);

  expect(screen.queryByText("Error creating blog")).toBeDefined();
});
