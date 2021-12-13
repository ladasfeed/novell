import { Button } from "components/ui/Button";
import { useAppDispatch } from "store/state";
import { editorSlice } from "store/state/editor";
import React from "react";
import { Icons } from "assets/icons";
import { NodeToolButton } from "components/ui/NodeToolButton";

export const NodeCharacterEditorButton = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();

  const openEditor = () => {
    dispatch(editorSlice.actions.setEditingCharacterState(true));
    dispatch(editorSlice.actions.setCurrentOpenedNode(id));
  };

  return <NodeToolButton variant="character" onClick={openEditor} />;
};
