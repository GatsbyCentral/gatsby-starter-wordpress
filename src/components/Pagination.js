import React from 'react'
import { Link } from 'gatsby'

const Pagination = ({ pageContext, pathPrefix }) => {
  const { currentPage, numPages } = pageContext
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === numPages
  const prevPage = currentPage === 2 ? `/` : `/page/${currentPage - 1}`
  const nextPage = `/page/${currentPage + 1}`
  const endSize = 1
  const midSize = 1
  let dots = false

  return (
    <nav className="pagination" role="navigation">
      <div className="navbar navbar-menu">
        {!isFirstPage && (
          <div className="navbar-item">
            <Link to={prevPage} rel="prev">
              Previous
            </Link>
          </div>
        )}
        {Array.from({ length: numPages }, (_, i) => {
          const index = i + 1
          const printLink =
            index <= endSize ||
            (index >= currentPage - midSize &&
              index <= currentPage + midSize) ||
            index > numPages + endSize
          let navItem

          if (index === currentPage) {
            dots = true
            navItem = (
              <div className="navbar-item" key={index}>
                <span aria-current="page" className="current">
                  {index}
                </span>
              </div>
            )
          } else if (printLink) {
            dots = true
            navItem = (
              <div className="navbar-item" key={index}>
                <Link
                  to={i === 0 ? `/${pathPrefix}` : `/${pathPrefix}/${index}`}
                >
                  {index}
                </Link>
              </div>
            )
          } else if (dots) {
            dots = false
            navItem = (
              <div className="navbar-item" key={index}>
                <span className="dots">&hellip;</span>
              </div>
            )
          }
          return navItem
        })}
        {!isLastPage && (
          <div className="navbar-item">
            <Link to={nextPage} rel="next">
              Next
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Pagination
