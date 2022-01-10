import { nodeServiceFactory } from "components/pages/editor/helpers/nodeServiceFactory";
import { editorSlice, editorSliceSelectors } from "store/state/editor";
import { Popup } from "components/ui/Popup";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/state";
import { useFlowContext } from "components/pages/editor/flow context";
import { Button } from "components/ui/Button";

const Service = () => {
  const dispatch = useAppDispatch();
  const template = useSelector(editorSliceSelectors.getPopupState);
  const { setElements, elements } = useFlowContext();
  const toggleOpen = (v: boolean) => [
    dispatch(editorSlice.actions.setPopupState(v ? "remove" : null)),
  ];
  const nodeId = useSelector(editorSliceSelectors.getCurrentOpenedNode);

  const remove = () => {
    if (setElements) {
      setElements(
        elements.filter((element) => {
          return ![element.id, element?.target, element?.source].includes(
            nodeId
          );
        })
      );
    }
    toggleOpen(false);
  };

  return (
    <Popup
      title="Are you sure?"
      isOpened={template == "remove"}
      setIsOpened={toggleOpen}
    >
      <Button onClick={remove}>Yes</Button>
    </Popup>
  );
};

export default nodeServiceFactory({
  service: Service,
  nodeButtonParams: {
    action: (dispatch) => dispatch(editorSlice.actions.setPopupState("remove")),
    variantOrIcon: "cross",
  },
});
