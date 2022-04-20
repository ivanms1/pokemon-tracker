import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { SignupMutation } from "@/generated/generated";
import { initializeApollo } from "lib/apollo";

import MUTATION_SIGNUP from "./mutationSignup.graphql";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const apolloClient = initializeApollo();

      console.log("user", user);
      console.log("account", account);

      const { data } = await apolloClient.mutate<SignupMutation>({
        mutation: MUTATION_SIGNUP,
        variables: {
          email: user?.email,
          username: user?.name,
        },
      });

      if (account) {
        account.id = data?.signup?.id;
      }

      return true;
    },
    jwt({ token, account }) {
      if (account) {
        token.id = account.id;
      }

      return token;
    },
    session({ session, token }: any) {
      return {
        ...session,
        id: token.id,
      };
    },
  },
});
