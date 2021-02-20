import React from 'react'
import styled from 'styled-components'
import Ingredient from './Components/Ingredient'
import TableHeader from './Components/TableHeader'
import { Button } from '@material-ui/core'
import Modal from '../../../Helpers/Modal/Modal'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Container, Header, HeaderContent } from '../CommonStyledComponents'
import AddIngredientForm from './Components/AddIngredientForm'

const IngredientsList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
  overflow: auto;
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

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  -webkit-box-shadow: 2px 2px 30px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 2px 2px 30px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 30px 0px rgba(0, 0, 0, 0.1);
  height: 80%;
`

export default class IngredientsScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ingredients: [
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
        {
          name: 'ingredient',
          unit: 'ml',
          price: '10$',
          qty: 100,
        },
      ],
      openModal: false
    }
  }

  close = () => {
    this.setState({
      openModal: false
    })
  }

  open = () => {
    this.setState({
      openModal: true
    })
  }

  render() {
    return (<>
      <Container>
        <Header>
          <HeaderContent>
            <h3>Ingredients</h3>
            <p>View, add, edit and remove ingredients of all kinds.</p>
          </HeaderContent>
          <Button endIcon={<AddCircleIcon />} onClick={this.open}>New Ingredient</Button>
        </Header>
        <TableContainer>
          <TableHeader />
          <IngredientsList>
            {this.state.ingredients.map((ingredient) => {
              return <Ingredient data={ingredient} />
            })}
          </IngredientsList>
        </TableContainer>
      </Container>
      <Modal close={this.close} open={this.state.openModal}><AddIngredientForm/></Modal>
      </>
    )
  }
}
