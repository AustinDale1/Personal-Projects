import React, {useState} from 'react';
import Landing from './landing';

function createFlashcard(front, back){
  console.log(front);
  this.front = front;
  this.back = back;
}

function Landing(){
  const [cards, setCards] = useState([]);
  const [create, setCreate] = useState(false);
  const [review, setReview] = useState(false);

  const handlePrint = () => {
      let index = 0;
      while(index < cards.length){
        console.log("Front: " + cards[index].front + " Back: " + cards[index].back);
        index++;
      }
      
    }

  const handleCreateClick = () => {
      setCreate((create) => !create);
    }
  
  const handleReviewClick = () => {
      setReview((review) => !review);
  }

  function Tester({bool}){
      if(bool){
          return <Create setCards={setCards} cards={cards} handleCallback={CallBack}/>;
      }else{
          return;
      }
  }

  function Test({bool}){
      if(bool){
          return <Review setCards={setCards} cards={cards}/>;
      }else{
          return;
      }
  }

  function Butt({bool, boolean}){
      if(!bool && !boolean){
          return (<>
              <button className="button" onClick={handleCreateClick}>Create new cards</button>
              <button className="button" onClick={handleReviewClick}>Review flashcards</button>    
              <button className="button" onClick={handlePrint}>Print</button>        
          </>
          );
      }
  }

  function CallBack (childData){
      //console.log("call back");
      let i = 0;
      // while(i < childData.length){
      //     console.log("Front: " + childData[i].front + " Back: " + childData[i].back);
      //     i++;
      //   }

      
      // return (
      //     <div>
      //         {/* setCards(["aaaaaaaaaaaaaa"]);
      //         setCards(cards.push(...childData)); */}
      //         {setCards([ ...cards, ...childData])};
      //     </div>
      // )
      
  }

  return(
      <div>
          <Butt bool={create} boolean={review}/>
          <Tester bool={create}/>
          <Test bool={review}/>
          {/* <p>{cards[0]}</p> */}
      </div>
  );
}

function Create(props){

    const handleClear = () => {
        props.setCards([]);
      }
    
      const handlePrint = () => {
        let index = 0;
        while(index < props.cards.length){
          console.log("Front: " + props.cards[index].front + " Back: " + props.cards[index].back);
          index++;
        }
        
      }

      function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        props.setCards( 
          [ 
              ...props.cards, 
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
      <button className="buttony" onClick={handlePrint}>Print</button>
      <p><a href="http://localhost:3000/">Main Page</a></p>
      console.log(props.cards);
      {props.handleCallback(props.cards)}
        </div>
    );
}

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