import classNames from "classnames";
import SelectComponents from "../components";
const { CustomSelectOption, CustomValueContainer } = SelectComponents;

const getDefaultSelectProps = (props: any) => ({
  menuShouldScrollIntoView: true,
  noOptionsMessage: () => "No result.",
  className: classNames("ReactSelect", props.className),
  classNamePrefix: "ReactSelect",
  styles: {
    valueContainer: (provided: any) => ({
      ...provided,
      overflow: "visible",
    }),
    placeholder: (provided: any, state: any) => ({
      ...provided,
      position: "absolute",
      top: state.hasValue || state.selectProps.inputValue ? "-20px" : "0px",
      transition: "top 0.1s, font-size 0.1s",
      fontSize: state.hasValue || state.selectProps.inputValue ? 12 : 14,
    }),
  },
});

const getDefaultSelectComponents = (props: any) => {
  return {
    Option: props.components?.Option
      ? props.components.Option
      : CustomSelectOption,
    // DropdownIndicator: (innerProps: any) => Indicator(props, innerProps),
    ValueContainer: CustomValueContainer,
    // ClearIndicator: () => null,
  };
};

export default {
  getDefaultSelectProps,
  getDefaultSelectComponents,
};
