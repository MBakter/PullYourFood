import "./inputField.less";

type InputFieldProps = {
    className: string,
    type: string,
    placeholder: string,
    value: string,
    onChange?: (e: any) => void,
    onEnter?: () => void
}

/**
 * This component renders an input field.
 * 
 * @param className - The class to style the input field
 * @param type - The type of the input (e.g., text, password)
 * @param placeholder - The placeholder text to display in the input field
 * @param value - The current value of the input field
 * @param onChange - The function to call when the input value changes
 * @param onEnter - The function to call when the Enter key is pressed
 * @returns The input field element
 */
export function InputField({ className, type, placeholder, value, onChange, onEnter }: InputFieldProps) {
    return (
        <input class={`inputField_${className}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={e => onChange(e.currentTarget.value)}
            onKeyDown={e => {
                if (e.key === 'Enter' && onEnter)
                    onEnter();
            }}>
        </input>
    )
}