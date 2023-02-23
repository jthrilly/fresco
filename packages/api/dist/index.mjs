var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/root.ts
import { z } from "zod";

// src/trpc.ts
import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import { prisma } from "@codaco/database";
import superjson from "superjson";
var createTRPCContext = /* @__PURE__ */ __name(async () => {
  return {
    prisma
  };
}, "createTRPCContext");
var t = initTRPC.context().create({
  isServer: true,
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});
var createTRPCRouter = t.router;
var publicProcedure = t.procedure;

// src/root.ts
var userRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany({
      orderBy: {
        id: "desc"
      }
    });
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input
      }
    });
  }),
  create: publicProcedure.input(z.object({
    name: z.string().min(1),
    email: z.string().min(1)
  })).mutation(({ ctx, input }) => {
    return ctx.prisma.user.create({
      data: input
    });
  }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.user.delete({
      where: {
        id: input
      }
    });
  })
});
var appRouter = createTRPCRouter({
  user: userRouter
});
export {
  appRouter,
  createTRPCContext
};
//# sourceMappingURL=index.mjs.map