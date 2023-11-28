import '../App.css';
import { useState } from 'react';
  function createFlashcard(front, back){
    this.front = front;
    this.back = back;
    }
  
  function Create({cards, setCards}){


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
      console.log(cards[0]);
    }

  return(
    <div className="createForm">
      <h2>Create New Flashcard</h2>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          <input name="front" defaultValue={"Front"}/>
        </label>
        <label>
          <input name="back" defaultValue={"Back"}/>
        </label>
        <button type="submit" className="createButton">Submit form</button>
      </form>
    </div>
  );
}
  
  export default Create;