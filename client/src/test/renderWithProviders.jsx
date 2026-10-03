import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "../components/ui/Provider";

// Chakra components need the theme provider around them, just like in main.jsx.
// MemoryRouter lets components with links and routes render without a browser URL.
export const renderWithProviders = (ui, { route = "/" } = {}) =>
  render(
    <Provider>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  );
