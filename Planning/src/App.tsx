import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, ThemeConfig } from "antd";
import Planning from "./pages/Planning";
import locale from "antd/locale/ru_RU";
import dayjs from "dayjs";

const basePath = "/planning";

function App({ isMicroApp }: { isMicroApp?: boolean }) {
  return (
    <>
      <ConfigProvider theme={theme} locale={locale}>
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
    Slider: {
      railSize: 15,
      trackBg: "#3A6EFF",
      trackHoverBg: "#3A6EFF",
      railBg: "#98B3FE",
      railHoverBg: "#98B3FE",
      handleLineWidth: 1,
      handleLineWidthHover: 2,
      handleSize: 36,
      handleSizeHover: 36,
      borderRadiusXS: 22,
    },
  },
};
