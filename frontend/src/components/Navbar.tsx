import { FC } from "react";
import { ModeToggle } from "./ModeToggle";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div>
      Sudo
      <ModeToggle />
    </div>
  );
};

export default Navbar;
