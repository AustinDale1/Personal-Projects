import React, {useState} from 'react';
import Create from './create';

function Review({cards, setCards}){
    const [flip, setFlip] = useState(true);

    const handleFlip = () => {
      setFlip(!flip);
    }
  
    const handleNext = () => {
      console.log("Next");
    }

    const handleReturn = () => {
      console.log("return");
    }

    function displayCard(){
      
      //console.log(cards[0].front);
      if(cards.length === 0){
        return;
      }
      if(flip){
        return cards[0].front;
      }else{
        return cards[0].back;
      }
    }

    return(
        <div>
            <div className="card">
                { <h4><b>{displayCard()}</b></h4> }
            </div>
            <button className="buttony" onClick={handleFlip}>Flip</button>
            <button className="buttony" onClick={handleNext}>Next</button>
            <button className="buttony" onClick={handleReturn}>Return</button>
            <p><a href="http://localhost:3000/">Main Page</a></p>
            
        </div>
    );
}

export default Review;