import './App.scss'
import Menu from "host/Menu"
import {ConfigProvider, Flex, ThemeConfig} from "antd";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Salary from "./pages/Salary.tsx";
import {lamartAtlassian, lamartGitHub} from "./constans/urls.ts";
import Atlassian from "./assets/Jira.svg";
import GitHub from "./assets/Git.svg";

const basePath = '/salary'

function App({isMicroApp}: {isMicroApp?: boolean}) {


    return (
        <ConfigProvider theme={theme}>
            <Menu/>
            <Flex className='widget' vertical align={"center"} justify={"center"}>
                <a target="_blank" href={lamartAtlassian} className='widget-card'>
                    <img src={Atlassian} alt={'Atlassian icon'} className='widget-card-image'/>
                </a>
                <hr className='widget-line'/>
                <a target="_blank" href={lamartGitHub} className='widget-card'>
                    <img src={GitHub} alt={'GitHub icon'} className='widget-card-image'/>
                </a>
            </Flex>
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
