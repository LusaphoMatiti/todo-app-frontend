import { createRoot } from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter

import App2 from "./App2.jsx";
import "./App.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {" "}
      {/* Wrap App with BrowserRouter */}
      <App2 />
    </BrowserRouter>
  </QueryClientProvider>
);
