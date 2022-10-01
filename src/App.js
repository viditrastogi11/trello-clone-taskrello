import "./App.css";
import Trello from "./container/Trello";
import reduxStore from "./store/reduxStore";
import { Provider } from "react-redux";

import "antd/dist/antd.min.css";

function App() {
  return (
    <Provider store={reduxStore}>
      <div className="App-header">
        <Trello></Trello>
      </div>
    </Provider>
  );
}

export default App;
