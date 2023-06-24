import request from "supertest";
import { app } from "../index.js";

describe("Operaciones CRUD de cafes", () => {
  test("Testea que la ruta GET /cafes devuelve un status code 200", async () => {
    const response = await request(app).get("/cafes");

    expect(response.status).toBe(200);
  });

  test("Testear que el tipo de dato recibido es un arreglo", async () => {
    const response = await request(app).get("/cafes");

    expect(response.body).toBeInstanceOf(Array);
  });

  test("Testear que el arreglo tenga al menos un objeto", async () => {
    const response = await request(app).get("/cafes");

    expect(response.body.length).toBeGreaterThan(0);
  });

  test("Testear que la ruta POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
    const addCoffee = { id: 5, nombre: "Expresso" };
    const response = await request(app).post("/cafes").send(addCoffee);

    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(addCoffee);
  });

  test("Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe", async () => {
    const jwt = "jsonWebToken";
    const deleteCoffee = 6;

    const response = await request(app)
      .delete(`/cafes/${deleteCoffee}`)
      .set("Authorization", jwt);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "No se encontró ningún cafe con ese id",
    });
  });

  test("Testear que ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
    const id = 2;
    const updateCoffee = { id: 3, nombre: "Latte" };
    const response = await request(app).put(`/cafes/${id}`).send(updateCoffee);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "El id del parámetro no coincide con el id del café recibido",
    });
  });
});
