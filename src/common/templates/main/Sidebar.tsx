import React from "react";
import styled from "styled-components";
import avatar from "../../../assets/images/users/avatar.png";
import logo from "../../../assets/images/brand/logo.png";
import { NavLink } from "react-router-dom";
import SidebarListTile from "./components/SidebarListTile";
import { FiActivity } from "react-icons/fi";
import { IoLayers, IoLogOutOutline } from "react-icons/io5";

const SidebarStyles = styled.section`
  .company {
    text-align: center;
    margin-bottom: 2rem;
    img {
      height: 72px;
    }
  }

  .user-pane {
    text-align: center;
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    h3 {
      font-weight: bold;
    }
    p {
      font-size: 1rem;
    }
  }

  nav {
    margin-top: 2.5rem;
  }
`;

function Sidebar() {
  return (
    <SidebarStyles>
      <div className="company">
        <img src={logo} />
      </div>
      <div className="user-pane">
        <img src={avatar} />
        <h3>Sulav Ad</h3>
        <p>Hamro Service Admin</p>
      </div>
      <nav>
        <NavLink to="/" activeClassName="sidebar-link-active" exact>
          <SidebarListTile Icon={FiActivity} text="Dashboard" />
        </NavLink>
        <NavLink to="/products" activeClassName="sidebar-link-active">
          <SidebarListTile Icon={IoLayers} text="Products" />
        </NavLink>
        <SidebarListTile
          Icon={IoLogOutOutline}
          onClick={() => {}}
          text="Logout"
        />
      </nav>
    </SidebarStyles>
  );
}

export default Sidebar;
