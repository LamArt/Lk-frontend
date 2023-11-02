import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SelfReview from './pages/SelfReview'
import { ConfigProvider, ThemeConfig } from 'antd'
import PeerReview from './pages/PeerReview'
import ManagerReview from './pages/ManagerReview'

const basePath = '/performance'

function App({isMicroApp}: {isMicroApp?: boolean}) {
  

  return (
    <>
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path={basePath} element={<SelfReview/>}/>
            <Route path={`${basePath}/peer`} element={<PeerReview/>}/>
            <Route path={`${basePath}/manager`} element={<ManagerReview/>}/>
            {!isMicroApp && <Route path='/' element={<Navigate to={basePath}/>}/>}
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
    Form: {
      labelFontSize: 32,
    },
  }
}