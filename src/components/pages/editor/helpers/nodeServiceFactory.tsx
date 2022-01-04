import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { editorSlice } from "store/state/editor";
import {
  NodeToolButton,
  NodeToolButtonIconType,
} from "components/ui/NodeToolButton";
import { type } from "os";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "store/state";

type nodeServicesType =
  | "image"
  | "branch"
  | "text"
  | "effects"
  | "audio"
  | "character"
  | "clone";

export const nodeServiceFactory = (props: {
  nodeButtonParams: {
    variantOrIcon: NodeToolButtonIconType | FC;
    reduxActionToOpen: ActionCreatorWithPayload<boolean>;
  };
  service: React.FC;
}) => {
  return {
    service: props.service,
    NodeButton: ({ id }: { id: string }) => {
      const dispatch = useAppDispatch();

      const open = () => {
        dispatch(editorSlice.actions.setCurrentOpenedNode(id));
        dispatch(props.nodeButtonParams.reduxActionToOpen(true));
      };

      if (typeof props.nodeButtonParams.variantOrIcon == "string") {
        return (
          <NodeToolButton
            onClick={open}
            variant={props.nodeButtonParams.variantOrIcon}
          />
        );
      } else {
        return (
          <NodeToolButton onClick={open}>
            {React.createElement(props.nodeButtonParams.variantOrIcon)}
          </NodeToolButton>
        );
      }
    },
  };
};
