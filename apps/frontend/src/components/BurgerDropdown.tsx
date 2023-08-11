import { Box, NavLink } from "@mantine/core";

export default function BurgerDropdown({ open = false }: { open: boolean }) {
  return (
    <Box w={"100%"} className={`${open ? "animate-in" : "hidden"} bg-white`}>
      <NavLink label="Find stores" />
      <NavLink label="Browse products" />

      <NavLink label="Account" childrenOffset={28} defaultOpened>
        <NavLink label="my orders" />
        <NavLink label="favourites" />
      </NavLink>
    </Box>
  );
}
