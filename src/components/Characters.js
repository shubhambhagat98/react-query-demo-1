import { useQuery } from "@tanstack/react-query";
import { Character } from "./Character";
import { useState } from "react";

export const Characters = () => {
  const [page, setPage] = useState(1);

  const fetchCharacters = async ({ queryKey }) => {
    console.log(`fetching data at ${new Date().toUTCString()}`);
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    return response.json();
  };

  const {
    data: characters,
    status,
    refetch,
  } = useQuery(["characters", page], fetchCharacters, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    // refetchInterval: 2000,
  });

  if (status === "loading") {
    return <h1>Loading ...</h1>;
  }

  if (status === "error") {
    return <div>Error ...</div>;
  }

  return (
    <>
      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          disabled={!characters.info.next}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
        <button onClick={refetch}>Reload</button>
      </div>
      <div className="characters">
        {characters.results.map((character) => (
          <Character key={character.id} character={character} />
        ))}
      </div>
    </>
  );
};
