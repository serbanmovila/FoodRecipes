import React from 'react'
import Recipe from '../../Recipes/Components/Recipe'
import { connect } from 'react-redux'

class PickRecipes extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: this.props.recipes
        }
    }

    render() {
        return (
            <>
                {this.state.recipes.map((recipe) => {
                    ;<Recipe data={recipe} />
                })}
            </>
        )
    }
}

export default connect(
    (state) => ({
        recipes: state.recipes
    }),
    {}
)(PickRecipes)
