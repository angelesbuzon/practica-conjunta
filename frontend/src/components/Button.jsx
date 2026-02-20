export function Button(anchorText, url, isPrimaryColor) {
    // Baseline classes, no matter the colors (don't forget the final whitespace):
    let styleClasses = `font-bold inline-block border-1 rounded-lg px-8 py-4 `;

    // Classes depending on colors
    if (isPrimaryColor == true) {
        styleClasses += `bg-primary text-white border-primary`;
    } else {
        styleClasses += `bg-white text-gray-800 border-gray-300`;
    }

    // Final button code:
    let button = `<a href="${url}" className="${styleClasses}">${anchorText}</a>`;

    return button;
}