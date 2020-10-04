import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const NavBar = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    authContext.logout();
    history.push("/");
  };

  return (
    <nav>
      <div class="nav-wrapper blue darken-1" style={{ padding: "0 2rem" }}>
        <span class="brand-logo">Сокращение ссылок</span>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <NavLink to="/crate">Создать</NavLink>
          </li>
          <li>
            <NavLink to="/links">Ссылки</NavLink>
          </li>
          <li>
            <a to="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
