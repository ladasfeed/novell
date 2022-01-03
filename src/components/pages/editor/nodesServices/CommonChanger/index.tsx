import { useDispatch } from "react-redux";
import { editorSlice } from "store/state/editor";
import { NodeToolButton } from "components/ui/NodeToolButton";
import React from "react";

export const NodeCommonChanger = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch(editorSlice.actions.setIsEditingCommon(true));
    dispatch(editorSlice.actions.setCurrentOpenedNode(id));
  };

  return <NodeToolButton onClick={open} variant={"settings"} />;
};
