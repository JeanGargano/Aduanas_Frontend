import { cardsData } from '../../Data/Data';
import Card from '../Card/Card';
import './Cards.css';

const Cards = () => {
    return (
        <div className="Cards">
            {cardsData.map((card, id) => {
                return (
                    <div className="parentContainer" key={id}>
                        <Card
                            title={card.title}
                            color={card.color}
                            barValue={card.barValue}
                            value={card.value}
                            png={card.png}
                            series={card.series}

                        />
                    </div>
                )
            })}
        </div>
    );
};

export default Cards;