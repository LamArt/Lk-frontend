import './App.css'
import PerformanceReview from 'performanceReview/PerformanceReview'
import Authorization from 'authorization/Authorization'


function App() {

  return (
    <div>
      <PerformanceReview isMicroApp={true}/>
      <Authorization isMicroApp={true}/>
    </div>
  )
}

export default App
