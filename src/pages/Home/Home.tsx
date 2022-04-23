import React from "react";
import { signIn } from "next-auth/react";

import { Button, Text } from "@mantine/core";

function Home() {
  return (
    <>
      <Text>Welcome to Nuzlocke Tracker!</Text>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}

export default Home;
