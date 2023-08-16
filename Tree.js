import { useState } from "react";

const Tree = ({ treeData = [], parendId, level = 0, onNodeClick }) => {
  const [item, setItem] = useState(
    treeData.sort((a, b) => (a.name > b.name ? 1 : -1))
  );

  // if (!item.length) return null;

  const handleParentClick = (e, m) => {
    e.stopPropagation();
    onNodeClick(m);
    setItem((p) => {
      return p.map((i) => {
        const checked = i.id === m.id ? !i.checked : i.checked;
        return {
          ...i,
          checked,
          name: checked ? i.name.toUpperCase() : i.name.toLowerCase()
        };
      });
    });
  };

  return (
    <>
      {item.map((m) => (
        <div
          style={{ padding: "10px" }}
          onClick={(e) => handleParentClick(e, m)}
        >
          {!m.checked ? (
            m.name
          ) : (
            <input
              value={m.name}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setItem((p) => p.map((p) => ({ ...p, checked: false })));
                }
              }}
              onChange={(e) => {
                setItem((p) => p.map((p) => ({ ...p, name: e.target.value })));
              }}
            />
          )}
          {m.children.length > 0 && m.checked && (
            <Tree
              treeData={m.children}
              parendId={m.id}
              level={level + 1}
              onNodeClick={onNodeClick}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default Tree;
