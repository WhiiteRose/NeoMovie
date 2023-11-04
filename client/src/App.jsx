import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.config.js";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import routes from "./routes/routes.jsx";
import PageWrapper from "./components/common/PageWrapper.jsx";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import PresentationPage from "./pages/PresentationPage.jsx";

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const { user } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      <CssBaseline />
      <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) => (
              route.index ? (
                <Route
                  index
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={route.state ? (
                    <PageWrapper state={route.state}>{route.element}</PageWrapper>
                  ) : route.element}
                />
              )
            ))}
          </Route>
        </Routes>
         ) : (
          <Routes>
            <Route path="/" element={<PresentationPage />} />
          </Routes>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;