import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';

const Input = ({id, name, type, label, disabled, value, placeholder, onChange, autoFocus, errorMessage, error, ...rest}) => {
  const [values, setValues] = useState(value);
  const onHandleChange = (e) => {
    setValues(e.target.value);
    onChange(e.target.id, e.target.value)
  }

  useEffect(() => {
    setValues(value);
  }, [value]);
  
  return (
     type === 'date' ?
     <TextField
        id={id}
        label={label}
        type="date"
        fullWidth
        error={error}
        value={values}
        helperText={error ? errorMessage : ''}
        variant="outlined"
        disabled={disabled}
        onChange={onHandleChange}
        autoComplete={name}
        autoFocus={autoFocus}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{inputProps: { min: "1900-05-01", max: "2020-01-01"} }}
      />  :
      <TextField
        value={values}
        type={type || 'text'}
        placeholder={placeholder}
        error={error}
        helperText={error ? errorMessage : ''}
        disabled={disabled}
        variant="outlined"
        fullWidth
        id={id}
        label={label}
        name={name}
        onChange={onHandleChange}
        autoComplete={name}
        autoFocus={autoFocus}
        />
  )
}


export default Input;
