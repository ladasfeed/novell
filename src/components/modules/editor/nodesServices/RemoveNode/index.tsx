import { nodeServiceFactory } from "components/modules/editor/helpers/nodeServiceFactory";
import { editorSliceSelectors } from "store/state/editor";
import { useSelector } from "react-redux";
import { useFlowContext } from "components/modules/editor/flow context";
import { Button } from "components/ui/Button";

const Service = () => {
  const { setElements, elements } = useFlowContext();
  const node = useSelector(editorSliceSelectors.getCurrentOpenedNode);

  const remove = () => {
    if (setElements) {
      setElements(
        elements.filter((element) => {
          return ![element.id, element?.target, element?.source].includes(
            node?.id
          );
        })
      );
    }
  };

  return <Button onClick={remove}>Yes</Button>;
};

export default nodeServiceFactory({
  Service,
  nodeButtonParams: {
    variantOrIcon: "cross",
  },
  serviceName: "remove",
});
