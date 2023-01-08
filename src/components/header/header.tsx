
import { AppRoute } from '../app/app';
import Search from '../search/search';
import { SVG } from '../svg/svg';
import { HeaderContainer, HeaderEl, HeaderNav, LogoLink, LogoNavWrapper, LogoSVGContainer, NavLi, NavList } from './header.style';


export default function Header() {
  return (
    <HeaderEl>
      <HeaderContainer>
        <LogoNavWrapper>
          <LogoLink to={AppRoute.Films}>
            Kinopoisk&nbsp;<LogoSVGContainer><SVG name='logo'/></LogoSVGContainer>&nbsp;API
          </LogoLink>

          <HeaderNav>
            <NavList>
              <NavLi>
                <LogoLink to={AppRoute.Films}>
                  Главная
                </LogoLink>
              </NavLi>

              <NavLi>
                <LogoLink to={AppRoute.Watched}>
                  Посмотренные
                </LogoLink>
              </NavLi>
            </NavList>
          </HeaderNav>
        </LogoNavWrapper>

        <Search/>

      </HeaderContainer>
    </HeaderEl>
  );}

