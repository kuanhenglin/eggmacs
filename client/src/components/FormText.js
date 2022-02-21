// outputs a table row (label + input) for a form-like component
// forms are structured as tables for alignment
function formRow(label, value, placeholder, pw, onChange, onKeyPress) {
  return (
    <tr className="form-row" key={label}>
      <td><label className="form-label">{label}</label></td>
      <td className="form-input-cell"><input
        className="form-input"
        type={pw?"password":"text"}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
      /></td>
    </tr>
  )
}


function FormText(props) {
  return (
    <div>
      <table className="form-table"><tbody>
        {/* for input formEntries, each item/entry contains the label text,
            placeholder text, and onChange function: map each entry to a row
            in the form table */}
        {props.formEntries.map(entry => {
          return (
              formRow(
                entry.label,
                entry.value,
                entry.placeholder,
                entry.label == "Password",
                (e) => entry.onChange(e.target.value),
                (e) => entry.onKeyPress(e.key)
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