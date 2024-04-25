import WeatherPage from "./component/WeatherPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Toast from "./toast/Toast";
import "./App.css";

function App() {
  return (
    <div className="main-container">
      <WeatherPage />
      <Toast />
    </div>
  );
}

export default App;
