import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

type MenuLink = {
  name: string;
  link: string;
};

type DefaultProps = {
  menu: MenuLink[];
  children: JSX.Element;
};

const Default = (props: DefaultProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    document.getElementById("default-sidebar")?.classList.add("hide");
    document.getElementById("default-sidebar")?.classList.remove("display");

    const hideIfOutside = (e: any) => {
      const sidebar = document.getElementById("default-sidebar");
      const outsideHam = document.getElementById("outside-ham");

      if (!sidebar?.contains(e.target) && !outsideHam?.contains(e.target)) {
        if (!sidebar?.classList.contains("hide")) {
          sidebar?.classList.add("hide");
          sidebar?.classList.remove("display");
        }
      }
    };

    window.addEventListener("click", hideIfOutside);

    return () => {
      window.removeEventListener("click", hideIfOutside);
    };
  }, []);

  const toggleHandler = () => {
    document.getElementById("default-sidebar")?.classList.toggle("hide");
    document.getElementById("default-sidebar")?.classList.toggle("display");
  };

  return (
    <div className="default-container">
      <div className="main_menu_wrapper">
          {props.menu.map(({ name, link }, index) => (
            <div
              key={index}
              onClick={() => {
                toggleHandler();
                navigate(link);
              }}
              className={`main_menu_link ${
                pathname == link ? "active" : ""
              }`}
            >
              {name}
            </div>
          ))}
        </div>

      <div className="default-content">{props.children}</div>
    </div>
  );
};

export default Default;
