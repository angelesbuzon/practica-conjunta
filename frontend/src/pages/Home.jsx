import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <div className="grow flex items-center justify-center flex-col py-20">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    ¡Proyecto limpio y listo! 🚀
                </h1>
                <h2 className="text-2xl font-bold text-gray-800 mb-8">a topeeeeee</h2>
                
                <div className="flex gap-4 mt-8">
                    <Link 
                        to="/categoria" 
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Ver todas las categorías
                    </Link>
                    <Link 
                        to="/categoria/Seafood" 
                        className="px-6 py-3 bg-white text-primary border border-primary rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Ver platos de Seafood
                    </Link>
                    <Link 
                        to="/categoria/Chicken" 
                        className="px-6 py-3 bg-white text-primary border border-primary rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Ver platos de Chicken
                    </Link>
                </div>
            </div>
        </div>
    )
}   