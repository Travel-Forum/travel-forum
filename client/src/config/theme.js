import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "ocean",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Fraunces Variable', serif" },
        body: { value: "'DM Sans Variable', sans-serif" },
      },
      colors: {
        ocean: {
          50: { value: "#EAF6F6" },
          100: { value: "#CDEBEC" },
          200: { value: "#9DD6D8" },
          300: { value: "#67BCC0" },
          400: { value: "#379EA3" },
          500: { value: "#1A8389" },
          600: { value: "#0F6E74" },
          700: { value: "#0D5A5F" },
          800: { value: "#0C474B" },
          900: { value: "#0A383B" },
          950: { value: "#062426" },
        },
        coral: {
          50: { value: "#FEF2EF" },
          100: { value: "#FDE1DA" },
          200: { value: "#FBC3B5" },
          300: { value: "#F79C86" },
          400: { value: "#F3826A" },
          500: { value: "#F0705A" },
          600: { value: "#D9533C" },
          700: { value: "#B5402C" },
          800: { value: "#8F3424" },
          900: { value: "#6E2A1F" },
          950: { value: "#3C140D" },
        },
        sand: {
          50: { value: "#FBF6EE" },
          100: { value: "#F5ECDD" },
          200: { value: "#EBDDC4" },
        },
      },
    },
    semanticTokens: {
      colors: {
        ocean: {
          solid: {
            value: {
              _light: "{colors.ocean.600}",
              _dark: "{colors.ocean.500}",
            },
          },
          contrast: { value: "white" },
          fg: {
            value: {
              _light: "{colors.ocean.700}",
              _dark: "{colors.ocean.300}",
            },
          },
          muted: {
            value: {
              _light: "{colors.ocean.100}",
              _dark: "{colors.ocean.900}",
            },
          },
          subtle: {
            value: { _light: "{colors.ocean.50}", _dark: "{colors.ocean.950}" },
          },
          emphasized: {
            value: {
              _light: "{colors.ocean.200}",
              _dark: "{colors.ocean.800}",
            },
          },
          focusRing: {
            value: {
              _light: "{colors.ocean.500}",
              _dark: "{colors.ocean.400}",
            },
          },
        },
        coral: {
          solid: {
            value: {
              _light: "{colors.coral.600}",
              _dark: "{colors.coral.500}",
            },
          },
          contrast: { value: { _light: "white", _dark: "#1E2A32" } },
          fg: {
            value: {
              _light: "{colors.coral.700}",
              _dark: "{colors.coral.300}",
            },
          },
          muted: {
            value: {
              _light: "{colors.coral.100}",
              _dark: "{colors.coral.900}",
            },
          },
          subtle: {
            value: { _light: "{colors.coral.50}", _dark: "{colors.coral.950}" },
          },
          emphasized: {
            value: {
              _light: "{colors.coral.200}",
              _dark: "{colors.coral.800}",
            },
          },
          focusRing: {
            value: {
              _light: "{colors.coral.500}",
              _dark: "{colors.coral.400}",
            },
          },
        },
        bg: {
          DEFAULT: { value: { _light: "{colors.sand.50}", _dark: "#0E1A1F" } },
          subtle: { value: { _light: "{colors.sand.100}", _dark: "#15252B" } },
          muted: { value: { _light: "{colors.sand.200}", _dark: "#1D3239" } },
          panel: { value: { _light: "white", _dark: "#132329" } },
        },
        fg: {
          DEFAULT: { value: { _light: "#1E2A32", _dark: "#F3EDE4" } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
export const cardHoverStyles = {
  boxShadow: "sm",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  _hover: { transform: "translateY(-4px)", boxShadow: "lg" },
};
