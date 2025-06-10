import Image from "next/image";

function GeneratedImage({ imgPath }: { imgPath: string }) {
  return (
    <div>
      <Image
        src={imgPath}
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
