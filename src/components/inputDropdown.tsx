import { RecipeCategory, RecipeTime } from "../model/model"

type InputDropdownProps = {
    name: string,
    value: string,
    onChange?: (e: any) => void,
    list: typeof RecipeCategory | typeof RecipeTime
}

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