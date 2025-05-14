import Image from "next/image";

function GeneratedImage({ imgUrl }: { imgUrl: string }) {
  return (
    <div>
      <Image
        src={imgUrl}
        alt='AI Generated Image'
        priority
        width={512}
        height={512}
        className='md:max-w-md px-14 py-2'
      />
    </div>
  );
}

export default GeneratedImage;
