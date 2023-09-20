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
  const [cards2, setCards2] = useState([]);
  //0 is landing, 1 is create, 2 is review, 3 is bulkUpload, 4 is file upload
  const [page, setPage] = useState(0);
  const [cardset, setCardset] = useState(0);

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

  const handleBulkClick = () => {
    setPage(3);
  }

  const handleFileClick = () => {
    setPage(4);
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
              <button className="button" onClick={handleBulkClick}>Create flashcards in bulk</button>  
              <button className="button" onClick={handleFileClick}>Create flashcards using file</button>
              {/* <button className="button" onClick={handlePrint}>Print</button>         */}
          </>
          );
      }
  }

  function BulkUploadPage(){
    if(page === 3){
        return <BulkUpload setCards={setCards} cards={cards} setPage={setPage}/>;
    }
      else{
        return;
      }
    }

    function FileUploadPage(){
      if(page === 4){
          return <FileUpload setCards={setCards} cards={cards} setPage={setPage}/>;
      }
        else{
          return;
        }
      }

  return(
      <div>
        {/* The three different pages shown, depends on page state variable */}
          <LandingPage/>
          <CreatePage/>
          <ReviewPage/>
          <BulkUploadPage/>
          <FileUploadPage/>
      </div>
  );
}

function createFlashcard(front, back){
  this.front = front;
  this.back = back;
}

//Probably should combine with uploads
function Create({cards, setCards, cards2, setCards2, setPage}){

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
      <button className="buttony" onClick={handleMain}>Main Page</button>
    </div>
  );
}

function Review({cards, setCards, cards2, setCards2, setPage}){
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
            <button className="cardButtonLeft" onClick={handleReturn}>&lt;</button>
            { <h4><b>{displayCard()}</b></h4> }
            <button className="cardButtonRight" onClick={handleNext}>&gt;</button>
            <button className="cardButtonFlip" onClick={handleFlip}>Flip</button>
            <button className="cardButtonShuffle" onClick={handleShuffle}>Shuffle Deck</button>
            <button className="cardButtonDelete" onClick={handleDelete}>Delete</button>
            <button className="cardButtonEdit" onClick={handleEdit}>Edit</button>
          </div>
          {isEdit?(
             <div>
             <form method="post" onSubmit={handleSubmit}>
               <label>
                 Front of the card: <input name="front" defaultValue={cards[index].front}/>
               </label>
               <label>
                 Back of the card: <input name="back" defaultValue={cards[index].back}/>
               </label>
               <button type="submit">Submit form</button>
             </form>
           </div>
          ) : (
            <></>
          )}
      <div>
        {<h4></h4>}
      </div>
          <button className="mainButton" onClick={handleMain}>Main Page</button>
      </div>
  );
}

function BulkUpload({cards, setCards, cards2, setCards2, setPage}){
  const handleMain = () => {
    setPage(0);
  }

  const handlePrint = () => {
    let index = 0;
    while(index < cards.length){
      console.log("Front: " + cards[index].front + " Back: " + cards[index].back);
      index++;
    }
  }

  function addToCards(a, b){
    console.log(a + " " + b);
    setCards(
      [
        ...cards,
        new createFlashcard(a, b)
      ]
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    //console.log(document.getElementById("postContent").value + "aaaa");
    const arr = document.getElementById("postContent").value.split("\n");
    let c = [];
    for(let i = 0; i < arr.length; i++){
      let a = arr[i].split(":");
      // console.log(a[0] + " " + a[1]);
      // console.log("cards is " + cards);
      //addToCards(a[0], a[1]);
      c = [
        ...c,
        new createFlashcard(a[0], a[1])
      ]
      
    }
    setCards( 
      [ 
        ...cards, 
        ...c
       ]
      );
     console.log("next");
    //here
    // setCards( 
    //   [ 
    //       ...cards, 
    //       //fix here
    //     new createFlashcard(formJson.front, formJson.back)
    //   ]
    // );
  }

  return(
    <div className='BulkCreateForm'>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          <h2>Create Flashcard</h2>
          <textarea
            id="postContent"
            name="postContent"
            rows={4}
            cols={40}
            defaultValue={"Front:Back\nFront:Back"}
          />
        </label>
        <button type="submit" className="buttony">Submit</button>
      </form>
      <button className="buttony" onClick={handleMain}>Main Page</button>
      <button className="buttony" onClick={handlePrint}>Prnt</button>
    </div>
);
}

function FileUpload({cards, setCards, setPage}){
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handleMain = () => {
    setPage(0);
  }
  const handleClear = () => {
    setCards([]);
  }

  const handlePrint = () => {
    let index = 0;
    while(index < cards.length){
      console.log("Front: " + cards[index].front + " Back: " + cards[index].back);
      index++;
    }
  }

  function handleSubmission(e) {
    const reader = new FileReader();
    reader.readAsText(selectedFile);

    reader.onload = function() {
      const arr = reader.result.split("\n");
      let c = [];
      for(let i = 0; i < arr.length; i++){
        let a = arr[i].split(":");
        c = [
          ...c,
          new createFlashcard(a[0], a[1])
        ]
      }
      setCards( 
        [ 
          ...cards, 
          ...c
        ]
      );
    };
    
    
  }

  function changeHandler(e) {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  }

  return(
    <div className='FileUpload'>
      <div>
        <label htmlFor={"filerInput"} className="filerinput">
          <input type="file" name="file" id={"filerInput"} onChange={changeHandler}/>
        </label>
			  
			  <div>
				  <button onClick={handleSubmission} className="filerinput">Submit</button>
          {isFilePicked?(
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
            </div>
          ) : (
            null
          )}
			  </div>
		</div>

      <button className="buttony" onClick={handleMain}>Main Page</button>
      <button className="buttony" onClick={handlePrint}>Prnt</button>
    </div>
  );
}

export default App;
