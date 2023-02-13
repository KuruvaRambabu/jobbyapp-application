import './index.css'

const DisplayFilters = props => {
  const {type, onSelectEmploymentType} = props
  const {employmentTypeId, label} = type

  return (
    <li className="employment-type-container">
      <input
        onChange={onSelectEmploymentType}
        className="input-checkbox"
        type="checkbox"
        id={employmentTypeId}
      />
      <label className="checkbox-lable" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default DisplayFilters
