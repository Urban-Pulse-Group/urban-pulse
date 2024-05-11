import request from "supertest";
import { app } from "../src/app";
import { Communities, Community } from "../src/models/Communities";
import { User, Users } from "../src/models/User";
import db from "../src/db/testdb";
describe("Community API", () => {
    let user: User;

    const setUser = (newUser: User) => (user = newUser);
    beforeAll(async () => {
        db("users").del()
        let user = await Users.create({
            username: "testing",
            password: "testing",
            name: "testing",
            email: "testing@gmail.com",
        });
        setUser(user as User);
    });
    afterAll(async () => {
        db("users").del()
    });
    describe("POST /api/community", () => {
        it("successfully creates a Community and sends 201 status", async () => {
            const formData = {
                userId: user.id,
                title: "nyc",
                description: " nyc community",
                category: "city",
            };

            const expectedRes = {
                id: expect.any(String),
                userId: user.id,
                title: "nyc",
                description: " nyc community",
                category: "city",
                created_at: expect.anything(),
            };

            const res = await request(app).post("/api/community").send(formData);
            expect(res.status).toBe(201);
            expect(res.body.data).toEqual(expectedRes);
            expect(res.body.message).toMatch(/Post created successfully/i);
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
        const communitiesData = [
            {
                user_id: "uuid_of_user_1",
                title: "Gardening Enthusiasts",
                description:
                    "A community for people who enjoy gardening and sharing tips about plants.",
                category: "Hobby",
            },
            {
                user_id: "uuid_of_user_2",
                title: "Tech Innovators",
                description:
                    "A place to discuss the latest in tech, gadgets, and software development.",
                category: "Technology",
            },
            {
                user_id: "uuid_of_user_3",
                title: "Fitness Freaks",
                description:
                    "Community dedicated to fitness enthusiasts who love to keep active and healthy.",
                category: "Health & Fitness",
            },
        ];
        beforeAll(async () => {
            await db("communities").del();
            await db("communities").insert(communitiesData);
        });
        afterAll(async () => {
            await db("communities").del();
        });

        it("gets all communities from the database", async () => {
            const res = await request(app).get("/api/community").send();
            const responseData = res.body.data.map(({ user_id, title, description, category }: {
                user_id: string;
                title: string;
                description: string;
                category: string;
                created_at?: Date;
            }) => ({
                user_id, title, description, category
            }));
            expect(responseData).toEqual(communitiesData);
        });
    
        
    });

    describe("GET /api/community/:id", () => {
        let id: string;
   
        beforeAll(async () => {
            let comId = await db("communities").insert({
                userId: user.id,
                title: "nyc",
                description: "nyc community",
                category: "city",
            }).returning("id");
            id = comId[0];
        })
        afterAll(async () => {
            await db("communities").del()
        })
        it("gets one community based on the id passed in", async () => {
            const res = await request(app).get(`/api/community/${id}`).send()
            expect(res.body.data).toMatchObject({
                id: id,
                user_id: user.id,
                title: "nyc",
                description: "nyc community",
                category: "city"
            })
        })
    })
})
