import Select, { components, GroupBase } from "react-select";
import React, { RefAttributes } from "react";
import SelectAsync from "react-select/async";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import SelectBase from "react-select/base";
import "./style.css";
import { AsyncProps } from "react-select/dist/declarations/src/useAsync";
import PropsGenerators from "./propsGenerators";

const { getDefaultSelectComponents, getDefaultSelectProps } = PropsGenerators;

type selectBaseType<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = {} & {
  error?: string;
} & RefAttributes<SelectBase<Option, IsMulti, Group>>;

/* Default select */
type defaultSelectPropsType<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = StateManagerProps<Option, IsMulti, Group> &
  selectBaseType<Option, IsMulti, Group>;

export function ReactSelect<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: defaultSelectPropsType<Option, IsMulti, Group>) {
  return (
    <Select
      {...props}
      {...getDefaultSelectProps(props)}
      components={getDefaultSelectComponents(props)}
    />
  );
}

/* Async select */
type asyncSelectPropsTypes<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> = AsyncProps<Option, IsMulti, Group> & selectBaseType<Option, IsMulti, Group>;

export function ReactSelectAsync<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: asyncSelectPropsTypes<Option, IsMulti, Group>) {
  return (
    <SelectAsync
      {...props}
      {...getDefaultSelectProps(props)}
      components={{
        ...getDefaultSelectComponents(props),
        Menu: (props: any) => {
          if (!props?.selectProps?.inputValue) {
            return null;
          }
          return <components.Menu {...props}>{props.children}</components.Menu>;
        },
      }}
    />
  );
}
