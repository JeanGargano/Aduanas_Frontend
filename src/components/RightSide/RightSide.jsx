import "./RightSide.css";
import Updates from "../Updates/Updates";


const RightSide = () => {
    return (
        <div className="RightSide">
            <div>
                <h3>Últimas actualizaciones</h3>
                <Updates />
            </div>
            {/* <div>
                <h3>Clientes</h3>
                <Clientes />
            </div> */}

        </div>
    )
}

export default RightSide;
