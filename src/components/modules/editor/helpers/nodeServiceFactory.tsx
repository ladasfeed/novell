import React, { Dispatch, FC, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editorSlice,
  editorSliceSelectors,
  popupTemplates,
} from "store/state/editor";
import {
  NodeToolButton,
  NodeToolButtonIconType,
} from "components/ui/NodeToolButton";
import { type } from "os";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useAppDispatch } from "store/state";
import { Popup } from "components/ui/Popup";
import { flowDefaultNodeType, reactFlowNodeType } from "types";

export const nodeServiceFactory = (props: {
  nodeButtonParams: {
    variantOrIcon: NodeToolButtonIconType | FC;
    action?: () => void;
  };
  popupProps?: {
    className?: string;
    title?: string;
  };
  serviceName: popupTemplates;
  Service: React.FC;
}) => {
  return {
    Service: () => {
      const dispatch = useDispatch();
      const popupState = useSelector(editorSliceSelectors.getPopupState);
      const isOpen = useMemo(() => {
        return popupState == props.serviceName;
      }, [popupState]);

      const togglePopup = (v: boolean) => [
        dispatch(
          editorSlice.actions.setPopupState(v ? props.serviceName : null)
        ),
      ];

      return (
        <Popup
          {...props.popupProps}
          isOpened={isOpen}
          setIsOpened={togglePopup}
        >
          <props.Service />
        </Popup>
      );
    },
    NodeButton: ({ node }: { node: reactFlowNodeType }) => {
      const dispatch = useAppDispatch();

      const open = () => {
        dispatch(editorSlice.actions.setCurrentOpenedNode(node));
        dispatch(editorSlice.actions.setPopupState(props.serviceName));
      };

      if (typeof props.nodeButtonParams.variantOrIcon == "string") {
        return (
          <NodeToolButton
            onClick={props.nodeButtonParams.action || open}
            variant={props.nodeButtonParams.variantOrIcon}
          />
        );
      } else {
        return (
          <NodeToolButton onClick={props.nodeButtonParams.action || open}>
            {React.createElement(props.nodeButtonParams.variantOrIcon)}
          </NodeToolButton>
        );
      }
    },
  };
};
