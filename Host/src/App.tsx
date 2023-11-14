import './App.css'
import PerformanceReview from 'performanceReview/PerformanceReview'
import Authorization from 'authorization/Authorization'
import Planning from "planning/Planning";
import Salary from "salary/Salary";

function App() {
  return (
    <div>
      <PerformanceReview isMicroApp={true} />
      <Planning isMicroApp={true} />
      <Authorization isMicroApp={true}/>
      <Salary isMicroApp={true}/>
    </div>
  );
}

export default App;
