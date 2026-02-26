import { Link } from 'react-router-dom';

/**
 * Used in Home.jsx for listing featured categories
 */

export function CategoryCard({category, descriptor}) {
    // Category should be capitalized for the URL, e.g. Seafood
    const categoryPath = `/categoria/${category}`;
    category = category.toLowerCase();
    const imgPath = `../src/img/${category}.png`; // This is a bit risky but works if imgs are consistently named

    return (
        <Link to={categoryPath}>
            <article className="min-w-30 flex flex-col items-center gap-4 border-1 border-gray-light w-fit rounded-2xl p-4 hover:scale-[1.1] transition-all">
                <div>
                    <img src={imgPath} className="max-w-16 rounded-full" />
                </div>
                <h3 className="font-bold text-dark">{descriptor}</h3>
            </article>
        </Link>
    );
}