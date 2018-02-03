import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { siteTitle } from '../../../../data/SiteConfig'
import Logo from '../../Accessories/Logo'

class TopNavigation extends Component {
  buildPageNodes() {
    const { pages } = this.props
    let pageNodes = []

    pages.edges.forEach(page => {
      pageNodes.push({
        name: page.node.title,
        pagePath: `/${page.node.slug}`,
        id: page.node.id
      })
    })
    return pageNodes
  }

  render() {
    const links = this.buildPageNodes()
    return (
      <NavigationContainer>
        <TitleSection>
          <Link to="/">
            <Logo />
          </Link>
          <Link to="/">
            <h3>{siteTitle}</h3>
          </Link>
        </TitleSection>
        <NavList>
          {links.map(node => (
            <li key={node.id}>
              <a href={node.pagePath}>{node.name}</a>
            </li>
          ))}
        </NavList>
      </NavigationContainer>
    )
  }
}

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
  padding: 10px 100px;
  background: #9d7cbf;
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h3 {
    font-size: 2.5rem;
  }

  div {
    margin-right: 10px;
  }
`

const NavList = styled.ul`
  display: flex;

  li {
    margin-left: 50px;
  }

  li a {
    font-size: 2rem;
  }
`

export default TopNavigation
