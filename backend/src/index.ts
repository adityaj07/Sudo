import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { Env } from "./types/types";

const app = new Hono<{ Bindings: Env }>();

app.use("*", async (c, next) => {
  const frontendUrls = c.env.FRONTEND_URL;

  return cors({
    origin: frontendUrls,
    allowMethods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    credentials: true,
  })(c, next);
});

app.options("*", (c) => {
  return c.text("", 204);
});

app.route("/api/v1/users", userRouter);
app.route("/api/v1/blogs", blogRouter);

app.get("/healthCheck", (c) => {
  return c.text("Hono server is 🔥");
});

export default app;
