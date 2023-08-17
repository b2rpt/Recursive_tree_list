const Icon = ({ onIconClick }) => {
    console.log("onClick", onIconClick);
    return <span onClick={onIconClick}>#i</span>; // can we add click event on div [asseiblility]  );
  };
  export default Icon;
  