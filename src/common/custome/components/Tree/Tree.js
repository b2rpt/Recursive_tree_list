import { useState } from "react";
import Icon from "./Icon";

const Tree = ({
  treeData = [],
  parendId,
  level = 0,
  onNodeClick,
  currentItem,
}) => {
  const [item, setItem] = useState(
    treeData.sort((a, b) => (a.name > b.name ? 1 : -1))
  );

  const [isEditable, setIsEdiatble] = useState(false);

  const handleParentClick = (e, m) => {
    e.stopPropagation();
    onNodeClick(m);
    setIsEdiatble(false);
    setItem((p) => {
      return p.map((i) => {
        const checked = i.id === m.id ? !i.checked : i.checked;
        return {
          ...i,
          checked,
          name: checked ? i.name.toUpperCase() : i.name.toLowerCase(),
        };
      });
    });
  };

  const handleIconClick = (e) => {
    e.stopPropagation();
    setIsEdiatble((p) => !p);
  };

  return (
    <>
      {item.map((m) => (
        <div
          key={m.id}
          style={{ padding: "10px" }}
          onClick={(e) => handleParentClick(e, m)}
        >
          {!(isEditable && m.checked) ? (
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
                setItem((p) =>
                  p.map((p) => ({
                    ...p,
                    name: m.id === p.id ? e.target.value : p.name,
                  }))
                );
              }}
            />
          )}
          {m.checked && m.id === currentItem?.id ? (
            <Icon onIconClick={(e) => handleIconClick(e)} />
          ) : (
            ""
          )}
          {m.children.length > 0 && m.checked && (
            <Tree
              treeData={m.children}
              parendId={m.id}
              level={level + 1}
              onNodeClick={onNodeClick}
              currentItem={currentItem}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default Tree;
