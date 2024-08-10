import { Link } from "react-router-dom"

export const NotFound = ()=> {
    return (
        <div>
            <p className="text-xl text-white">Ha ocurrido un error, pero quizás quieras {' '}
                <Link className="text-xl text-fuchsia-500 hover:cursor-pointer hover:text-fuchsia-700 transition-colors" to={'/'}>volver al inicio</Link>
            </p>
        </div>
    )
}