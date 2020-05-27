const request = require("supertest");
const { app } = require("../app");

describe("/", () => {
  it("should return", async () => {
    const res = await request(app).get("/");
    expect(res.body.name).toBe("here");
  });
});
