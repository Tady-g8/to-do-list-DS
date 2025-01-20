import { Spinner, Box } from "@chakra-ui/react";

export default function LoadingCircle() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="10vh"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
}