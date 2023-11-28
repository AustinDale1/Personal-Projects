import { useState } from 'react';
  function createFlashcard(front, back){
    this.front = front;
    this.back = back;
  }

  function Review({cards, setCards}){
    const [flip, setFlip] = useState(true);
    const [index, setIndex] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
  
    function handleSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      let newCard = new createFlashcard(formJson.front, formJson.back);
      let arr = cards;
      arr[index] = newCard;
      setCards(cards => arr);
      setIsEdit(false);
    }
  
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
  
    const handleDelete = () => {
      let c = [
        ...cards
      ];
      for(let i = 0; i < c.length; i++){
        console.log(c[i].front + " " + c[i].back);
      }
      c.splice(index, index+1);
      for(let i = 0; i < c.length; i++){
        console.log(c[i].front + " " + c[i].back);
      }
      setCards(cards => c);
    } 
  
    const handleReturn = () => {
      if(index > 0){
        setIndex(index - 1);
        setFlip(true);
      }else{
        console.log("At first card");
      }
    }
  
    const handleEdit = () => {
      setIsEdit(true);
    } 
  
    //Thx Stack overflow I didn't want to create this method
    const handleShuffle = () => {
      setCards(cards.sort(() => (Math.random() > .5) ? 1 : -1));
      setIndex(0);
      setFlip(true);
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
              <button className="cardButtonLeft" onClick={handleReturn}>&lt;</button>
              <div className="cardText">
                { <h4><b>{displayCard()}</b></h4> }
                </div>
              <button className="cardButtonRight" onClick={handleNext}>&gt;</button>
              <button className="cardButtonFlip" onClick={handleFlip}>Flip</button>
              <button className="cardButtonShuffle" onClick={handleShuffle}>Shuffle Deck</button>
              <button className="cardButtonDelete" onClick={handleDelete}>Delete</button>
              <button className="cardButtonEdit" onClick={handleEdit}>Edit</button>
            </div>
            {isEdit?(
               <div className="createForm">
               <form method="post" onSubmit={handleSubmit}>
                 <label>
                   Front of the card: <input name="front" defaultValue={cards[index].front}/>
                 </label>
                 <label>
                   Back of the card: <input name="back" defaultValue={cards[index].back}/>
                 </label>
                 <button type="submit" className="Gonnahavetofixthiscodelater">Submit form</button>
               </form>
             </div>
            ) : (
              <></>
            )}
        <div>
          {<h4></h4>}
        </div>
        </div>
    );
  }
  
  export default Review;