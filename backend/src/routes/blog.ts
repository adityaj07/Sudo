import { Hono } from "hono";
import { Env } from "../types/types";

export const blogRouter = new Hono<{
  Bindings: Env;
  Variables: {
    userId: string;
  };
}>();

blogRouter.get("/blogs", async(c) => {
  

})


