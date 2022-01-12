import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <Link to="/user">QUIZ</Link>
        <Link to="/mod">MOD</Link>
      </nav>
      <Outlet />
    </div>
  );
}
export default App;
