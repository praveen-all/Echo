import { Box } from "@chakra-ui/react";
import React from "react";

export default function BoxInformation({ info }) {
  console.log(info);
  return (
    <Box p={4} border={"1px solid rgb(126, 121, 131)"} borderRadius={"5px"}>
      {info.info}
    </Box>
  );
}
