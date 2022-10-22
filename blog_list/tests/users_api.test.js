import bcrypt from "bcrypt";
import supertest from "supertest";
import User from "../models/user.js";
import app from "../app.js";
const { initialUsers, usersInDb, setupDB } = (await import("./test_helper.js"))
  .default;

const api = supertest(app);

describe("create user", () => {
  beforeEach(async () => {
    await setupDB();
    const passwordHash = await bcrypt.hash("password", 10);
  });
  /////////////////////// TESTS ////////////////////////
  test("create user", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "test",
      name: "test",
      password: "password",
    };

    await api.post("/api/users").send(newUser).expect(201);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("create user with invalid username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "t",
      name: "test",
      password: "password",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).not.toContain(newUser.username);
  });
  //////////////////////////////////////////////////////
  test("create duplicate users", async () => {
    const newUser = {
      username: "test",
      name: "test",
      password: "password",
    };

    await api.post("/api/users").send(newUser).expect(201);
    const usersAtStart = await usersInDb();
    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    usersAtEnd.forEach((username) => {
      expect(username).toEqual(
        expect.objectContaining({ username: expect.any(String) })
      );
    });
  });
  test("create user with invalid username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      username: "t",
      name: "test",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect({ error: "username or password too short" });

    const usersAtEnd = await usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).not.toContain(newUser.username);
  });
});
