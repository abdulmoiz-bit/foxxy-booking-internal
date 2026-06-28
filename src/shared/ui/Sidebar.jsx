import styled from "styled-components";
//import Logo from "../ui/Logo";
//import MainNav from "./MainNav";
//import Uploader from "../data/Uploader"
import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";


const StyledSidebar = styled.aside`
  background-color: var(--color-red-100);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;



function Sidebar() {
  return (
    <StyledSidebar>
      <nav>
           <NavList>
             <li>
               <StyledNavLink to="/">
                 <HiOutlineHome />
                 <span>Home</span>
               </StyledNavLink>
             </li>
             <li>
               <StyledNavLink to="/bookings">
                 <HiOutlineCalendarDays />
                 <span>Bookings</span>
               </StyledNavLink>
             </li>
             <li>
               <StyledNavLink to="/cabins">
                 <HiOutlineHomeModern />
                 <span>Cabins</span>
               </StyledNavLink>
             </li>
             <li>
               <StyledNavLink to="/users">
                 <HiOutlineUsers />
                 <span>Users</span>
               </StyledNavLink>
             </li>
             <li>
               <StyledNavLink to="/settings">
                 <HiOutlineCog6Tooth />
                 <span>Settings</span>
               </StyledNavLink>
             </li>
           </NavList>
         </nav>
    </StyledSidebar>
  );
}

export default Sidebar;
