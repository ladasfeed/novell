import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { Popup } from "components/ui/Popup";

export const Preview = () => {
  const compiled = useSelector(editorSliceSelectors.getCompiled);
  const images = useSelector(editorSliceSelectors.getImages);
  const [current, setCurrent] = useState(compiled[0]);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setIsOpened(true);
    setCurrent(compiled[0]);
  }, [compiled]);

  const next = () => {
    const newNode = compiled.find((node: any) => current.next == node.id);
    if (newNode) {
      setCurrent(newNode);
    } else {
      alert("End");
    }
  };

  const splitterNext = (branch: string) => {
    const pointer = current.next?.[branch];

    if (pointer) {
      setCurrent(compiled.find((node: any) => pointer == node.id));
    } else {
      alert("End");
    }
  };

  if (!current) return null;

  const resolve = () => {
    if (current.type == "customNodeDefault") {
      return (
        <div className={styles.text} onClick={next}>
          {current.data.text}
        </div>
      );
    } else {
      const branchesText = Object.entries(current.data.branchesText);

      return (
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
      );
    }
  };

  return (
    <Popup isOpened={isOpened} setIsOpened={setIsOpened}>
      <div
        style={{
          background: `url(${
            images.find((img) => img.id == current.data.imgId)?.value
          })`,
        }}
        className={styles.container}
      >
        {resolve()}
      </div>
    </Popup>
  );
};
