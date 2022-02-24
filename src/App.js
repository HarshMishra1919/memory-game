import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
    { src: '/img/helmet-1.png', matched: false },
    { src: '/img/potion-1.png', matched: false },
    { src: '/img/ring-1.png', matched: false },
    { src: '/img/scroll-1.png', matched: false },
    { src: '/img/shield-1.png', matched: false },
    { src: '/img/sword-1.png', matched: false },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
	const [count, setCount] = useState(0);
    // const [winMessage, setWinMessage] = useState('');
    // duplicate the images and randomize the order of images
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => {
                return Math.random() - 0.5;
            })
            .map((card) => ({
                ...card,
                id: Math.random(),
            }));
        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
    };

    //Handle a choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    // start a new game automatically for the first time
    useEffect(() => {
        shuffleCards();
    }, []);

    // compare 2 selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
				setCount(count+1);
            }
            setTimeout(() => resetTurn(), 500);
        }
    }, [choiceOne, choiceTwo]);
    // reset choices and increase turn
	// useEffect(() => {
	// 	const gameFinished = cards.every((card) => card.matched === true);
	// 	console.log(cards);
	// 	console.log(gameFinished);
	// 	if (gameFinished) {
	// 		setWinMessage('Congratualtions! You won!🥳🥳🥳');
	// 	}
	// }, [cards])
    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
        setDisabled(false);
    };

    return (
        <div className="App">
            <h1>Memory game</h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className="card-grid">
                {cards.map((card) => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={
                            card === choiceOne ||
                            card === choiceTwo ||
                            card.matched
                        }
                        disabled={disabled}
                    />
                ))}
            </div>
            <p>Turns: {turns}</p>
			{count === 6 && <p>Congratulations</p>}
        </div>
    );
}

export default App;
