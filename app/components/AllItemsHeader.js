import React from 'react'

const AllItemsHeader = props => {
  return (
    <div className="fade">
      <div className="all-items-header">
        <div className="row">
          <div className="card horizontal">
            {props.labels.map(label => (
              <div className="col m3 card-section card-border" key={label}>
                <div>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllItemsHeader
