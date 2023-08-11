import { Flex, Menu, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

export default function Dropdown() {
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <Flex
          justify={"center"}
          align={"center"}
          className="hover:underline underline-offset-8"
        >
          <Text size={"sm"} className="font-mono">
            Account
          </Text>
          <IconChevronDown size={"15"} />
        </Flex>
      </Menu.Target>

      <Menu.Dropdown className="w-max-[1rem]">
        <Menu.Item component="a">my orders</Menu.Item>
        <Menu.Item component="a">favourites</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
