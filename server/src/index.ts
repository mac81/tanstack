import { Hono } from "hono";
import { fetchData, postData } from "./fetch";

const app = new Hono();

app.get("/api/products", async (c) => {
  const limit = 10;
  const { skip } = c.req.query();

  const data = await fetchData(
    `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
  );

  return c.json(data);
});

app.get("/api/products/category/:category", async (c) => {
  const { category } = c.req.param();

  const data = await fetchData(
    `https://dummyjson.com/products/category/${category}`
  );

  return c.json(data);
});

app.get("/api/products/search", async (c) => {
  const { q } = c.req.query();
  const data = await fetchData(`https://dummyjson.com/products/search?q=${q}`);

  return c.json(data);
});

app.post("/api/products/add", async (c) => {
  const body = await c.req.json();

  const data = await postData("https://dummyjson.com/products/add", body);

  return c.json(data);
});

export default app;
