import React from "react";
import HomeOutlineIcon from "./HomeOutlineIcon";
import HomeFillIcon from "./HomeFillIcon";
import AlbumOutlineIcon from "./AlbumOutlineIcon";
import AlbumFillIcon from "./AlbumFillIcon";
import UserOutlineIcon from "./UserOutlineIcon";
import UserFillIcon from "./UserFillIcon";

const NavBarIcon = ({ name, ...props }: NavBarProps) => {
  let Icon = HomeOutlineIcon;
  switch (name) {
    case "home-fill":
      Icon = HomeFillIcon;
      break;
    case "album-outline":
      Icon = AlbumOutlineIcon;
      break;
    case "album-fill":
      Icon = AlbumFillIcon;
      break;
    case "user-outline":
      Icon = UserOutlineIcon;
      break;
    case "user-fill":
      Icon = UserFillIcon;
      break;
    default:
      Icon = HomeOutlineIcon;
      break;
  }
  return <Icon {...props}></Icon>;
};
export interface NavBarProps {
  width: number;
  height: number;
  name?: string;
  darkMode?: boolean;
}
export default NavBarIcon;
