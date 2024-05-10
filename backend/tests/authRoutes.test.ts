import request from "supertest";
import { app } from "../src/app";
import db from "../src/db/db";

jest.mock("../src/db/db");

describe("Auth API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user successfully and returns user data", async () => {
      const newUser = {
        name: "John Doe",
        username: "johndoe",
        email: "johndoe@example.com",
        password: "password123",
      };

    const expectedResponse = {
        name: "John Doe",
        username: "johndoe@example.com",
        roles: ["user"],
        created_at: new Date(),
    };

    (db.raw as jest.Mock).mockResolvedValue({ rows: [expectedResponse] });

        const res = await request(app).post('/api/auth/register').send(newUser);
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("user");
        expect(res.body).toHaveProperty("token");
        expect(res.body.user).toEqual({
            ...expectedResponse,
            id: expect.any(String)
        })
    
    });
      
      it("should respond with status 400 if any required feilds are missing", async () => {
        const newUser = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password123',
        };
          
          const res = await request(app).post("/api/auth/register").send(newUser);
          expect(res.status).toBe(400); 
      })
  });
    
    describe("POST /api/auth/login", async () => {
        const credentials = {
            emailOrUsername: "johndoe",
            password: "password123"
        }
    })
});
