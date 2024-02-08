import "./SwitchButton.css";

function SwitchButton(props) {
  const { favoriteNoteCheckboxHandler } = props;
  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={(event) => favoriteNoteCheckboxHandler(event)}
      />
      <span className="slider round"></span>
    </label>
  );
}
export default SwitchButton;
