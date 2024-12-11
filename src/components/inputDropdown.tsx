import { RecipeCategory, RecipeTime } from "../model/model"

type InputDropdownProps = {
    name: string,
    value: string,
    onChange?: (e: any) => void,
    list: typeof RecipeCategory | typeof RecipeTime
}

/**
 * This component renders a dropdown menu with options from a provided list.
 * 
 * @param name - The name of the select element
 * @param value - The current value of the select element
 * @param onChange - The function to call when the selected value changes
 * @param list - The list of elements of the dropdown
 * @returns The dropdown select element
 */
export function InputDropdown({ name, value, onChange, list }: InputDropdownProps) {
    return (
        <select name={name} value={value}
            onChange={onChange}>

            {Object.values(list).map((l) => (
                <option key={l} value={l} >
                    {l}
                </option>
            ))}

        </select>
    )
}