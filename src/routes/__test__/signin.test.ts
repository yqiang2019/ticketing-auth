import supertest from "supertest";
import { app } from "../../app";

it("fails when an email that does not exist is supplied", async () => {
  return supertest(app)
    .post("/api/users/signin")
    .send({
      email: "rRqJ0@example.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await supertest(app)
    .post("/api/users/signup")
    .send({
      email: "rRqJ0@example.com",
      password: "password",
    })
    .expect(201);

  await supertest(app)
    .post("/api/users/signin")
    .send({
      email: "rRqJ0@example.com",
      password: "password123",
    })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await supertest(app)
    .post("/api/users/signup")
    .send({
      email: "rRqJ0@example.com",
      password: "password",
    })
    .expect(201);

  const response = await supertest(app)
    .post("/api/users/signin")
    .send({
      email: "rRqJ0@example.com",
      password: "password",
    })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});
