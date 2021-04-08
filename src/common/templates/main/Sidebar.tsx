import React from "react";
import styled from "styled-components";
import avatar from "../../../assets/images/users/avatar.png";
import logo from "../../../assets/images/brand/logo.png";
import { NavLink } from "react-router-dom";
import SidebarListTile from "./components/SidebarListTile";
import { FiActivity, FiBook, FiImage, FiList, FiTag } from "react-icons/fi";
import { IoImage, IoLayers, IoLogOutOutline } from "react-icons/io5";

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
        <h3>Root User</h3>
        <p>Indian Spice Admin</p>
      </div>
      <nav>
        <NavLink to="/home" activeClassName="sidebar-link-active" exact>
          <SidebarListTile Icon={FiActivity} text="Dashboard" />
        </NavLink>
        <NavLink to="/orders" activeClassName="sidebar-link-active">
          <SidebarListTile Icon={FiList} text="Orders" />
        </NavLink>
        <NavLink to="/categories" activeClassName="sidebar-link-active">
          <SidebarListTile Icon={IoLayers} text="Categories" />
        </NavLink>
        <NavLink to="/gallery" activeClassName="sidebar-link-active">
          <SidebarListTile Icon={IoImage} text="Gallery" />
        </NavLink>
        <NavLink to="/carousel" activeClassName="sidebar-link-active">
          <SidebarListTile Icon={FiImage} text="Carousel" />
        </NavLink>
        <NavLink to="/page" activeClassName="sidebar-link-active">
          <SidebarListTile Icon={FiBook} text="Pages" />
        </NavLink>
        <NavLink to="/promo" activeClassName="sidebar-link-active">
          <SidebarListTile Icon={FiTag} text="Promo Codes" />
        </NavLink>
      </nav>
    </SidebarStyles>
  );
}

export default Sidebar;
