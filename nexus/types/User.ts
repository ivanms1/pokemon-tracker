import { extendType, nonNull, objectType, stringArg } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
    t.list.field("nuzlockes", {
      type: "Nuzlocke",
    });
  },
});

export const SignupUser = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("signup", {
      type: "User",
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },

      async resolve(_root, args, ctx) {
        if (!args) {
          throw Error("Args missing");
        }

        const user = await ctx.prisma.user.findFirst({
          where: {
            email: args.email,
          },
        });

        if (user) {
          return user;
        }

        return ctx.prisma.user.create({
          data: args,
        });
      },
    });
  },
});
