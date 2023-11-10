import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, ThemeConfig } from "antd";
import Planning from "./pages/Planning";

const basePath = "/planning";

function App({ isMicroApp }: { isMicroApp?: boolean }) {
  return (
    <>
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={basePath} element={<Planning />} />
            {!isMicroApp && (
              <Route path="/" element={<Navigate to={basePath} />} />
            )}
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export default App;

const theme: ThemeConfig = {
  components: {
    Button: {
      fontSize: 16,
      colorPrimary: "#0843DD",
      colorBgContainerDisabled: "#84A6FF",
      colorTextDisabled: "#ffffff",
      borderRadius: 10,
    },
  },
};
