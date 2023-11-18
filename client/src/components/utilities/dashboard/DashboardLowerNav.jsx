import styled from "styled-components";
import { NavLink } from "react-router-dom";

import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import Home from "../icons/Home";
import Create from "../icons/Create";
import Messages from "../icons/Messages";

const DashboardLowerNavWrapper = styled.nav`
  .dashboard--lower-nav-link-container {
    display: flex;
    align-items: center;
    gap: 8rem;

    margin: 0 auto;
  }

  .active svg {
    stroke: none;
    fill: var(--color-white);
  }
`;

const DashboardLowerNav = () => {
  return (
    <DashboardLowerNavWrapper className="dashboard--lower-nav">
      <div className="dashboard--lower-nav-link-container">
        <NavLink
          to="/dashboard"
          end>
          <Home />
        </NavLink>
        <NavLink to="/dashboard/create-post">
          <Create />
        </NavLink>
        <NavLink to="/dashboard/messages">
          <Messages />
        </NavLink>
        <NavLink to="/dashboard/profile">
          <ProfilePicture
            width="3rem"
            height="3rem"
          />
        </NavLink>
      </div>
    </DashboardLowerNavWrapper>
  );
};

export default DashboardLowerNav;