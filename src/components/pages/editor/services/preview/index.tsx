import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";

export const Preview = ({ tree }: { tree: Array<any> }) => {
  const [current, setCurrent] = useState(tree[0]);
  const images = useSelector(editorSliceSelectors.getImages);

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
          background: `url(${
            images.find((img) => img.id == current.data.imgId)?.value
          })`,
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
          background: `url(${
            images.find((img) => img.id == current.data.imgId)?.value
          })`,
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
