import { cardsData } from '../../Data/Data';
import Card from '../Card/Card';
import './Cards.css';

const Cards = () => {
    return (
        <div className="Cards">
            {cardsData.map((card, index) => {
                const cardId = `card-${index}`; // ID único para Framer Motion
                return (
                    <div className="parentContainer" key={cardId}>
                        <Card
                            id={cardId} // ahora pasamos un id único
                            title={card.title}
                            color={card.color}
                            barValue={card.barValue}
                            value={card.value}
                            png={card.png}
                            series={card.series}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Cards;
