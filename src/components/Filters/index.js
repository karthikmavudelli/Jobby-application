import './index.css'

const Filters = props => {
  const {employmentTypesList, salaryRangesList} = props

  const renderEmploymentTypesList = () =>
    employmentTypesList.map(eachItem => {
      const {label, employmentTypeId} = eachItem
      const {changeEmployeeType} = props
      const onChangeCheckBox = () => changeEmployeeType(employmentTypeId)
      return (
        <li className="employment-type-list-item" key={employmentTypeId}>
          <input
            type="checkbox"
            id={label}
            value={employmentTypeId}
            onChange={onChangeCheckBox()}
          />
          <label htmlFor={label} className="checkbox-label">
            {label}
          </label>
        </li>
      )
    })

  const renderEmploymentTypes = () => (
    <>
      <h1 className="types-of-employment">Types of Employment</h1>
      <ul className="employment-types-list">{renderEmploymentTypesList()}</ul>
    </>
  )

  return (
    <div className="filetrs">
      <hr />
      {renderEmploymentTypes()}
      <hr />
    </div>
  )
}

export default Filters
