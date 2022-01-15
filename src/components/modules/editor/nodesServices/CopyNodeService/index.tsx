import { nodeServiceFactory } from "components/modules/editor/helpers/nodeServiceFactory";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { useFlowContext } from "components/modules/editor/flow context";
import { Button } from "components/ui/Button";
import { useLayoutEffect, useState } from "react";
import { Input } from "components/ui/Input";
import { addEdge } from "react-flow-renderer";

export default nodeServiceFactory({
  Service: () => {
    const node = useSelector(editorSliceSelectors.getCurrentOpenedNode);
    const { setElements, elements } = useFlowContext();
    const [inputValue, setInputValue] = useState(node?.data?.text);
    const dispatch = useDispatch();

    const copy = () => {
      if (setElements) {
        const newId = String(Number(elements[elements.length - 1].id) + 1);

        //@ts-ignore
        setElements((prev) => [
          ...prev,
          {
            id: newId,
            data: {
              ...node!.data,
              text: inputValue,
            },
            type: node?.type,
            //@ts-ignore
            position: { x: node.xPos, y: node.yPos + 300 },
          },
        ]);

        setElements((els) =>
          addEdge(
            {
              id: `reactflow__edge-${node!.id}default-${newId}default`,
              source: node!.id,
              sourceHandle: "default",
              target: newId,
              targetHandle: "default",
              type: "custom",
              data: { text: node?.data?.branch },
            },
            els
          )
        );

        dispatch(editorSlice.actions.setPopupState(null));
      }
    };

    return (
      <>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
        <Button onClick={copy}>Save</Button>
      </>
    );
  },
  serviceName: "copy",
  nodeButtonParams: {
    variantOrIcon: "copy",
  },
});
