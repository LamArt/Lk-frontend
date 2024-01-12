import './App.scss'
import {ConfigProvider, ThemeConfig} from "antd";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Salary from "./pages/Salary.tsx";

const basePath = '/salary'

function App({isMicroApp = true}: {isMicroApp?: boolean}) {


    return (
        <ConfigProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path={basePath} element={<Salary/>}/>
                    {!isMicroApp && <Route path='/' element={<Navigate to={basePath}/>}/>}
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    )
}

export default App

const theme: ThemeConfig = {
    components: {
        Slider: {
            railSize: 15,
            trackBg: '#3A6EFF',
            trackHoverBg: '#3A6EFF',
            railBg: '#98B3FE',
            railHoverBg: '#98B3FE',
            handleLineWidth: 1,
            handleLineWidthHover: 2,
            handleSize: 36,
            handleSizeHover: 36,
            borderRadiusXS: 22
        },
    }
}
