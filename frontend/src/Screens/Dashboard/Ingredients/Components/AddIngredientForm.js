import React from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
} from "@material-ui/core";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  min-width: 300px;
  padding: 30px 20px;
  background: white;
  border-radius: 4px;
`;

export default class AddIngredientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unitType: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      unitType: event.target.value,
    });
  };

  render() {
    return (
      <FormContainer>
        <TextField id="outlined-basic" label="Name" variant="outlined" />
          <TextField id="outlined-basic" label="Quantity" variant="outlined" />
          <TextField id="outlined-basic" label="Price" variant="outlined" />
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Unit</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={this.state.unitType}
            onChange={this.handleChange}
            label="Unit"
          >
            <MenuItem value={10}>Milliliters</MenuItem>
            <MenuItem value={20}>Liters</MenuItem>
            <MenuItem value={30}>Cups</MenuItem>
            <MenuItem value={30}>Grams</MenuItem>
            <MenuItem value={30}>Oz</MenuItem>
          </Select>
        </FormControl>
      </FormContainer>
    );
  }
}
