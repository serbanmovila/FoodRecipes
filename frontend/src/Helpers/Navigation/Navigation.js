import React from 'react'
import styled from 'styled-components'
import { Menu } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import img1 from '../../assets/images/1.jpg'
import img2 from '../../assets/images/2.jpg'
import img3 from '../../assets/images/3.jpg'
import img4 from '../../assets/images/4.jpg'
import img5 from '../../assets/images/5.jpg'
import img6 from '../../assets/images/6.jpg'
import img7 from '../../assets/images/7.jpg'

const NavContainer = styled.div`
  max-width: 300px;
  min-width: 250px;
  width: 20%;
  height: 100vh;
  align-items: center;
  background: white;
  -webkit-box-shadow: -3px -1px 6px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -3px -1px 6px 0px rgba(0, 0, 0, 0.75);
  box-shadow: -3px -1px 6px 0px rgba(0, 0, 0, 0.75);
  z-index: 2;
  background-size: cover;
  background-position: center;
`

const NavBgOverlay = styled.div`
  height: 100%;
  width: 100%;
  background: rgb(55, 59, 96, 0.76);
  display: flex;
  flex-direction: column;
`

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  button {
    border-radius: 0px;
    padding: 4% 0;
    color: rgba(255, 255, 255, 0.9);
    text-transform: none;
    letter-spacing: 1px;

    span {
      text-align: left;
      padding-left: 10%;
      display: flex;
      justify-content: flex-start;
    }

    :not(:first-child) {
      border-top: 1px solid rgba(0, 0, 0, 0.2);
    }

    &.active {
      background: rgba(0, 0, 0, 0.3);
    }
  }
`

const NavHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  font-family: 'Libre Baskerville', serif;
  font-style: italic;
  color: white;
  font-size: 130%;
  letter-spacing: 2px;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
  margin-left: 10%;
`

const MenuBtn = styled.span`
  display: none;
  cursor: pointer;
`

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const { screen } = this.props

    let bg,
      bgs = [img1, img2, img3, img4, img5, img6, img7]

    bg = bgs[Math.floor(Math.random() * 7)]

    return (
      <NavContainer
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <NavBgOverlay>
          <NavHeader>
            <Logo>FoodRecipes</Logo>
            <MenuBtn>
              <Menu />
            </MenuBtn>
          </NavHeader>
          <Nav>
            <List>
              <Button
                className={screen === 'ingredients' ? 'active' : ''}
                onClick={() => this.props.switchScreen('ingredients')}
              >
                Ingredients
              </Button>
              <Button
                className={screen === 'recipes' ? 'active' : ''}
                onClick={() => this.props.switchScreen('recipes')}
              >
                Recipes
              </Button>
              <Button
                className={screen === 'recommendations' ? 'active' : ''}
                onClick={() => this.props.switchScreen('recommendations')}
              >
                Get recommendation
              </Button>
            </List>
          </Nav>
        </NavBgOverlay>
      </NavContainer>
    )
  }
}
