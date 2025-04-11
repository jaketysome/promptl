import GeneratedImage from "./generated-img";

function GameContainer({ imgUrl, prompt }: { imgUrl: string; prompt: string }) {
  return (
    <div className='flex flex-col w-full max-w-md h-full items-start justify-center border-1'>
      <GeneratedImage {...{ imgUrl, prompt }} />
    </div>
  );
}

export default GameContainer;
