import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

const List = styled.ul`
  display: flex;
  flex-direction: row;
`

const Element = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Nav>
        <List>
          <Element>
            <Link to="/">Home</Link>
          </Element>
          <Element>
            <Link to="/ingredients">Ingredients</Link>
          </Element>
          <Element>
            <Link to="/recipes">Recipes</Link>
          </Element>
          <Element>
            <Link to="/auth">Auth</Link>
          </Element>
        </List>
      </Nav>
    )
  }
}
