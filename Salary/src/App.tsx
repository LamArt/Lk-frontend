import './App.css'
import {ConfigProvider, ThemeConfig} from "antd";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import { Provider } from 'react-redux';
import Jira from "./pages/Jira.tsx";
import { store } from "./redux/store.ts";

const basePath = '/salary'

function App({isMicroApp}: {isMicroApp?: boolean}) {


    return (
        <>
            <Provider store={store} >
                <ConfigProvider theme={theme}>
                    <BrowserRouter>
                        <Routes>
                            <Route path={basePath} element={<Jira/>}/>
                            {!isMicroApp && <Route path='/' element={<Navigate to={basePath}/>}/>}
                        </Routes>
                    </BrowserRouter>
                </ConfigProvider>
            </Provider>
        </>
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
        Form: {
            labelFontSize: 32,
        },
    }
}
