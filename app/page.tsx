import GameContainer from "./components/game-container";

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-start'>
      <GameContainer />
    </main>
  );
}
