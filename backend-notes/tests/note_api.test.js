const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

// Supertest is used to make HTTP requests to the application
const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/); // Check with regex to avoid exact match
});

test("there are two notes", async () => {
  const response = await api.get("/api/notes");
  assert.strictEqual(response.body.length, 2);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");

  const contents = response.body.map((e) => e.content);
  //   assert.strictEqual(contents.includes("HTML is Easy"), true);
  assert(contents.includes("HTML is Easy"));
});

after(async () => {
  await mongoose.connection.close();
});
