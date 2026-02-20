import {Button} from '../components/Button'

export default function Home() {
    return (
        <section id="hero" className="pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
            {/* Container: */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                {/* Hero text: */}
                <div>
                    <h1 className="font-bold text-6xl">
                        Your favourite recipes, delivered as <span className="text-primary">fresh ingredients</span>.
                    </h1>
                    <p>
                        Skip the grocery store. We deliver chef-curated recipes and precisely measured, farm-fresh ingredients straight to your door.
                    </p>
                    {/* Buttons: */}
                    <div>
                        {/* Button Components (WIP...) */}
                        <Button anchorText="Start Cooking" url="" isPrimaryColor="true" />
                        <Button anchorText="How It Works" url="" isPrimaryColor="false" />
                    </div>
                </div>
                {/* Picture with text: */}
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem dignissimos nam cumque debitis, repudiandae doloribus. Delectus perferendis mollitia illo assumenda, nihil earum quae maiores sunt, temporibus eligendi sint consequatur consequuntur.
                Nemo iste modi sed non dolor illo suscipit placeat omnis quae excepturi corporis, maxime atque magnam voluptatum pariatur doloribus beatae porro quis dolorem eaque? Deleniti exercitationem odio deserunt dolores mollitia?
                Dicta minus consequuntur sequi amet doloremque deleniti ipsam aperiam distinctio iste ratione eaque reprehenderit veritatis vero impedit non nesciunt accusantium id recusandae totam eius et, tempore aspernatur unde! Doloribus, dignissimos.</div>
            </div>
        </section>
    )
}   