import { NavLink, Outlet } from "react-router-dom";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <div className={styles.navInner}>
          <NavLink
            to="/todos"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Todos
          </NavLink>
          <NavLink
            to="/form-builder"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Form Builder
          </NavLink>
          <NavLink
            to="/form-preview"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Form Preview
          </NavLink>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default App;
