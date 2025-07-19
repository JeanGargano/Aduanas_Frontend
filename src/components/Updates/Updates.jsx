import "./Updates.css";
import { UpdatesData } from "../../Data/Data";

const Updates = () => {
    return (
        <div className="Updates">
            {UpdatesData.map((update) => {
                return (
                    <div className="update" key={update.name}>
                        <h4>{update.name}</h4>
                        <p>{update.noti}</p>
                        <span>{update.time}</span>
                    </div>
                );
            })}
        </div>

    )
}

export default Updates
