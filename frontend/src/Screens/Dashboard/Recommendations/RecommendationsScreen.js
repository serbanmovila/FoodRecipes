import React from 'react'
import PickMeal from './Components/PickMeal'
import PickRecipes from './Components/PickRecipes'
import { Container, Header, HeaderContent } from '../CommonStyledComponents'
import { Button } from '@material-ui/core'

export default class RecommendationsScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            phase: 1
        }
    }

    pick = (type) => {
        console.log(type)
        this.setState({
            phase: 2,
            type: type
        })
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
                                'Step 1: Select three different recipes'}
                        </p>
                    </HeaderContent>
                    {phase === 2 && (
                        <Button onClick={this.open}>New Ingredient</Button>
                    )}
                </Header>
                {phase === 1 && <PickMeal pick={this.pick} />}
                {phase === 2 && <PickRecipes />}
            </Container>
        )
    }
}
