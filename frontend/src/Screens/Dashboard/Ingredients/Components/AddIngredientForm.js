import React from 'react'
import {
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    TextField,
    Button
} from '@material-ui/core'
import {
    addIngredient,
    getIngredients,
    updateIngredient
} from '../Controllers/IngredientsActions'
import { connect } from 'react-redux'
import styled from 'styled-components'

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    min-width: 300px;
    padding: 30px 20px;
    background: white;
    border-radius: 4px;
`

class AddIngredientForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            unitType: ''
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
            case 'qty':
                this.setState({
                    qty: content
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

    sendIngredient = () => {
        this.props.addIngredient(
            {
                name: this.state.name,
                qty: this.state.qty
            },
            this.clearForm
        )
    }

    render() {
        return (
            <FormContainer>
                <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    onChange={(e) => {
                        this.updateValue('name', e.target.value)
                    }}
                />
                <TextField
                    id="outlined-basic"
                    label="Quantity"
                    variant="outlined"
                    onChange={(e) => {
                        this.updateValue('qty', e.target.value)
                    }}
                />
                <Button variant="outlined" onClick={this.sendIngredient}>
                    Add Ingredient
                </Button>
            </FormContainer>
        )
    }
}
export default connect((state) => ({ ...state }), {
    addIngredient,
    getIngredients
})(AddIngredientForm)
