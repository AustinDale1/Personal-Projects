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
  //0 is landing, 1 is create, 2 is review, 3 is bulkUpload, 4 is file upload
  const [page, setPage] = useState(0);

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

  function DisplayPage(){
    if(page === 0){
      return (<>
          <button className="button" onClick={handleCreateClick}>Create new cards</button>
          <button className="button" onClick={handleReviewClick}>Review flashcards</button>    
          <button className="button" onClick={handleBulkClick}>Create flashcards in bulk</button>  
          <button className="button" onClick={handleFileClick}>Create flashcards using file</button>
      </>
      );
    } else if(page === 1){
      return <Create setCards={setCards} cards={cards} page={page} setPage={setPage}/>;
    } else if(page === 2){
      return <Review setCards={setCards} cards={cards} page={page} setPage={setPage}/>;
    } else if(page === 3){
      return <BulkUpload setCards={setCards} cards={cards} setPage={setPage}/>;
    } else if(page === 4){
      return <FileUpload setCards={setCards} cards={cards} setPage={setPage}/>;
    }
  }

  return(
      <div>
          <DisplayPage/>
      </div>
  );
}

function createFlashcard(front, back){
  this.front = front;
  this.back = back;
}

//Probably should combine with uploads
function Create({cards, setCards, setPage}){

    const handleMain = () => {
      setPage(0);
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
          <input name="front" placeholder={"Front"}/>
        </label>
        <label>
          <input name="back" placeholder={"Back"}/>
        </label>
        <button type="submit" className="createButton">Submit form</button>
      </form>
      <button className="buttony" onClick={handleMain}>Main Page</button>
    </div>
  );
}

function Review({cards, setCards, cardContainer, setcardContainer, setPage}){
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
    setCards(arr);
    setIsEdit(false);
  }

  const handleFlip = () => {
    setFlip(!flip);
  }

  const handleNext = () => {
    if(cards.length > index + 1){
      setIndex(index + 1);
      setFlip(true);
    } 
  }

  const handleDelete = () => {
    let c = [
      ...cards
    ];
    c.splice(index, index+1);
    setCards(cards => c);
  } 

  const handleReturn = () => {
    if(index > 0){
      setIndex(index - 1);
      setFlip(true);
    }
  }

  const handleEdit = () => {
    if(cards.length === 0){
      return;
    }
    setIsEdit(true);
  } 

  //Thx Stack overflow I didn't want to create this method
  const handleShuffle = () => {
    setCards(cards.sort(() => (Math.random() > .5) ? 1 : -1));
    setIndex(0);
    setFlip(true);
  }

  const handleMain = () => {
    setPage(0);
  }

  function displayCard(){
    if(cards.length === 0){
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
          <button className="buttony" onClick={handleMain}>Main Page</button>
      </div>
  );
}

function BulkUpload({cards, setCards, setPage}){
  const handleMain = () => {
    setPage(0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const arr = document.getElementById("postContent").value.split("\n");
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
  }

  return(
    <div className='BulkCreateForm'>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          <h2>Create Flashcard</h2>
          <textarea
            id="postContent"
            name="postContent"
            rows={10}
            cols={40}
            placeholder={"Front:Back\nFront:Back"}
          />
        </label>
        <button className="buttony" onClick={handleMain} style={{float:"left"}}>Main Page</button>
        <button type="submit" className="createButton">Submit</button>
      </form>
    </div>
);
}

function FileUpload({cards, setCards, setPage}){
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handleMain = () => {
    setPage(0);
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
        <label htmlFor={"filerInput"} className="buttony">Enter file
          <input type="file" name="file" id={"filerInput"} onChange={changeHandler} style={{display: 'none'}}/>
        </label>
			  
			  <div>
				  
          {isFilePicked?(
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
            </div>
          ) : (
            <div>   
              <br></br><br></br><br></br><br></br><br></br>
            </div>
          )}
			  </div>
		  </div>
      
      <button className="buttony" onClick={handleMain}>Main Page</button>
      <button onClick={handleSubmission} className="buttony">Submit</button>
    </div>
  );
}

export default App;
