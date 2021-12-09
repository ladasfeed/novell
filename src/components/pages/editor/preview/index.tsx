import { useEffect, useState } from "react";
import styles from "./index.module.css";

export const Preview = ({ tree }: { tree: Array<any> }) => {
  const [current, setCurrent] = useState(tree[0]);

  useEffect(() => {
    setCurrent(tree[0]);
  }, [tree]);

  const next = () => {
    setCurrent(tree.find((node: any) => current.next == node.id));
  };

  const splitterNext = (branch: string) => {
    const pointer = current.next[branch];

    setCurrent(tree.find((node: any) => pointer == node.id));
  };

  console.log(current);
  if (!current) return null;

  if (current.type == "customNodeDefault") {
    return (
      <div
        onClick={next}
        style={{
          background: `url(${current.data.img})`,
        }}
        className={styles.container}
      >
        <div className={styles.text}>{current.data.text}</div>
      </div>
    );
  } else {
    const branchesText = Object.entries(current.data.branchesText);

    return (
      <div
        style={{
          background: `url(${current.data.img})`,
        }}
        className={styles.container}
      >
        <div className={styles.variants}>
          {branchesText.map((item: any) => (
            <div
              className={styles.variant}
              onClick={() => splitterNext(item[0])}
            >
              {item[1]}
            </div>
          ))}
        </div>
      </div>
    );
  }
};
