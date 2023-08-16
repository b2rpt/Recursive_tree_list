import "./styles.css";
import data from "../assets/data.json";
import Tree from "../Tree";

export default function App() {
  const generateCheckboxTree = (data, id = "") => {
    return data
      .filter((f) => f.parentId === id)
      .map((item) => ({
        ...item,
        checked: false,
        children: generateCheckboxTree(data, item ? item.id : null)
      }));
  };
  // console.log(generateCheckboxTree(data.geoData, ""));
  const data1 = generateCheckboxTree(data.geoData, "");

  const handleNodeClick = (n) => {
    console.log("node", n);
  };

  return (
    <>
      <Tree treeData={data1} parendId="" onNodeClick={handleNodeClick} />
    </>
  );
}
