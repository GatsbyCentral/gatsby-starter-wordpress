import React, {Component} from 'react'
import styled from 'styled-components'
import {siteLogo} from '../../../data/SiteConfig'

class Logo extends Component {

  render() {
    return (
      <LogoContainer>
        <img id='nav-logo' src={siteLogo} alt="logo"/>
      </LogoContainer>
    )
  }
}

export default Logo

const LogoContainer = styled.div`
  & img {
    width: 50px;
  }
`