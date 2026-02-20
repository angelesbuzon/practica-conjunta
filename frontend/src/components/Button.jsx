/**
 * BUTTON: Rounded button hyperlinks
 * Changes color classes applied (primary || secondary || light) depending on the last string parameter
 * 
 * Example of usage:
 * <Button anchorText="Click here" url="./mypage.html" color="primary" />
 * 
 * Example of final rendering:
 * <a href="./mypage.html" class="font-bold inline-block border-1 rounded-lg px-8 py-4 bg-primary border-primary text-white">
 *  Click here
 * </a>
 */

export function Button({anchorText, url, color}) {
    // Baseline classes, no matter the colors (don't forget the final whitespace):
    let styleClasses = `font-bold inline-block border-1 rounded-xl px-8 py-4 hover:scale-[1.1] transition-all `;

    // Classes depending on colors:
    if (color == `primary`) {
        styleClasses += `bg-primary border-primary text-white`;
    } else if (color == `secondary`) {
        styleClasses += `bg-secondary border-secondary text-dark`;
    } else {
        // Applied by default
        styleClasses += `bg-white border-gray text-dark`;
    }

    /*
     * Final button code:
     *
     * Don't use this, as this is merely a HTML string that won't be correctly rendered:
     * const button = `<a href="${url}" className="${styleClasses}">${anchorText}</a>`;
     * return button;
     * 
     * Instead, return the JSX element directly:
     * return (<a href={url} ... >);
     */

    return (<a href={url} className={styleClasses}>{anchorText}</a>);
}