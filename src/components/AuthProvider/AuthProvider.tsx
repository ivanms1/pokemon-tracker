import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const PRIVATE_ROUTES = ["/user", "/nuzlocke/[id]"];

interface AuthProvider {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProvider) {
  const { status } = useSession();
  const router = useRouter();

  const loading = status === "loading";

  useEffect(() => {
    if (
      !loading &&
      PRIVATE_ROUTES.includes(router.pathname) &&
      status !== "authenticated"
    ) {
      router.replace("/");
    }
  }, [loading, status]);

  useEffect(() => {
    if (
      !loading &&
      !PRIVATE_ROUTES.includes(router.pathname) &&
      status === "authenticated"
    ) {
      router.replace("/user");
    }
  }, [loading, status]);

  return <>{children}</>;
}

export default AuthProvider;
