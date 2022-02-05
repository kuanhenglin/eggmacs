function formRow(label, placeholder, onChange) {
  return (
    <tr className="form-row" key={label}>
      <td><label className="form-label">{label}</label></td>
      <td><input
        className="form-input"
        type="text"
        onChange={onChange}
        placeholder={placeholder}
      /></td>
    </tr>
  )
}


function FormText(props) {
  return (
    <div>
      <table className="form-table"><tbody>
        {props.formEntries.map(entry => {
          return (
              formRow(
                entry.label,
                entry.placeholder,
                (e) => entry.onChange(e.target.value)
              )
          )
        })}
      </tbody></table>

      <div className="form-button">
        <button onClick={() => props.onClick()}>
          {props.buttonText}
        </button>
      </div>
    </div>
  )
}


export default FormText;