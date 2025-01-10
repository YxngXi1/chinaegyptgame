import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="switching-background h-screen"> 
        <div className="bg-black bg-opacity-50 h-screen text-center flex flex-col items-center justify-center">
          <div className="w-1/2 text-white">
            <div className="mb-[83px]">
              <div className="mb-[36px]" data-aos="fade-up" data-aos-duration="1000">
                <h1 className="font-bold text-5xl mb-[18px]">is it china? or is it egypt?</h1>
                <h2 className="font-bold text-xl">which property belonds to which ancient civilization?</h2>
              </div>
              <p className="font-thin text-xl" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1200">learn about the history of powerful ancient civilizations by learning about the social, political, environmental, cultural, and economic sides that are often unessen</p>
            </div>
            <Link href="/game">
              <button className="rounded-full hover:bg-[#4d9446] bg-[#59AC51] w-[200px] h-[60px] transition ease-in-out duration-100" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1400">
                <p className="text-white text-[20px]">play here &rarr;</p>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
