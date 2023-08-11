import { useState } from "react";
import { Burger, Button, Group } from "@mantine/core";
import Dropdown from "./Dropdown";
import BurgerDropdown from "./BurgerDropdown";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav className="w-full flex flex-row justify-between items-center border-y-[0.1rem] border-black my-[1vw] px-[5vw] h-16 z-10">
        <div className="flex flex-row text-xl">
          <strong>boot</strong>
          <span className="font-light">store</span>
        </div>

        <div className="flex flex-row gap-10 text-sm xs:hidden sm:hidden md:inline-flex cursor-pointer font-mono">
          <p className="hover:underline underline-offset-8">Find Stores</p>
          <p className="hover:underline underline-offset-8">Browse Products</p>
          <Dropdown />
        </div>

        <Group>
          <Link href="#">
            <Button variant="outline" color="dark">
              Sign up
            </Button>
          </Link>
          <Burger opened={open} onClick={toggle} className="md:hidden" />
        </Group>
      </nav>
      <section className={"w-full xs:z-10 md:hidden fixed top-[4.5rem] "}>
        <BurgerDropdown open={open} />
      </section>
    </>
  );
}

export default Navbar;
