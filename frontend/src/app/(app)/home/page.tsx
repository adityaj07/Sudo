import { FC } from "react";
import HomeTabs from "./_components/HomeTabs";

interface HomeProps {}

const Home: FC<HomeProps> = async ({}) => {
  return (
    <div className="min-h-dvh">
      <HomeTabs />
    </div>
  );
};

export default Home;
