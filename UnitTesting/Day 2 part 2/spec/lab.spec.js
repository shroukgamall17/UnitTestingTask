const app = require("../index");
const request = require("supertest");
const req = request(app);
const userModel = require("../models/user");
const todosModel = require("../models/todo");

describe("lab testing:", () => {
  
  afterAll(async () => {
    await userModel.deleteMany();
  });

  describe("users routes:", () => {
  
    it("req to get(/search), expect to get the correct user with his name", async () => {
     
      const user1 = await userModel.create({ name: "ShroukGamal" });

      const res = await req.get("/user/search").query({ name: "ShroukGamal" });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe("ShroukGamal");
    });

    it("req to get(/search) with invalid name, expect res status and res message to be as expected", async () => {
      const res = await req.get("/user/search").query({ name: "Invalid Name" });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("There is no user with name: Invalid Name");
    });

    it("req to delete(/), expect res status to be 200 and a message sent in res", async () => {
      const res = await req.delete("/user");

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("users have been deleted successfully");
    });
  });


  // testing todos
 describe("todos routes:", () => {
    let testTodoId;

    it("should update todo title by id", async () => {
        const todo = await todosModel.create({ title: "Test Todo", userId: "userId" });
        testTodoId = todo._id;

        const res = await req.patch(`/todo/${testTodoId}`).send({ title: "Updated Todo Title" });


        expect(res.status).toBe(200);
        expect(res.body.data.title).toBe("Updated Todo Title");
    });

    it("should get all todos for a user", async () => {
        await todosModel.create([
            { title: "Todo one", userId: "userId" },
            { title: "Todo two", userId: "userId" }
        ]);

        const res = await req.get('/todo/user').set('Authorization', 'Bearer yourAuthToken');

        expect(res.status).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("should get no todos for a user if user has none", async () => {
        const res = await req.get('/todo/user').set('Authorization', 'Bearer yourAuthToken');

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Couldn't find any todos for userId");
    });

    afterAll(async () => {
        await todosModel.deleteMany();
    });
  });
})