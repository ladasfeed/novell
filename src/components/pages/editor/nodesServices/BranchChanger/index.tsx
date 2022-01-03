import { useDispatch } from "react-redux";
import { NodeToolButton } from "components/ui/NodeToolButton";
import { editorSlice } from "store/state/editor";
import React from "react";

export const NodeBranchChanger = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const open = () => {
    dispatch(editorSlice.actions.setEditingBranches(true));
    dispatch(editorSlice.actions.setCurrentOpenedNode(id));
  };

  return <NodeToolButton onClick={open} variant={"branch"} />;
};
