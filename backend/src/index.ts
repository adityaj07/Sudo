import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";
import { postRouter } from "./routes/post";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>().basePath("/api/v1");

app.use("/*", cors());
app.route("/user", userRouter);
app.route("/post", postRouter);


app.get("/healthCheck", (c) => {
  return c.text("Hono server is 🔥");
});

export default app;
