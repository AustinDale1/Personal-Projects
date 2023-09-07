import React, {useState} from 'react';
import Create from './create';
import Review from './review';

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

export default Landing;