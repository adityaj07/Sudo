import { Hono } from "hono";
import { Env } from "../types/types";
import { getDBInstance } from "../db/utils";
import { QuerySchema } from "../types/Schemas/QuerySchema";
import { zValidator } from "@hono/zod-validator";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { CreateBlogSchema } from "../types/Schemas/CreateBlogSchema";
import { UpdateBlogSchema } from "../types/Schemas/UpdateBlogSchema";

export const blogRouter = new Hono<{
  Bindings: Env;
  Variables: {
    userId: string;
  };
}>();

// GET / => Get all blogs
blogRouter.get(
  "/",
  zValidator("query", QuerySchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          success: false,
          message: "Invalid query paramters",
        },
        400
      );
    }
  }),
  async (c) => {
    try {
      const prisma = getDBInstance(c);
      const { page, pageSize, sortBy, order, author } = c.req.valid("query");

      const query = {
        where: {},
        orderBy: { [sortBy]: order },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      };

      if (author) {
        query.where = {
          ...query.where,
          author: {
            name: {
              contains: author,
              mode: "insensitive",
            },
          },
        };
      }

      const [blogs, totalCount] = await Promise.all([
        prisma.post.findMany(query),
        prisma.post.count({
          where: query.where,
        }),
      ]);

      const response = {
        success: true,
        message: "Fetched blogs successfully",
        data: blogs.map((blog) => ({
          id: blog.id,
          title: blog.title,
          content: blog.content,
          publishedAt: blog.publishedAt,
          author: blog.author,
        })),
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalPages: Math.ceil(totalCount / pageSize),
          totalCount: totalCount,
        },
      };

      if (!blogs && !totalCount) {
        return c.json(
          {
            success: false,
            message: "Error fetching blogs",
          },
          500
        );
      }

      if (totalCount === 0) {
        return c.json(
          {
            success: false,
            message: "No blogs found.",
          },
          404
        );
      }

      return c.json(response, 200);
    } catch (error) {
      return c.json(
        {
          success: false,
          message: "Internal server error: " + error,
        },
        500
      );
    }
  }
);

//GET /:blogId => Get one blog regardless of user
blogRouter.get("/:blogId", async (c) => {
  try {
    const prisma = getDBInstance(c);
    const blogId = c.req.param("blogId");

    const blog = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!blog) {
      return c.json(
        {
          success: false,
          message: "Blog not found.",
        },
        404
      );
    }

    const response = {
      success: true,
      message: "Fetched blog successfully",
      data: {
        id: blog.id,
        title: blog.title,
        content: blog.content,
        publishedAt: blog.publishedAt,
        author: blog.author,
      },
    };

    return c.json(response, 200);
  } catch (error) {
    console.error("Error fetching blog: ", error);
    return c.json(
      {
        success: false,
        message: "Error fetching the blog",
      },
      500
    );
  }
});

//AUTH MIDDLEWARE => Endpoints above this are unprotected
blogRouter.use("/*", async (c, next) => {
  const tokenFromCookie = getCookie(c, "token");

  if (!tokenFromCookie) {
    return c.json(
      {
        success: false,
        message: "Authentication token is missing.",
      },
      401
    );
  }
  const user = await verify(tokenFromCookie, c.env.JWT_SECRET);
  if (user && typeof user.id === "string") {
    c.set("userId", user.id);
    return next();
  } else {
    return c.json({ success: false, message: "Unauthorized" }, 403);
  }
});

//POST / => Create blog
blogRouter.post(
  "/",
  zValidator("json", CreateBlogSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          success: false,
          message: "Invalid inputs " + result.error,
        },
        411
      );
    }
  }),
  async (c) => {
    try {
      const prisma = getDBInstance(c);
      const { title, content, published } = c.req.valid("json");

      const authorId = c.get("userId");

      const blogPost = await prisma.post.create({
        data: {
          title,
          content,
          authorId,
          published,
        },
      });

      return c.json(
        {
          success: true,
          message: "Blog created successfully",
          data: {
            id: blogPost.id,
            published: blogPost.published,
            publishedAt: blogPost.publishedAt,
          },
        },
        200
      );
    } catch (error) {
      console.error("Error creating blog: ", error);
      return c.json(
        {
          success: false,
          message: "Some error occurred while publishing the blog",
        },
        500
      );
    }
  }
);


//PUT /:blogId => Update  blog
blogRouter.put(
  "/:blogId",
  zValidator("json", UpdateBlogSchema, (result, c) => {
    if (!result.success) {
      
      return c.json(
        {
          success: false,
          message: "Invalid inputs " + result.error,
        },
        411
      );
    }
  }),
  async (c) => {
    try {
      const prisma = getDBInstance(c);
      const blogId = c.req.param("blogId");
      const authorId = c.get("userId");

      const { title, content, published } = c.req.valid("json");

      const updatedBlogPost = await prisma.post.update({
        data: {
          title,
          content,
          published,
        },
        where: {
          id: blogId,
          authorId: authorId,
        },
      });

      if (!updatedBlogPost) {
        return c.json(
          {
            success: false,
            message: "Blog not found",
          },
          404
        );
      }

      return c.json(
        {
          success: true,
          message: "Blog updated successfully",
          data: {
            id: updatedBlogPost.id,
            published: updatedBlogPost.published,
            publishedAt: updatedBlogPost.publishedAt,
          },
        },
        200
      );
    } catch (error) {
      console.error("Error updating blog: ", error);
      return c.json(
        {
          success: false,
          message: "Some error occurred while updating the blog",
        },
        500
      );
    }
  }
);

//DELETE /:blogId => Delete blog
blogRouter.delete("/:blogId", async (c) => {
  try {
    const prisma = getDBInstance(c);
    const blogId = c.req.param("blogId");
    const authorId = c.get("userId");

    const deletedBlogPost = await prisma.post.delete({
      where: {
        id: blogId,
        authorId: authorId,
      },
    });

    if (!deletedBlogPost) {
      return c.json(
        {
          success: false,
          message: "Blog not found",
        },
        404
      );
    }

    return c.json(
      {
        success: true,
        message: "Blog deleted successfully",
        data: {
          id: deletedBlogPost.id,
        },
      },
      200
    );
  } catch (error) {
    console.error("Error deleting the blog: ", error);
    return c.json(
      {
        success: false,
        message: "Some error occurred while deleting the blog",
      },
      500
    );
  }
});

//POST /:blogId/publish => To publish a draft
blogRouter.post("/:blogId/publish", async (c) => {
  try {
    const prisma = getDBInstance(c);
    const blogId = c.req.param("blogId");
    const authorId = c.get("userId");

    const updatedBlogPost = await prisma.post.update({
      data: {
        published: true,
      },
      where: {
        id: blogId,
        authorId: authorId,
      },
    });

    if (!updatedBlogPost) {
      return c.json(
        {
          success: false,
          message: "Blog not found",
        },
        404
      );
    }

    return c.json(
      {
        success: true,
        message: "Blog published successfully",
        data: {
          id: updatedBlogPost.id,
          published: updatedBlogPost.published,
          publishedAt: updatedBlogPost.publishedAt,
        },
      },
      200
    );
  } catch (error) {
    console.error("Error publishing blog: ", error);
    return c.json(
      {
        success: false,
        message: "Some error occurred while publishing the blog",
      },
      500
    );
  }
});

