
/**
 * Renders an icon using the Material Symbols font based on the provided icon name.
 * 
 * @param iconName: The name of the icon to display.
 * @returns The rendered icon element.
 */
export function Icon({iconName} : {iconName: string}) {
    return <span class="material-symbols-outlined">
        {iconName}
    </span>
}