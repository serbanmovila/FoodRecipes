import React from 'react'
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Container, Header, HeaderContent } from '../CommonStyledComponents'
import styled from 'styled-components'
import Recipe from './Components/Recipe'

const RecipesListing = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 80%;
  overflow: auto;
  align-self: flex-end;
  /* width */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`

export default class RecipesScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      recipes: [
        {
          name: 'Supă cremă de chestii',
          time: '2h',
          difficulty: 6,
          price: 89.4,
        },
        {
          name: 'Supă cremă de chestii',
          time: '2h',
          difficulty: 6,
          price: 89.4,
        },
        {
          name: 'Supă cremă de chestii',
          time: '2h',
          difficulty: 6,
          price: 89.4,
        },
        {
          name: 'Supă cremă de chestii',
          time: '2h',
          difficulty: 6,
          price: 89.4,
        },
        {
          name: 'Supă cremă de chestii',
          time: '2h',
          difficulty: 6,
          price: 89.4,
        },
        {
          name: 'Supă cremă de chestii',
          time: '2h',
          difficulty: 6,
          price: 89.4,
        },
        {
          name: 'Supă cremă de chestii',
          time: '2h',
          difficulty: 6,
          price: 89.4,
        },
        {
          name: 'Supă cremă de chestii',
          time: '2h',
          difficulty: 6,
          price: 89.4,
        },
        {
          name: 'Supă cremă de chestii',
          time: '2h',
          difficulty: 6,
          price: 89.4,
        },
        {
          name: 'Supă cremă de chestii',
          time: '2h',
          difficulty: 6,
          price: 89.4,
        },
        {
          name: 'Supă cremă de chestii',
          time: '2h',
          difficulty: 6,
          price: 89.4,
        },
        {
          name: 'Supă cremă de chestii',
          time: '2h',
          difficulty: 6,
          price: 89.4,
        },
      ],
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <h3>Recipes</h3>
            <p>View, add, edit and remove recipes of all kinds.</p>
          </HeaderContent>
          <Button endIcon={<AddCircleIcon />}>New Recipe</Button>
        </Header>
        <RecipesListing>
          {this.state.recipes.map((recipe) => {
            return <Recipe data={recipe} />
          })}
        </RecipesListing>
      </Container>
    )
  }
}
