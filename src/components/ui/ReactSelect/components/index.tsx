/* components */
import { components } from "react-select";
import React from "react";
import styles from "./index.module.css";

export const CustomSelectOption = ({
  innerProps,
  innerRef,
  children,
  data,
  render,
}: any) => {
  return (
    <div className={styles.option} ref={innerRef} {...innerProps}>
      {render ? render(data) : children}
    </div>
  );
};

const DropdownIndicator = (innerProps: any) => {
  return (
    <components.DropdownIndicator {...innerProps}>
      {/*<Icons.ui.SelectTriangleIcon*/}
      {/*   className={classNames(styles.indicator, {*/}
      {/*      [styles["indicator--focused"]]: innerProps.isFocused,*/}
      {/*   })}*/}
      {/*/>*/}
    </components.DropdownIndicator>
  );
};

const Indicator = (componentProps: any, innerProps: any) => {
  // return componentProps.isClearable && innerProps.hasValue ? (
  //    // <Icons.ui.CrossIcon
  //    //    className={styles.cross}
  //    //    onClick={innerProps?.clearValue}
  //    // />
  // ) : (
  //    <DropdownIndicator {...innerProps} />
  // );
};

const CustomValueContainer = ({ children, ...props }: any) => {
  return (
    <components.ValueContainer {...props}>
      <components.Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </components.Placeholder>
      {React.Children.map(children, (child) =>
        child && child.type !== components.Placeholder ? child : null
      )}
    </components.ValueContainer>
  );
};

/** Component with paddings,
 * error div, clearingErrors
 * and proxy onChange */

export default {
  CustomSelectOption,
  Indicator,
  CustomValueContainer,
};
