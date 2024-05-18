import request from "supertest";

import { Communities, Community } from "../src/models/Communities";
import { User, Users } from "../src/models/User";
import { startServer, closeServer } from "../src/testSetup";
import { v4 as uuid } from "uuid";
import db from "../src/db/testdb";
import { start } from "repl";
import { Server } from "http";
describe("Community API", () => {
  let user: User | null;
  let app: Server;

  const setUser = (newUser: User) => (user = newUser);
  beforeAll(async () => {
    app = await startServer();

    db("users").del();
    user = await Users.create({
      username: "testing",
      password: "testing",
      name: "testing",
      email: "testing@gmail.com",
    });
    setUser(user as User);
  });
  afterAll(async () => {
    await closeServer();
    db("users").del();
  });
  describe("POST /api/community", () => {
    it("successfully creates a Community and sends 201 status", async () => {
      const formData = {
        userId: user?.id,
        title: "nyc",
        description: " nyc community",
      };

      const expectedRes = {
        id: expect.any(String),
        user_id: user?.id,
        title: "nyc",
        description: " nyc community",
        img: "",
        created_at: expect.anything(),
      };

      const res = await request(app).post("/api/community").send(formData);
      expect(res.status).toBe(201);
      expect(res.body.data).toEqual(expectedRes);
      expect(res.body.message).toMatch(/Community created successfully/i);
    });

    it("sends 400 status if any of the required fields are missing from the request body", async () => {
      const formData = {
        title: "nyc",
        description: " nyc community",
        category: "city",
      };
      const res = await request(app).post("/api/community").send(formData);
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(
        /Missing 1 or more of the required fields/i
      );
    });
  });

  describe("GET /api/community", () => {
    const id = uuid();
    const newUser = {
      id: id,
      username: "testing",
      password: "testing",
      name: "testing",
      email: "testing@gmail.com",
    };
    const communitiesData = [
      {
        user_id: id,
        title: "Gardening Enthusiasts",
        description:
          "A community for people who enjoy gardening and sharing tips about plants.",
        img: "",
      },
      {
        user_id: id,
        title: "Tech Innovators",
        description:
          "A place to discuss the latest in tech, gadgets, and software development.",
        img: "",
      },
      {
        user_id: id,
        title: "Fitness Freaks",
        description:
          "Community dedicated to fitness enthusiasts who love to keep active and healthy.",
        img: "",
      },
    ];
    beforeAll(async () => {
      await db("communities").del();
      await db("communities").insert(communitiesData);
    });
    afterAll(async () => {
      await db("communities").del();
      await db("users").del();
    });

    it("Gets all communities from the database", async () => {
      const res = await request(app).get("/api/community").send();
      const responseData = res.body.data.map(
        ({
          user_id,
          title,
          description,
          img,
        }: {
          user_id: string;
          title: string;
          description: string;
          img: string;
          created_at?: Date;
        }) => ({
          user_id,
          title,
          description,
          img,
        })
      );
      expect(responseData).toEqual(communitiesData);
    });
  });

  describe("GET /api/community/:id", () => {
    let id: string;

    beforeAll(async () => {
      let comId = await db("communities")
        .insert({
          userId: user?.id,
          title: "nyc",
          description: "nyc community",
        })
        .returning("id");
      id = comId[0];
    });
    afterAll(async () => {
      await db("communities").del();
    });
    it("Gets one community based on the id passed in", async () => {
      const res = await request(app).get(`/api/community/${id}`).send();
      expect(res.body.data).toMatchObject({
        id: id,
        user_id: user?.id,
        title: "nyc",
        description: "nyc community",
        category: "city",
      });
    });
  });
});
