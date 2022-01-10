import React, { Dispatch, FC } from "react";
import { useDispatch } from "react-redux";
import { editorSlice } from "store/state/editor";
import {
  NodeToolButton,
  NodeToolButtonIconType,
} from "components/ui/NodeToolButton";
import { type } from "os";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "store/state";

// type nodeServicesType =
//   | "image"
//   | "branch"
//   | "text"
//   | "effects"
//   | "audio"
//   | "character"
//   | "clone"

export const nodeServiceFactory = (props: {
  nodeButtonParams: {
    variantOrIcon: NodeToolButtonIconType | FC;
    reduxActionToOpen?: ActionCreatorWithPayload<boolean>;
    action?: (dispatch: Dispatch<any>) => void;
  };
  service: React.FC;
}) => {
  return {
    service: props.service,
    NodeButton: ({ id }: { id: string }) => {
      const dispatch = useAppDispatch();

      const open = () => {
        dispatch(editorSlice.actions.setCurrentOpenedNode(id));

        if (props.nodeButtonParams.reduxActionToOpen) {
          dispatch(props.nodeButtonParams.reduxActionToOpen(true));
          return;
        }
        if (props.nodeButtonParams.action) {
          props.nodeButtonParams.action(dispatch);
        }
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
