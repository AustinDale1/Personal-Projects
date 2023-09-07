import React, {useState} from 'react';
import "./App.css";

function App() {
  return (
    <div className='main'>
      <Landing/>
    </div>
  );
}

function Landing(){
  const [cards, setCards] = useState([]);
  //0 is landing, 1 is create, 2 is review
  const [page, setPage] = useState(0);
  const [cardset, setCardset] = useState("");

  //Mainly for testing purposes, not in use currently
  const handlePrint = () => {
      let index = 0;
      while(index < cards.length){
        console.log("Front: " + cards[index].front + " Back: " + cards[index].back);
        index++;
      } 
    }

  const handleCreateClick = () => {
      setPage(1);
    }
  
  const handleReviewClick = () => {
    setPage(2);
  }

  function CreatePage(){
      if(page === 1){
          return <Create setCards={setCards} cards={cards} page={page} setPage={setPage}/>;
      }else{
          return;
      }
  }

  function ReviewPage(){
      if(page === 2){
          return <Review setCards={setCards} cards={cards} page={page} setPage={setPage}/>;
      }else{
          return;
      }
  }

  function LandingPage(){
      if(page === 0){
          return (<>
              <button className="button" onClick={handleCreateClick}>Create new cards</button>
              <button className="button" onClick={handleReviewClick}>Review flashcards</button>    
              {/* <button className="button" onClick={handlePrint}>Print</button>         */}
          </>
          );
      }
  }

  return(
      <div>
        {/* The three different pages shown, depends on page state variable */}
          <LandingPage/>
          <CreatePage/>
          <ReviewPage/>
      </div>
  );
}

function createFlashcard(front, back){
  this.front = front;
  this.back = back;
}

function Create({cards, setCards, setPage}){
  const handleClear = () => {
      setCards([]);
    }

    const handleMain = () => {
      setPage(0);
    }
  
    //Against for testing purposes, not in use currently
    const handlePrint = () => {
      let index = 0;
      while(index < cards.length){
        console.log("Front: " + cards[index].front + " Back: " + cards[index].back);
        index++;
      }
    }

    function handleSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      setCards( 
        [ 
            ...cards, 
          new createFlashcard(formJson.front, formJson.back)
        ]
      );
    }

  return(
    
      <div>
          <form method="post" onSubmit={handleSubmit}>
      <label>
        Front of the card: <input name="front" />
      </label>
      <label>
        Back of the card: <input name="back" />
      </label>
      <button type="submit">Submit form</button>
    </form>
    <button className="buttony" onClick={handleClear}>Clear</button>
    <button className="buttony" onClick={handleMain}>Main Page</button>
      </div>
  );
}

function Review({cards, setCards, setPage}){
  const [flip, setFlip] = useState(true);
  const [index, setIndex] = useState(0);

  const handleFlip = () => {
    setFlip(!flip);
  }

  const handleNext = () => {
    if(cards.length > index + 1){
      setIndex(index + 1);
      setFlip(true);
    } else{
      console.log("at end");
    }
  }

  const handleReturn = () => {
    if(index > 0){
      setIndex(index - 1);
      setFlip(true);
    }else{
      console.log("At first card");
    }
  }

  //Thx Stack overflow I didn't want to create this method
  const handleShuffle = () => {
    setCards(cards.sort(() => (Math.random() > .5) ? 1 : -1));
    setIndex(0);
  }

  const handleMain = () => {
    setPage(0);
  }

  function displayCard(){
    if(cards.length === 0){
      console.log("No cards");
      return;
    }
    if(flip){
      return cards[index].front;
    }else{
      return cards[index].back;
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
          <button className="buttony" onClick={handleShuffle}>Shuffle Deck</button>
          <button className="buttony" onClick={handleMain}>Main Page</button>

          
      </div>
  );
}

export default App;
