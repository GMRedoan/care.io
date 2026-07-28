export const SelectStyles = {
    control: ({ isFocused }) =>
        `rounded-2xl border ${isFocused ? "border-primary" : "border-accent"
        } bg-base-200 px-3 py-2`,
    menu: () =>
        "mt-2 rounded-2xl bg-base-200 border border-accent overflow-hidden",
    option: ({ isFocused, isSelected }) =>
        `px-4 py-3 cursor-pointer ${isSelected
            ? "bg-primary text-primary-content"
            : isFocused
                ? "bg-base-100"
                : "bg-base-200"
        }`,
    placeholder: () => "text-accent/70",
    singleValue: () => "text-base-content",
    input: () => "text-base-content",
    indicatorSeparator: () => "hidden",
    dropdownIndicator: () => "text-base-content",
};