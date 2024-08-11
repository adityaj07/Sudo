import { FC } from "react";
import Line from "./ui/Line";
import ReactTextareaAutosize from "react-textarea-autosize";
// import PromptInput from "./PromptInput";
import Arrow from "./ui/Arrow";
import { ArrowBigDown, ArrowDownIcon, SparkleIcon } from "lucide-react";
import Link from "next/link";

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
        <Link href="/sign-in" className=" hover:shadow-[0_4px_14px_0_#f58123d5] px-8 py-2 bg-[#f87c17] rounded-md text-white font-semibold transition duration-200 ease-linear relative flex gap-2 justify-center items-center">
          <Arrow className="absolute -top-10 w-32 -right-20" />
          Sudo Login
          <SparkleIcon className="w-4 h-4" />
        </Link>
      </div>

      {/* <div className="flex justify-center items-center gap-4 text-white mt-24">
        <ArrowDownIcon className="w-6 h-6 animate-bounce" />
        <span className="font-light text-base">
          Scroll down
        </span>
      </div> */}
    </section>
  );
};

export default Hero;
