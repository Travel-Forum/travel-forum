import { render } from "@testing-library/react";
import { Provider } from "../components/ui/Provider";

// Chakra components need the theme provider around them, just like in main.jsx.
export const renderWithProviders = (ui) => render(<Provider>{ui}</Provider>);
