import { nodeServiceFactory } from "components/modules/editor/helpers/nodeServiceFactory";
import { useDispatch, useSelector } from "react-redux";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { useFlowContext } from "components/modules/editor/flow context";
import { Button } from "components/ui/Button";
import { addEdgeHandler } from "components/modules/editor/helpers/addEdgeHandler";
import { generateUuidNode } from "components/modules/editor/helpers/generateUuidNode";

export default nodeServiceFactory({
  Service: () => {
    const node = useSelector(editorSliceSelectors.getCurrentOpenedNode);
    const { setElements, elements } = useFlowContext();
    const dispatch = useDispatch();

    const copy = () => {
      const newId = generateUuidNode(elements);

      if (setElements) {
        setElements((prev) => [
          ...prev,
          {
            id: newId,
            data: {
              ...node!.data,
              act: [],
            },
            type: node?.type,
            position: { ...node!.position, y: node!.position.y + 300 },
          },
        ]);

        setElements((els) =>
          addEdgeHandler({
            elements: els,
            params: {
              id: `reactflow__edge-${node!.id}default-${newId}default`,
              source: node!.id,
              sourceHandle: "default",
              target: newId,
              targetHandle: "default",
            },
            label: node?.data?.branch,
          })
        );
        dispatch(editorSlice.actions.setPopupState(null));
      }
    };

    return (
      <>
        <Button onClick={copy}>Save</Button>
      </>
    );
  },
  serviceName: "copy",
  nodeButtonParams: {
    variantOrIcon: "copy",
  },
});
