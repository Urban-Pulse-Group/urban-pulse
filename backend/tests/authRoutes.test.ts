import request from "supertest";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { app } from "../src/app";
import db, {
  migrateTestDB,
  rollbackTestDB,
  truncateAllTables,
} from "../src/db/testdb";

describe("Auth API", () => {
  beforeAll(async () => {});

  afterEach(async () => {
    await db.raw(`
        DELETE FROM users`);
  });

  afterAll(async () => {
    await db.destroy();
  });

  describe("POST /api/auth/register", () => {
    it("registers a new user successfully", async () => {
      const newUser = {
        name: "Steve Jobs",
        username: "SteveJobs",
        email: "steveJobs@apple.com",
        password: "AppleBetterThanWindowsAndWindowsSucksDontUseWindows",
      };

      const expectedUser = {
        id: expect.any(String),
        name: "Steve Jobs",
        username: "SteveJobs",
        email: "steveJobs@apple.com",
        roles: null,
        created_at: expect.anything(),
      };

      const res = await request(app).post("/api/auth/register").send(newUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toEqual(expectedUser);
        
      const users = await db("users").select("*");
      expect(users.length).toBe(1);
      expect(users[0]).toMatchObject({
        ...expectedUser,
        password: expect.any(String),
      });
    });

    it("sends a 400 status if any required fields are missing", async () => {
      const newUser = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      };

      const res = await request(app).post("/api/auth/register").send(newUser);
      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/auth/login", () => {
    const testUser = {
      name: "Isiah Hickerson",
      username: "Zae",
      email: "Zae@gmail.com",
      password: "michealJackson",
    };

    it("logs in an existing user successfully", async () => {
      await request(app).post("/api/auth/register").send(testUser);
      const credentials = {
        emailOrUsername: testUser.username,
        password: testUser.password,
      };

      const expectedUser = {
        id: expect.any(String),
        name: "Isiah Hickerson",
        username: "Zae",
        email: "Zae@gmail.com",
        roles: null,
        created_at: expect.any(String),
      };

      const res = await request(app).post("/api/auth/login").send(credentials);
      console.log(res);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toEqual(expectedUser);
    });

    it("returns 400 status if credentials are invalid", async () => {
      const credentials = {
        emailOrUsername: "unknownuser",
        password: "wrongpassword",
      };

      const response = await request(app)
        .post("/api/auth/login")
        .send(credentials);

      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(/Invalid credentials/i);
    });

    it("returns 400 status if any required fields are missing", async () => {
      const credentialsNoPassword = {
        emailOrUsername: "Goatzalo",
      };
      const credentialsNoEmailOrUsername = {
        password: "DoYouMind123",
      };

      const res1 = await request(app)
        .post("/api/auth/login")
        .send(credentialsNoPassword);
      const res2 = await request(app)
        .post("/api/auth/login")
        .send(credentialsNoEmailOrUsername);

      expect(res1.status).toBe(400);
      expect(res2.status).toBe(400);
      expect(res1.body.message).toMatch(/Please add all fields/i);
      expect(res2.body.message).toMatch(/Please add all fields/i);
    });
  });

  describe("GET /api/auth/logout", () => {
    let testUserId: string;
    let refreshToken: string;

    beforeEach(async () => {
      testUserId = uuidv4();
      await db("users").insert({
        id: testUserId,
        name: "Steve Jobs",
        username: "stevejobs",
        email: "stevejobse@example.com",
        password: "applebetterthanwindows",
      });

      refreshToken = jwt.sign(
        { id: testUserId },
        process.env.JWT_REFRESH_SECRET!,
        {
          expiresIn: "7d",
        }
      );

      await db("refresh_tokens").insert({
        user_id: testUserId,
        token: refreshToken,
        expires_at: new Date(new Date().setDate(new Date().getDate() + 14)),
      });
    });

    it("successfully logs out the user", async () => {
      const response = await request(app)
        .get("/api/auth/logout")
        .set("Cookie", `refreshToken=${refreshToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toMatch(/Successfully logged out/i);

      const tokens = await db("refresh_tokens")
        .select("*")
        .where("user_id", testUserId);
      expect(tokens.length).toBe(0);
    });

    it("still returns 200 status if the refresh token is missing", async () => {
      const response = await request(app).get("/api/auth/logout");
      expect(response.status).toBe(200);
    });
  });
});
