import { hydrateRoot } from "react-dom/client";
import App from "./App";

hydrateRoot(
  document,
  <App
    assets={(window as any).assets}
    data={(window as any).data}
  />
);
