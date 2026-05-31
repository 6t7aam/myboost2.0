import { BrowserRouter } from "react-router-dom";
import AppProviders from "@/AppProviders";
import AppRoutes from "@/AppRoutes";

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
