import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav >
        <ul style={{display:'flex' , flexDirection:'row', justifyContent:'space-around'}}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/arbitrage">arbitrage</Link>
          </li>
          <li>
            <Link to="/rules">Rules</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;