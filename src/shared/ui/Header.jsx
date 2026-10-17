import styled from "styled-components";
import DarkModeToggle from "./DarkModeToggle";


const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;


function Header() {
  return (
    <StyledHeader>
      <StyledHeaderMenu>
        <li>
          <DarkModeToggle />
        </li>
      </StyledHeaderMenu>
    </StyledHeader>
  );
}

export default Header;