import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Authorization from './pages/Authorization.tsx'
import TokenPage from "./pages/TokenPage.tsx";
import { ConfigProvider, ThemeConfig } from 'antd'

const basePath = '/authorization'

function App({isMicroApp = true}: {isMicroApp?: boolean}) {

    return (
        <>
            <ConfigProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path={basePath} element={<Authorization/>}/>
                        {!isMicroApp && <Route path='/' element={<Navigate to={basePath}/>}/>}
                        <Route path="/token" element={<TokenPage/>}/>
                    </Routes>
                </BrowserRouter>
            </ConfigProvider>
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

    }
}