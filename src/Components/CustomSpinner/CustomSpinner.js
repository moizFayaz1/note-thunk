import "./CustomSpinner.css";

function CustomSpinner(props) {
  const { loading = false } = props;

  if (!loading) {
    return null;
  }
  
  return (
    <div className="loading">
      <div className="loader"></div>
    </div>
  );
}
export default CustomSpinner;
