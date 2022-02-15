function SearchText(props) {
  return (
    <div>
      <input
        className="search-input"
        type="text"
        onChange={(e) => props.text.onChange(e.target.value)}
        onKeyPress={(e) => props.text.onKeyPress(e.key)}
        placeholder={props.text.placeholder}
      />

      <select
        className="search-select"
        onChange={(e) => props.select.onChange(e.target.value)}
      >
        {props.select.options.map(option => {
          return(
            <option
              value={option.value}
              key={option.value}
            >
              {option.label}
            </option>
          )
        })}
      </select>
      
      <button
        className="search-button"
        onClick={() => props.button.onClick()}
      >
        {props.button.label}
      </button>
    </div>
  );
}

export default SearchText;