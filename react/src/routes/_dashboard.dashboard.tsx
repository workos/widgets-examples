import { Flex, Heading, Separator, Text } from "@radix-ui/themes";

export default function DashboardIndex() {
  return (
    <>
      <title>SuperApp | Dashboard</title>
      <Flex direction="column" align="center" px="9">
        <Flex direction="column" gap="5" maxWidth="640px" width="100%" my="9">
          <header>
            <Heading size="8" mb="2">
              Dashboard
            </Heading>
            <Text>Some fancy fake dashboard will go here</Text>
          </header>
          <Separator size="4" />
          <main>{/* */}</main>
        </Flex>
      </Flex>
    </>
  );
}
