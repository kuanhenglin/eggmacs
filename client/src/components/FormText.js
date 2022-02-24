// outputs a table row (label + input) for a form-like component
// forms are structured as tables for alignment
function formRow(type, label, value, placeholder, onChange, onKeyPress) {
  // use type: "file" in formEntries for entries that are input files
  if (type === "file") return (
    <tr className="form-row" key={label}>
      <td><label className="form-label">{label}</label></td>
      <td className="form-input-cell"><input
        className="form-input"
        type="file"
        onChange={(e) => onChange(e.target.files[0])}
        onKeyPress={(e) => onKeyPress(e.key)}
      /></td>
    </tr>
  );
  // normal inputs (text)
  return (
    <tr className="form-row" key={label}>
      <td><label className="form-label">{label}</label></td>
      <td className="form-input-cell"><input
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => onKeyPress(e.key)}
        placeholder={placeholder}
      /></td>
    </tr>
  )
}


function FormText(props) {
  return (
    <div>
      <table className="form-table"><tbody>
        {/* for input formEntries, each item/entry contains
              input type (null = text, "file" = upload file)
              label (text on the left to be displayed)
              value (can be null, for controlled components such as profile,
              i.e., inputs with default/pre-filled-in values, not applicable for
              type="file")
              placeholder (placeholder text inside the input box,
              not applicable for type="file")
              onChange (function to update the value of the input)
              onKeyPress (function to capture a key press, typically for Enter
              keys to trigger the button onClick function)
            map each entry to a row in the form table */}
        {props.formEntries.map(entry => {
          return (
            formRow(
              entry.type,
              entry.label,
              entry.value,
              entry.placeholder,
              entry.onChange,
              entry.onKeyPress
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