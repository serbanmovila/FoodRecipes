import React from 'react'
import {
    MenuItem,
    Select,
    Chip,
    TextField,
    Button,
    FormControl,
    InputLabel
} from '@material-ui/core'
import { addRecipe, getRecipes } from '../Controllers/RecipeActions'
import { connect } from 'react-redux'
import styled from 'styled-components'

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    min-width: 300px;
    max-height: 500px;
    overflow-y: auto;
    padding: 30px 20px;
    background: white;
    border-radius: 4px;

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

class AddRecipeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            unitType: '',
            ingredients: [],
            types: '',
            name: '',
            preparare: '',
            recomandare: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            unitType: event.target.value
        })
    }

    updateValue = (type, content) => {
        switch (type) {
            case 'name':
                this.setState({
                    name: content
                })
                break
            case 'preparare':
                this.setState({
                    preparare: content
                })
                break
            case 'type':
                this.setState({
                    type: content
                })
                break
            case 'recomandare':
                this.setState({
                    recomandare: content
                })
        }
    }

    clearForm = () => {
        this.setState({
            name: '',
            qty: ''
        })
        this.props.getIngredients()
        this.props.close()
    }

    sendRecipe = () => {
        this.props.addIngredient(
            {
                name: this.state.name,
                qty: this.state.qty
            },
            this.clearForm
        )
    }

    handleIngredientsChange = (e) => {
        this.setState({
            ingredients: e.target.value
        })
    }

    render() {
        const { ingredients } = this.props
        return (
            <FormContainer>
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    onChange={(e) => {
                        this.updateValue('name', e.target.value)
                    }}
                    style={{
                        marginBottom: '20px'
                    }}
                />
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                        Ingredients
                    </InputLabel>
                    <Select
                        label="Ingredients"
                        variant="outlined"
                        multiple
                        onChange={this.handleIngredientsChange}
                        renderValue={(selected) => (
                            <div>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}
                        value={this.state.ingredients}
                        style={{
                            marginBottom: '20px'
                        }}
                    >
                        {ingredients.map((ingredient) => {
                            return (
                                <MenuItem
                                    key={ingredient.id}
                                    value={ingredient.name}
                                    selected={
                                        this.state.ingredients.indexOf(
                                            ingredient.name
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                >
                                    {ingredient.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">
                        Recipe type
                    </InputLabel>
                    <Select
                        label="Recipe type"
                        variant="outlined"
                        onChange={(e) => {
                            this.updateValue('type', e.target.value)
                        }}
                        value={this.state.type}
                        style={{
                            marginBottom: '20px'
                        }}
                    >
                        <MenuItem
                            value={'gustare'}
                            selected={
                                this.state.types === 'gustare' ? true : false
                            }
                        >
                            Gustare
                        </MenuItem>
                        <MenuItem
                            value={'aperitiv'}
                            selected={
                                this.state.types === 'aperitiv' ? true : false
                            }
                        >
                            Aperitiv
                        </MenuItem>
                        <MenuItem
                            value={'fel principal'}
                            selected={
                                this.state.types === 'fel principal'
                                    ? true
                                    : false
                            }
                        >
                            Fel principal
                        </MenuItem>
                        <MenuItem
                            value={'desert'}
                            selected={
                                this.state.types === 'desert' ? true : false
                            }
                        >
                            Desert
                        </MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="outlined-basic"
                    label="Preparare"
                    variant="outlined"
                    onChange={(e) => {
                        this.updateValue('preparare', e.target.value)
                    }}
                    style={{
                        marginBottom: '20px'
                    }}
                    multiline
                />
                <TextField
                    id="outlined-basic"
                    label="Recomandari"
                    variant="outlined"
                    onChange={(e) => {
                        this.updateValue('recomandare', e.target.value)
                    }}
                    style={{
                        marginBottom: '20px'
                    }}
                    multiline
                />
                <Button variant="outlined" onClick={this.sendIngredient}>
                    Add Recipe
                </Button>
            </FormContainer>
        )
    }
}
export default connect((state) => ({ ...state }), {
    addRecipe,
    getRecipes
})(AddRecipeForm)