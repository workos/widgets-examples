import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import { notFound } from "next/navigation";

export default async function AuthError(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const encodedError =
    typeof searchParams.error === "string" ? searchParams.error : null;
  const decodedError = encodedError ? atob(encodedError) : null;
  if (decodedError !== "authkit_error") {
    return notFound();
  }

  return (
    <Flex
      direction="column"
      height="100%"
      align="center"
      justify="center"
      p="4"
      gap="4"
    >
      <Flex
        direction="column"
        gap="1"
        align="center"
        justify="center"
        maxWidth="560px"
      >
        <Heading size="5" align="center">
          Authentication Error
        </Heading>
        <Text align="center">
          An error occurred while authenticating. Please try again. If the
          problem persists, please contact your organization administrator.
        </Text>
      </Flex>
      <Button asChild size="3">
        <NextLink href="/">Try again</NextLink>
      </Button>
    </Flex>
  );
}
