import "./game.styles.css";
const Tile = ({ value }) => {
  return <div className="game-tile">{value || ""}</div>;
};
export default Tile;
