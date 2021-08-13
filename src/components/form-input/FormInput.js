import './forminput.scss';
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      <label className={`${otherProps.value.length > 0 ? 'shrink' : ''} form-input-label `} htmlFor={otherProps.id}>
        {label}
      </label>
    </div>
  );
};
export default FormInput;
