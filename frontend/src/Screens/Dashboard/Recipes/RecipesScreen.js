import React from 'react'
import { Button } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Container, Header, HeaderContent } from '../CommonStyledComponents'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Recipe from './Components/Recipe'
import Modal from '../../../Helpers/Modal/Modal'
import AddRecipeForm from './Components/AddRecipeForm'

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

class RecipesScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
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
        return (
            <>
                <Container>
                    <Header>
                        <HeaderContent>
                            <h3>Recipes</h3>
                            <p>
                                View, add, edit and remove recipes of all kinds.
                            </p>
                        </HeaderContent>
                        <Button endIcon={<AddCircleIcon />} onClick={this.open}>
                            New Recipe
                        </Button>
                    </Header>
                    <RecipesListing>
                        {this.props.recipes.map((recipe) => {
                            return <Recipe data={recipe} />
                        })}
                    </RecipesListing>
                </Container>
                <Modal close={this.close} open={this.state.openModal}>
                    <AddRecipeForm close={this.close} />
                </Modal>
            </>
        )
    }
}

export default connect(
    (state) => ({
        recipes: state.recipes,
        token: state.token
    }),
    {}
)(RecipesScreen)
