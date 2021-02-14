import styled from 'styled-components'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { IconButton } from '@material-ui/core'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;

  & > button {
    height: 45px !important;
    width: 45px !important;
    align-self: center;

    &.delete-btn {
      .delete-full {
        display: none;
        color: #ff5353;
      }

      &:hover {
        .delete {
          display: none;
        }
        .delete-full {
          display: block;
        }
      }
    }
  }

  &::after {
    content: '';
    height: 100%;
    max-height: 1px;
    background: #efeff7;
    display: block;
    position: absolute;
    bottom: 0;
    width: 96%;
    left: 50%;
    transform: translateX(-50%);
  }
`

const Cell = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  text-align: left;
  padding: 1.5% 2%;

  &.ingredient-name {
    width: 40%;
    font-weight: 500;
  }

  &.ingredient-qty,
  &.ingredient-unit,
  &.ingredient-price {
    width: 15%;
    justify-content: center;
  }
`

export default function Ingredient(props) {
  const { name, qty, unit, price } = props.data
  return (
    <Row>
      <Cell className="ingredient-name">{name}</Cell>
      <Cell className="ingredient-qty">{qty}</Cell>
      <Cell className="ingredient-unit">{unit}</Cell>
      <Cell className="ingredient-price">{price}</Cell>
      <IconButton aria-label="edit" className="edit-btn">
        <EditIcon />
      </IconButton>
      <IconButton aria-label="delete" className="delete-btn">
        <DeleteIcon className="delete-full" />
        <DeleteOutlineIcon className="delete" />
      </IconButton>
    </Row>
  )
}
