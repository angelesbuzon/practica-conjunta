import { Button } from '../components/Button'
import { Link } from 'react-router-dom';
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
                    <h1 className="font-bold text-6xl">
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
                <h2 className="font-bold text-2xl">Categorías</h2>
                <p className="text-gray-dark text-sm">Encuentra la categoría de comida que buscas.</p>
                <div>
                    {/* Llamada a API... */}
                    (WIP)
                </div>
            </div>
        </section>
        <section id="destacados" className="w-full bg-light py-12 overflow-hidden">
            {/* Container: */}
            <div className="max-w-7xl w-[95%] mx-auto px-6 lg:px-0 flex flex-col gap-6">
                <h2 className="font-bold text-4xl">Platos destacados</h2>
                <div>
                    {/* Llamada a API??? */}
                    (WIP)
                    <Link 
                        to="/categoria/Seafood" 
                        className=""
                    >
                        Marisco
                    </Link>
                </div>
            </div>
        </section>
        <section id="cta" className="w-full bg-light py-12 overflow-hidden">
            {/* Container in orange: */}
            <div className="max-w-7xl w-[95%] mx-auto p-12 bg-primary text-white xl:rounded-2xl
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