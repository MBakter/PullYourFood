import "./inputField.less";

type InputFieldProps = {
    className: string,
    type: string,
    placeholder: string,
    value: string,
    onChange?: (e: any) => void,
    onEnter?: () => void
}

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