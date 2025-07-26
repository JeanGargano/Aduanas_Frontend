import "./RightSide.css";
import Updates from "../Updates/Updates";
import Clientes from "../../pages/Clientes/Clientes";
import CustomerReview from "../CustomerReview/CustomerReview";


const RightSide = () => {
    return (
        <div className="RightSide">
            <div>
                <h3>Últimas actualizaciones</h3>
                <Updates />
            </div>
            <div>
                <h3>Clientes</h3>
                <CustomerReview />
            </div>
        </div>
    )
}

export default RightSide;
