import React from 'react'
import { Link } from 'gatsby'

const Pagination = ({ pageContext, endSize = 1, midSize = 1 }) => {
  const {
    previousPagePath,
    nextPagePath,
    numberOfPages,
    humanPageNumber,
  } = pageContext
  let dots = false

  return (
    <nav className="pagination" role="navigation">
      <div className="navbar navbar-menu">
        {previousPagePath && (
          <div className="navbar-item">
            <Link to={previousPagePath} rel="prev">
              Previous
            </Link>
          </div>
        )}
        {Array.from({ length: numberOfPages }, (_, i) => {
          const index = i + 1
          const renderLink =
            index <= endSize ||
            (index >= humanPageNumber - midSize &&
              index <= humanPageNumber + midSize) ||
            index > numberOfPages - endSize
          let NavItem = null
          if (index === humanPageNumber) {
            dots = true
            NavItem = (
              <div className="navbar-item" key={`page-${index}`}>
                <span aria-current="page" className="current">
                  {index}
                </span>
              </div>
            )
          } else if (renderLink) {
            dots = true
            NavItem = (
              <div className="navbar-item" key={`page-${index}`}>
                <Link to={i === 0 ? `/` : `/${index}`}>{index}</Link>
              </div>
            )
          } else if (dots) {
            dots = false
            NavItem = (
              <div className="navbar-item" key={`page-${index}`}>
                <span className="dots">&hellip;</span>
              </div>
            )
          }
          return NavItem
        })}
        {nextPagePath && (
          <div className="navbar-item">
            <Link to={nextPagePath} rel="next">
              Next
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Pagination
