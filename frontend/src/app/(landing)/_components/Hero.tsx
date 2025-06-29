import { FC } from "react";
import Line from "./ui/Line";
// import PromptInput from "./PromptInput";
import { SparkleIcon } from "lucide-react";
import Link from "next/link";
import Arrow from "./ui/Arrow";

interface HeroProps {}

const Hero: FC<HeroProps> = ({}) => {
  return (
    <section id="#Hero" className="flex flex-col justify-center items-center">
      <h1 className="text-center mx-auto bg-gradient-to-t from-orange-100 to-orange-500 bg-clip-text text-5xl tracking-tighter text-transparent md:text-6xl lg:text-7xl">
        Publish code stories in{" "}
        <span className="text-transparent bg-clip-text bg-orange-100/50 relative">
          <Line className="absolute -top-3 -right-7 -left-7" />
          hours
        </span>{" "}
        <span className="italic text-transparent bg-clip-text">minutes</span>
      </h1>
      <h3 className="text-center mx-auto bg-gradient-to-t from-indigo-200 to-yellow-100 bg-clip-text text-base tracking-normal sm:text-md text-transparent md:text-lg lg:text-xl mt-6 text-wrap w-[90%]">
        Skip the hassle and share your code journey in minutes with <br />
        <span className="font-semibold">
          Sudo ~ The blogging platform for developers.
        </span>
      </h3>
      <div className="flex justify-center items-center gap-4 mt-6">
        {/* <PromptInput
          className="flex justify-center items-start bg-black border border-orange-300/20 rounded-lg text-white px-2 py-4 min-w-[30rem]"
          placeholder="Create a banner for a hackathon happening in mumbai"
        /> */}
        <Link
          href="/sign-in"
          className=" hover:shadow-[0_4px_14px_0_#f58123d5] px-8 py-2 bg-[#f87c17] rounded-md text-white font-semibold transition duration-200 ease-linear relative flex gap-2 justify-center items-center"
        >
          <Arrow className="absolute -top-10 w-32 -right-20" />
          Sudo Login
          <SparkleIcon className="w-4 h-4" />
        </Link>

        {/* Test Demo Button */}
        <Link
          href="/sign-in?demo=true"
          className="px-6 py-2 border-2 border-orange-200 text-orange-600 hover:bg-orange-50 rounded-lg font-semibold transition-all duration-200 ease-linear flex gap-2 justify-center items-center text-sm dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950"
        >
          🧪 Try Demo
        </Link>
      </div>
    </section>
  );
};

export default Hero;
