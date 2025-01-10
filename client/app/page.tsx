import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="bg-black h-screen border text-center flex flex-col items-center justify-center"> 
        <div className="border my-auto w-1/2 text-white">
          <div className="mb-[83px]">
          `<div className="mb-[36px]">
              <h1 className="text-bold text-5xl mb-[18px]">is it china? or is it egypt?</h1>
              <h2 className="text-bold text-xl">which property belonds to which ancient civilization?</h2>
            </div>
            <p className="text-xl">learn about the history of powerful ancient civilizations by learning about the social, political, environmental, cultural, and economic sides that are often unessen</p>
          </div>`
          <button className="rounded-full hover:bg-[#4d9446] bg-[#59AC51] w-[307px] h-[80px] transition ease-in-out duration-100">
            <p className="text-white text-[20px]">play here &rarr;</p>
          </button>
        </div>
      </main>
    </>
  );
}
