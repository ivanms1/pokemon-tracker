import { useGetNuzlockesQuery } from "@/generated/generated";

function Home() {
  const { data } = useGetNuzlockesQuery();
  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <h1 className="text-4xl text-black font-semibold mb-2">Nuzlockes</h1>
      {data?.nuzlockes?.map((nuzlocke) => (
        <p key={nuzlocke?.id}>{nuzlocke?.title}</p>
      ))}
    </div>
  );
}

export default Home;
