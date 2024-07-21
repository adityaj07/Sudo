import { FC } from "react";
import LatestBlogs from "./_components/LatestBlogs";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  return <div className="min-h-dvh">
   <LatestBlogs />

  </div>;
};

export default Home;
