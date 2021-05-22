import React from 'react'
import PickMeal from './Components/PickMeal'
import PickRecipes from './Components/PickRecipes'
import { Container, Header, HeaderContent } from '../CommonStyledComponents'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import ScoreRecipes from './Components/ScoreRecipes'
import Modal from '../../../Helpers/Modal/Modal'
import styled from 'styled-components'
import Recipe from '../Recipes/Components/Recipe'
import { getRecipes } from '../Recipes/Controllers/RecipeActions'

const InnerModal = styled.div`
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 4px;
    padding: 3%;
    align-items: center;
    width: 400px;
`

class RecommendationsScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            phase: 1,
            selected: []
        }
    }

    pick = (type) => {
        this.setState({
            phase: 2,
            type: type
        })
    }

    setSelection = (recipes) => {
        this.setState({
            selected: recipes
        })
    }

    score = () => {
        this.setState({
            phase: 3
        })
    }

    close = () => {
        this.setState({
            modal: false
        })
    }

    submit = () => {
        this.setState({
            modal: true,
            recommendation: this.props.recipes[0]
        })
    }

    componentDidMount() {
        this.props.getRecipes()
    }

    render() {
        const { phase } = this.state

        return (
            <Container>
                <Header>
                    <HeaderContent>
                        <h3>Get recommendation</h3>
                        <p>
                            {phase === 1 && 'Step 1: Pick a meal'}
                            {phase === 2 &&
                                'Step 2: Select three different recipes'}
                            {phase === 3 &&
                                'Step 3: Give each of them a score from 1 to 100'}
                        </p>
                    </HeaderContent>
                    {phase === 2 && this.state.selected.length === 3 && (
                        <Button onClick={this.score}>Score them</Button>
                    )}
                    {phase === 3 && (
                        <Button onClick={this.submit}>Get recipe</Button>
                    )}
                </Header>
                {phase === 1 && <PickMeal pick={this.pick} />}
                {phase === 2 && (
                    <PickRecipes
                        type={this.state.type}
                        setSelection={this.setSelection}
                    />
                )}
                {phase === 3 && <ScoreRecipes selected={this.state.selected} />}
                <Modal close={this.close} open={this.state.modal}>
                    <InnerModal>
                        <h3>Your best recipe is:</h3>
                        <Recipe
                            scoring={true}
                            highlight={true}
                            data={this.state.recommendation}
                        />
                    </InnerModal>
                </Modal>
            </Container>
        )
    }
}

export default connect(
    (state) => ({
        recipes: state.recipes
    }),
    { getRecipes }
)(RecommendationsScreen)
