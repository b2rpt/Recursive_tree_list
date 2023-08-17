import "./styles.css";
import data from "./assets/data.json";
import Tree from "./common/custome/components/Tree/Tree";
import { useState } from "react";
export default function App() {
  const [currentItem, setCurrentItem] = useState({});
  const generateCheckboxTree = (data, id = "") => {
    return data
      .filter((f) => f.parentId === id)
      .map((item) => ({
        ...item,
        checked: false,
        children: generateCheckboxTree(data, item ? item.id : null),
      }));
  };
  // console.log(generateCheckboxTree(data.geoData, ""));
  const data1 = generateCheckboxTree(data.geoData, "");

  const handleNodeClick = (n) => {
    console.log("node", n);
    setCurrentItem({ ...n, checked: !n.checked });
  };

  return (
    <>
      <Tree
        treeData={data1}
        parendId=""
        onNodeClick={handleNodeClick}
        currentItem={currentItem}
      />
    </>
  );
}
