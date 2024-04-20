import './App.css';
import TaskList from './components/Task';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Search from './components/Search';
const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div></div>,
    main: () => <TaskList/>
  },
  {
    path: "/search",
    sidebar: () => <div></div>,
    main: () => <Search/>
  }
];

function App() {
  const renderTask = () => {
    return (
      <Router>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "40%",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <h2>Menu Item</h2>
            <li>
              <Link to="/">Task Management</Link>
            </li>
            <li>
              <Link to="/search">Search Tab</Link>
            </li>
          </ul>

          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.sidebar />}
              />
            ))}
          </Switch>
        </div>

        <div style={{ flex: 1, padding: "10px" }}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
    )
  }
  return (
    <div className="App">
      {renderTask()}
    </div>
  );
}

export default App;
