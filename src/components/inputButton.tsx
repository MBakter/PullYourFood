
import { Icon } from "./icon"
import "./inputButton.less"

type InputButtonProps = {
    className?: string,
    isSubmit?: boolean,
    onClick?: () => void,
    isIcon: boolean,
    textOrIconName: string
}

/**
 * A button component that can either display text or an icon, 
 * and can be used for submit or regular button actions.
 * 
 * @param className - The class name for styling the button
 * @param isSubmit - Whether the button should be a submit button (defaults to false)
 * @param onClick - The function to call when the button is clicked
 * @param isIcon - Whether the button should display an icon (defaults to false)
 * @param textOrIconName - The name of the text to display or the icon name
 * @returns The button element with either text or an icon
 */
export function InputButton({ className, isSubmit = false, onClick, isIcon, textOrIconName }: InputButtonProps) {

    return (
        <button class={`inputButton inputButton_${className}`} type={isSubmit ? "submit" : "button"} onClick={onClick}>
            {isIcon ? <Icon iconName={textOrIconName} /> : textOrIconName}
        </button>
    )
}