import { NavLink } from "react-router-dom";
import { useContext } from "react";

import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import HomeIcon from "../icons/HomeIcon";
import CreateIcon from "../icons/CreateIcon";
import SearchIcon from "../icons/SearchIcon";
import DashboardLowerNavWrapper from "../../../assets/styles/pages/dashboard/DashboardLowerNavWrapper";
import { AppContext } from "../../../App";

const DashboardLowerNav = () => {
  const { userId, userProfilePictureUrl } = useContext(AppContext);

  return (
    <DashboardLowerNavWrapper>
      <div className="lower-nav--links-container">
        <NavLink
          to="/dashboard"
          end>
          <HomeIcon
            fill="var(--color-white)"
            stroke="none"
            width="3rem"
            height="3rem"
          />
        </NavLink>
        <NavLink to="/dashboard/search">
          <SearchIcon
            fill="var(--color-white)"
            stroke="none"
            width="3rem"
            height="3rem"
          />
        </NavLink>
        <NavLink to="/dashboard/create-post">
          <CreateIcon
            fill="var(--color-white)"
            stroke="none"
            width="3rem"
            height="3rem"
          />
        </NavLink>
        <NavLink to={`/dashboard/profile/${userId}`}>
          <ProfilePicture
            width="2.6rem"
            height="2.6rem"
            profilePictureUrl={userProfilePictureUrl}
          />
        </NavLink>
      </div>
    </DashboardLowerNavWrapper>
  );
};

export default DashboardLowerNav;
