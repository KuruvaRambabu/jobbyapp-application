import './index.css'

const SalaryRangeFilter = props => {
  const {salary, onChangeSalaryRange} = props
  const {salaryRangeId, label} = salary

  return (
    <li className="salary-type-container">
      <input
        onChange={onChangeSalaryRange}
        type="radio"
        name="Salary"
        id={salaryRangeId}
      />
      <label className="radio-lable" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeFilter
