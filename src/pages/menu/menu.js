import React from 'react';
import css from "./menu.module.scss";
import {Link, useLocation} from "react-router-dom";
import {authRoutes, routes} from "../route";

const Menu = ({isAuthenticated}) => {
  const {pathname} = useLocation()

  return (
    <div>
      <ul className={css.container}>
        {
          isAuthenticated ?
            authRoutes.map(({path, name}) => {
              return <li key={path}>
                <Link
                  key={name}
                  exact='true'
                  to={path}
                  className={pathname === path ? "text-red" : undefined}
                >
                  {name}
                </Link>
              </li>
            }) :
            routes.map(({path, name}) => {
              return <li key={path}>
                <button>
                  <Link
                    key={name}
                    exact='true'
                    to={path}
                    className={pathname === path ? "text-red" : undefined}
                  >
                    {name}
                  </Link>
                </button>
              </li>
            })
        }

      </ul>

    </div>
  );
};

export default Menu;