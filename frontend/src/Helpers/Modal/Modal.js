import { Container } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
`

const Inner = styled.div`
  max-width: 600px;
  width: 90%;
  height: 600px;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`

export default class Modal extends React.Component {
  constructor(props) {
    super(props)

    this.innerRef = React.createRef()
    this.state = {}
  }

  outsideClick = (e) => {
    const isClickInside = this.innerRef.current.contains(e.target)

    if (!isClickInside) {
      this.props.close()
    }
  }

  render() {
    const { props, outsideClick, innerRef } = this

    return (
      <ModalContainer onClick={outsideClick}>
        <Inner id="modal-inner" ref={innerRef}>
          <Close
            style={{
              color: 'black',
              opacity: 0.7,
              position: 'absolute',
              right: '15px',
              cursor: 'pointer',
              top: '15px',
            }}
            onClick={props.close}
          />
          {props.children}
        </Inner>
      </ModalContainer>
    )
  }
}
