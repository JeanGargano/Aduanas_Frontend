import "./Updates.css";
import { UpdatesData } from "../../Data/Data";

const Updates = () => {
    return (
        <div className="Updates">
            {UpdatesData.map((update) => {
                return (
                    <div className="update" key={update.name}>
                        <div className="noti">
                            <div style={{ marginBottom: '0.5rem' }}>
                                <span>{update.name}</span>
                                <span> {update.noti}</span>
                            </div>
                            <span>{update.time}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Updates
