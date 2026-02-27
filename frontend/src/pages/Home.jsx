import { Button } from '../components/Button';
import { CategoryCard } from '../components/CategoryCard';
import { DishCard } from '../components/DishCard';

import heroUrl from "../img/hero.png";

export default function Home() {
    return (
        <>
        <section id="hero" className="w-full bg-light pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
            {/* Container: */}
            <div className="max-w-7xl w-[95%] mx-auto px-6 lg:px-0 grid lg:grid-cols-2 justify-between gap-4 items-center">
                {/* Hero text: */}
                <div className="w-full inline-flex flex-col gap-6">
                    <div className="w-fit flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                        <span className="material-icons">restaurant</span>
                        <span>Experiencia gourmet</span>
                    </div>
                    <h1 className="font-bold text-6xl text-dark">
                        Tus platos favoritos, con <span className="text-primary">ingredientes frescos</span>
                    </h1>
                    <p className="text-gray-dark">
                        Pedir a domicilio nunca había sabido tan bien. Ofrecemos platos cuidadosamente preparadas por nuestros cocineros con los mejores ingredientes de proximidad, de la olla a tu puerta.
                    </p>
                    <div className="flex flex-col md:flex-row text-center gap-6">
                        <Button anchorText="Haz tu pedido" url="#" color="primary" />
                        <Button anchorText="Cómo funciona" url="#" color="" />
                    </div>
                    <ul className="flex gap-6 text-gray-dark text-sm">
                        <li className="flex items-center gap-2">
                            <span className="material-icons text-green-500 text-lg">check_circle</span>
                            Envío gratuito
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="material-icons text-green-500 text-lg">check_circle</span>
                            Ingredientes frescos
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="material-icons text-green-500 text-lg">check_circle</span>
                            Rápido tiempo de entrega
                        </li>
                    </ul>
                </div>
                {/* Picture with text (justify-end to compensate for space left in div): */}
                <div className="flex lg:justify-end w-full order-first lg:order-last rotate-2 hover:rotate-0 transition-all">
                    <img className="rounded-2xl" src={heroUrl} alt="Overhead view of various fresh vegetables, herbs and spices on a dark wooden table ready for cooking" />
                </div>
            </div>
        </section>
        <section id="categorias" className="w-full bg-white py-12 overflow-hidden">
            {/* Container: */}
            <div className="max-w-7xl w-[95%] mx-auto px-6 lg:px-0 flex flex-col gap-6">
                <h2 className="font-bold text-2xl text-dark">Categorías</h2>
                <p className="text-gray-dark text-sm">Encuentra la categoría de comida que buscas.</p>
                <div className="w-full flex flex-wrap justify-center gap-6">
                    <CategoryCard category="Chicken" descriptor="Pollo" />
                    <CategoryCard category="Beef" descriptor="Ternera" />
                    <CategoryCard category="Seafood" descriptor="Marisco" />
                    <CategoryCard category="Pasta" descriptor="Pasta" />
                    <CategoryCard category="Vegetarian" descriptor="Vegetariana" />
                    <CategoryCard category="Dessert" descriptor="Postres" />
                    
                    {/* Special pseudo-CategoryCard: */}
                    <a href="./categoria/">
                    <article className="min-w-30 flex flex-col items-center gap-4 border-1 border-primary bg-primary hover:bg-primary-dark text-primary hover:text-primary-dark w-fit rounded-2xl p-4 hover:scale-[1.1] transition-all">
                        <div className="w-16 h-16 rounded-full  bg-white flex justify-center items-center text-xl font-bold">
                            +
                        </div>
                        <h3 className="font-bold text-white">Ver más</h3>
                    </article>
                    </a>
                </div>
            </div>
        </section>
        <section id="destacados" className="w-full bg-light py-12 overflow-hidden">
            {/* Container: */}
            <div className="max-w-7xl w-[95%] mx-auto px-6 lg:px-0 flex flex-col gap-6">
                <h2 className="font-bold text-4xl text-dark">Platos destacados</h2>
                <div className="w-full flex flex-wrap justify-center gap-6">
                    <DishCard
                        name="Ajo blanco"
                        description="El primo del gazpacho que no necesita tomate para brillar."
                        price="19.87" />
                    <DishCard
                        name="Espagueti a la carbonara"
                        description="Sí, lleva nata. Pero es la prueba de que la felicidad se enrolla con un tenedor."
                        price="19.86" />
                    <DishCard 
                        name="Calamares fritos"
                        description="Unos aros dorados y crujientes que desaparecen más rápido que tu sueldo a principios de mes."
                        price="17.94" />
                    <DishCard
                        name="Cuscús de pollo"
                        description="Un viaje exprés al Magreb sin pasar por el aeropuerto."
                        price="20.50" />
                    <DishCard
                        name="Tarta de manzana"
                        description="El abrazo de una abuela convertido en postre."
                        price="8.40" />
                </div>
            </div>
        </section>
        <section id="cta" className="w-full bg-light py-12 overflow-hidden">
            {/* Container in orange: */}
            <div className="max-w-7xl w-[95%] mx-auto p-12 bg-primary text-white rounded-2xl
            flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12">
                <div className="flex flex-col gap-4 md:w-[60%]">
                  <h2 className="font-bold text-4xl">¿Tienes hambre?</h2>
                  <p>Haz tu pedido y recibe platos de deliciosa comida y recíbelo a partir de 30 minutos después. Disfruta de tu tiempo y de tus platos desde hoy mismo.</p>
                </div>
                <div className="w-full md:w-fit">
                    <Button anchorText="Descargar app" url="#" color="invertedPrimary" />
                </div>
            </div>
        </section>
        </>
    )
}   