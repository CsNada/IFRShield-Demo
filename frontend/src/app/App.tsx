import { RouterProvider } from "react-router";
import { router } from "./routes";
import { LanguageProvider } from "./context/language";
import ScrollToTop from "../components/ScrollToTop";

export default function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
