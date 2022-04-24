import { PrismaClient } from "@prisma/client";
import prisma from "lib/prisma";

export type Context = {
  prisma: PrismaClient;
  accessToken?: string;
};
export async function createContext(): Promise<Context> {
  return {
    prisma,
  };
}
