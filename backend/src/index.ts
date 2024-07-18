import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { Env } from "./types/types";

const app = new Hono<{ Bindings: Env }>().basePath("/api/v1");

app.use("/*", cors());
app.route("/users", userRouter);
app.route("/blogs", blogRouter);

app.get("/healthCheck", (c) => {
  return c.text("Hono server is 🔥");
});

export default app;
