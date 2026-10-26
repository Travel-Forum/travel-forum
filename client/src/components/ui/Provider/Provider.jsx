"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "../ColorMode/ColorMode";
import { system } from "../../../config/theme";

export const Provider = (props) => {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
};
