import "./App.css";
import PerformanceReview from "performanceReview/PerformanceReview";
import Planning from "planning/Planning";

function App() {
  return (
    <div>
      <PerformanceReview isMicroApp={true} />
      <Planning isMicroApp={true} />
    </div>
  );
}

export default App;
