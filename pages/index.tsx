import Head from "next/head";

import Button from "../src/components/Button";

function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <Head>
        <title>Next Template</title>
        <meta name="description" content="Next.js template by Ivan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl text-black font-semibold mb-2">Welcome</h1>
      <Button className="p-3 max-w-sm mx-auto bg-red-500 rounded-xl shadow-md flex items-center space-x-4 text-white hover:bg-red-600">
        Click Me
      </Button>
    </div>
  );
}

export default Home;
