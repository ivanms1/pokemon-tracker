import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import { Button, Text } from "@mantine/core";

function Home() {
  const { data: session } = useSession();

  console.log("session", session);
  if (session) {
    return (
      <>
        <Text>Signed in as {session?.user?.email} </Text>
        <Button onClick={() => signOut()}>Sign out</Button>
      </>
    );
  }
  return (
    <>
      <Text> Not signed in</Text>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}

export default Home;
