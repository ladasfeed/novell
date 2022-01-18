import { useSelector } from "react-redux";
import { editorSliceSelectors } from "store/state/editor";
import { useFlowContext } from "components/modules/editor/flow context";
import React, { useEffect, useState } from "react";
import styles from "components/modules/editor/nodesServices/BranchChanger/branchCaseEditor/index.module.css";
import { UiElementContainer } from "components/ui/UiContainer";
import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";
import { Title } from "components/ui/Title";
import { ReactSelect } from "components/ui/ReactSelect";
import { outputSplitterType, variantType } from "types";

export default () => {
  const node = useSelector(editorSliceSelectors.getCurrentOpenedNode);
  const branches = useSelector(editorSliceSelectors.getBranches);
  const { elements, changeElement } = useFlowContext();
  const [inputValue, setInputValue] = useState("");
  const [variants, setVariants] = useState<Array<variantType>>(
    node?.data?.splitterData?.variants || []
  );
  const [outputArray, setOutputArray] = useState<Array<outputSplitterType>>(
    node?.data?.splitterData?.outputs || []
  );
  const [freeVariants, setFreeVariants] = useState<Array<variantType>>([]);

  const addNewVariant = () => {
    const newVariant = {
      id: variants[variants.length - 1]?.id + 1 || 0,
      text: inputValue,
      actions: [],
    };

    setVariants((prev) => [...prev, newVariant]);
    setFreeVariants((prev) => [...prev, newVariant]);

    setInputValue("");
  };

  const addOutputHandler = () => {
    setOutputArray((prev) => [
      ...prev,
      {
        id: outputArray[outputArray.length - 1]?.id + 1 || 0,
        variants: [],
        branch: branches[0],
      },
    ]);
  };

  const saveHandler = () => {
    changeElement(node?.id as string, (prev) => {
      return {
        ...prev,
        data: {
          ...prev.data,
          splitterData: {
            variants: variants,
            outputs: outputArray,
          },
        },
      };
    });
  };

  if (!node) return null;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.variants}>
          <UiElementContainer>
            <div>
              <Title>Add variant</Title>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
              />
              <Button onClick={addNewVariant}>Save</Button>
            </div>
          </UiElementContainer>
          <br />

          <UiElementContainer>
            <Title>Variants</Title>
            {variants.map((item) => {
              return <UiElementContainer>{item.text}</UiElementContainer>;
            })}
          </UiElementContainer>
        </div>

        <div className={styles.outputs}>
          <UiElementContainer>
            <Title>Add Output</Title>
            <Button onClick={addOutputHandler}>Add</Button>
          </UiElementContainer>
          <br />

          <UiElementContainer className={styles.output_editor}>
            <Title>Edit Output</Title>
            <div className={styles.output_list}>
              {outputArray.map((item) => (
                <div className={styles.output_editor_element}>
                  <ReactSelect
                    defaultValue={{
                      value: item.branch,
                      label: item.branch,
                    }}
                    onChange={(newValue: any) => {
                      setOutputArray((prev) =>
                        prev.map((output) =>
                          item.id != output.id
                            ? output
                            : {
                                ...output,
                                branch: newValue!.value || "",
                              }
                        )
                      );
                    }}
                    placeholder={"Branch"}
                    options={branches.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                  <ReactSelect
                    isMulti
                    placeholder={"Variants"}
                    onChange={(newVariants) => {
                      setOutputArray((prev) =>
                        prev.map((output) =>
                          item.id != output.id
                            ? output
                            : {
                                ...output,
                                variants: newVariants.map((variant) =>
                                  Number(variant.value)
                                ),
                              }
                        )
                      );
                    }}
                    options={variants.map((item) => ({
                      value: item.id,
                      label: item.id,
                    }))}
                  />
                </div>
              ))}
            </div>
          </UiElementContainer>
        </div>
      </div>
      <br />
      <br />
      <Button onClick={saveHandler}>Save</Button>
    </>
  );
};

{
  /*<ReactSelect*/
}
{
  /*  defaultValue={node.data?.branchesText?.map((v) => ({*/
}
{
  /*    value: v.branch,*/
}
{
  /*    label: v.branch,*/
}
{
  /*  }))}*/
}
{
  /*  onChange={(v: any) => {*/
}
{
  /*    setBranchesText((p) => [*/
}
{
  /*      ...p,*/
}
{
  /*      {*/
}
{
  /*        text: "",*/
}
{
  /*        branch: v[v.length - 1].value,*/
}
{
  /*      },*/
}
{
  /*    ]);*/
}
{
  /*  }}*/
}
{
  /*  isMulti*/
}
{
  /*  options={branches.map((item) => ({*/
}
{
  /*    label: item,*/
}
{
  /*    value: item,*/
}
{
  /*  }))}*/
}
{
  /*/>*/
}
