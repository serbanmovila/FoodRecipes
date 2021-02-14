import React from 'react'
import Modal from './../../Helpers/Modal/Modal'
import Header from './../../Helpers/Header/Header'
import styled from 'styled-components'
import bg from './../../assets/images/lp-bg.jpg'
import { constants as c } from './../../Helpers/Constants'
import { Kitchen, MenuBook, Fastfood } from '@material-ui/icons'
import { Button, TextField } from '@material-ui/core'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding-top: ${c.navHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  & > div:not(:first-child) {
    border-left: 1px solid rgba(255, 255, 255, 0.7);
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33.3%;

  h3 {
    color: white;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 500;
    font-size: 1.6vw;
    max-width: 250px;
  }

  svg {
    color: white;
    width: 50px;
    height: auto;
  }
`

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  background: #eee;
  margin-top: 50px;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`

const Tab = styled.div`
  width: 50%;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  p {
    font-family: 'Source Sans Pro', sans-serif;
  }

  &.selected,
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;

  & > div {
    margin: 10px auto;
  }
`

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      formType: 'login',
    }
  }

  close = () => {
    this.setState({ modal: false })
  }

  open = (type) => {
    this.setState({ modal: true, formType: type })
  }

  switchTab = () => {
    this.setState({
      formType: this.state.formType === 'login' ? 'signup' : 'login',
    })
  }

  render() {
    const { close, open } = this
    return (
      <>
        <Header openModal={open} />
        <Container>
          <InnerContainer>
            {this.state.modal && (
              <Modal close={close}>
                <Tabs>
                  <Tab
                    style={{
                      borderRight: '1px solid rgba(0,0,0,0.3)',
                    }}
                    className={
                      this.state.formType === 'login' ? 'selected' : ''
                    }
                    onClick={this.switchTab}
                  >
                    <p>Log in</p>
                  </Tab>
                  <Tab
                    onClick={this.switchTab}
                    className={
                      this.state.formType === 'signup' ? 'selected' : ''
                    }
                  >
                    <p>Sign up</p>
                  </Tab>
                </Tabs>
                <Form>
                  {this.state.formType === 'login' ? (
                    <>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                      />
                      <Button
                        variant="outlined"
                        size="large"
                        style={{ width: '100%', marginTop: '30px' }}
                      >
                        Log in
                      </Button>
                    </>
                  ) : (
                    <>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                      />
                      <TextField
                        id="outlined-basic"
                        label="Confirm password"
                        variant="outlined"
                      />
                      <Button
                        variant="outlined"
                        size="large"
                        style={{ width: '100%', marginTop: '30px' }}
                      >
                        Sign up
                      </Button>
                    </>
                  )}
                </Form>
              </Modal>
            )}
            <ContentContainer>
              <Content>
                <Box>
                  <Kitchen />
                  <h3>Keep track of your ingredients</h3>
                </Box>
                <Box>
                  <MenuBook />
                  <h3>Keep track of your recipes</h3>
                </Box>
                <Box>
                  <Fastfood />
                  <h3>Get recipe recommendations based on what you like</h3>
                </Box>
              </Content>
            </ContentContainer>
            <Button
              variant="contained"
              style={{
                color: 'black',
                marginTop: '7%',
              }}
              size="large"
              onClick={() => {
                open('login')
              }}
            >
              Sign up
            </Button>
          </InnerContainer>
        </Container>
      </>
    )
  }
}
