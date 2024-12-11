
import "./inputButton.less"

type InputButtonProps = {
    className?: string,
    isSubmit?: boolean,
    onClick?: () => void,
    isIcon: boolean,
    textOrIconName: string
}

export function InputButton({ className, isSubmit = false, onClick, isIcon, textOrIconName }: InputButtonProps) {

    return (
        <button class={`inputButton inputButton_${className}`} type={isSubmit ? "submit" : "button"} onClick={onClick}>
            {isIcon ?
                <span class="material-symbols-outlined">
                    {textOrIconName}
                </span>
                : textOrIconName
            }
        </button>
    )
}