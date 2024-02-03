import styled from "styled-components";

export const Header = function Header() {
  const handleClickLogo = () => {
    window.location.href = "https://prography.org/";
  };

  return (
    <HeaderContainer>
      <Logo src="/logo.png" onClick={handleClickLogo}></Logo>
    </HeaderContainer>
  );
};

const HeaderContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 8px 20px;
`;

const Logo = styled("img")`
  height: 40px;

  cursor: pointer;
`;
