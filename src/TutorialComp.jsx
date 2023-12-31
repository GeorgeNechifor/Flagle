

import { useState } from "react";
import logo from './images/logo.png';
import model from './images/model.png';
import { useRef } from "react";

function TutorialComponent(props){

   
    const spans = [
       <span key={1} style={{color:'#ec2626'}}>F</span>,
       <span key={2} style={{color:'#adff2f'}}>L</span>,
       <span key={3} style={{color:'#4848f7'}}>A</span>,
       <span key={4} style={{color:'#f7489a'}}>G</span>,
       <span key={5} style={{color:'#fbd12a'}}>L</span>,
       <span key={6} style={{color:'#b92afb'}}>E</span>
    ];

    const [titleDisplay , setTitleDisplay] = useState('none');
    const [firstDisplay , setFirstDisplay] = useState('none');

    titleTimeout();

    const ref = useRef();
    const [log , setLogo] = useState(logo);
    const [text , setText] = useState("Your goal is to guess a country or territory's flag within as few tries as possible")
    return (
        <div className="mainTut" style={{display:props.tut}}>
            <h2 className="tutTitle" style={{display:titleDisplay}}>
                <div className="tit">Welcome to </div>
                <div className="spans">
                   {
                    spans.map(element => {
                        return element;
                    })
                    
                   }
                </div>

            </h2>
            <div className="firstPart" ref={ref} style={{display:firstDisplay}}>
                <div className="countryModelImage"><img className="imag" src={log} alt="" /></div>
                <div className="desc">{text}</div>
            </div>
        </div>
    );

    function titleTimeout(){
        setTimeout(() => {setTitleDisplay('grid')} , 400)
        setTimeout(() => {setFirstDisplay('grid')}, 1500)
        setTimeout(() => {
            setLogo(model);
            setText("After each guess, you will be shown a portion of the flag as well as the distance between the entered country and the answer.")
        }, 5000)
        setTimeout(() => {
            props.setTut('none');
            props.dis("grid");
        } , 10000)

    }
}

export {TutorialComponent};