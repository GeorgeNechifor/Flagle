import { useState } from "react";
import {useRef} from "react";
import { MainList } from "./List";
import './App.css';
import { countryData } from "./Countries";
import { TutorialComponent } from "./TutorialComp";
import Flag from './images/flag.png';
import e from "cors";
function App(props){

    const [rNumber , setNumber] = useState(randomNumber());
    const [currentCountry , setCC] = useState(MainList[rNumber].Name);
    const [url , setUrl] = useState(`https://flagsapi.com/${MainList[rNumber].Code}/flat/64.png`);

    const [country, setCountry] = useState("");
    const [relDisplay , setRelDisplay] = useState("none");

    function getRes(){
        for(let i = 0; i < 249;++i){
            if(MainList[i].Name == country){
                return MainList.Code;
            }
        }
        return false;
    }

    function randomNumber(){
        return Math.floor(Math.random() * 248);
    }

    function checkRep(){
        let ck = false;
        res.map(element => {
            if(element.value == country)
                ck = true;
        })
        return ck;
    }

    const ref = useRef();
    const [winnerValue , setWinnerValue] = useState("You failed");

    function setBlack(value){
        ref.current.style.opacity = value;
    }
    
    const lis = Array(9).fill("block");
    const [res , setRes] = useState([]);
    const [listVal , setListVal] = useState([]);
    const [id , setId] = useState(1);

    function checkNotAgain(val){
        for(let i = 0; i < listVal.length;++i){
            if(val == listVal[i].value)
                return false;
        }

        return true;
    }
    

    function getClose(){
        for(let i = 0; i < MainList.length;++i){
            if(country.length > 0){
                if(MainList[i].Name.substring(0 , country.length) == country.substring(0 , country.length))
                    if(checkNotAgain(MainList[i].Name))
                        setListVal([...listVal , {value:MainList[i].Name , id:listVal.length}])
            }
        }
    }
    let cnt = 0;
    const [winnerState , setWinnerState] = useState('none');

    function getSpecificCnt(val){
        let coord = [];
       Object.keys(countryData).forEach(key => {
            if(val == key)
                coord = [countryData[key].latitude , countryData[key].longitude];
       })

       return coord;
    }

    function getDistance(){
        let first = getSpecificCnt(country);
        let second = getSpecificCnt(currentCountry);

        function distance(lat1,lon1, lat2, lon2)
            {
                lon1 =  lon1 * Math.PI / 180;
                lon2 = lon2 * Math.PI / 180;
                lat1 = lat1 * Math.PI / 180;
                lat2 = lat2 * Math.PI / 180;

                // Haversine formula
                let dlon = lon2 - lon1;
                let dlat = lat2 - lat1;
                let a = Math.pow(Math.sin(dlat / 2), 2)
                        + Math.cos(lat1) * Math.cos(lat2)
                        * Math.pow(Math.sin(dlon / 2),2);
                    
                let c = 2 * Math.asin(Math.sqrt(a));

               
                let r = 6371;

                // calculate the result
                return(c * r);
            }

         return distance(...first , ...second);
    }

    const [mainDisplay , setMainDisplay] = useState('none');
    const [mdis , setmdis] = useState('grid')
    const back = useRef();

    const [give , setGive] = useState('none');
   
    return (

        <div className="Container" >
          <div className="main" style={{display:mainDisplay}}>
            <div className="images">
                <img className="image" src={url} alt="image" />
                <div className="black" ref={ref}>
                    <div className="mainC">
                        {
                            lis.map(element => {
                                cnt++;
                                return (<div className="box" key={cnt} id={cnt}>
                                </div>);
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="text_field">

                <div className="user">
                    <input className="input" value={country} type="text" placeholder="Country Name"
                        onChange={(event) => {
                            try{
                                setCountry(event.target.value[0].toUpperCase() + event.target.value.substring(1 , event.target.value.length));
                            }
                            catch(error){
                                setCountry('');
                            }
                            
                            
                            if(event.target.value != ""){
                                setRelDisplay("grid");
                                getClose();
                            } else
                                setRelDisplay("none") , setListVal([]);
                            
                        }}
                        onClick={event => {event.target.value = ""}}

                    />
                    <button className="btn"
                        
                        onClick={() => {
                        if(getRes() != false){
                                if(country == currentCountry){
                                    setBlack(0) , setWinnerValue("You guessed the flag");
                                    setTimeout(() => {setWinnerState('grid')} , 2000)
                                    setRelDisplay('none') , setListVal([]);
                                }
                                else
                                    if(!checkRep()){
                                        addElement(Math.floor(getDistance())) , setRelDisplay("none") , setListVal([]);
                                        document.getElementById(id).style.transform = 'scale(0)'
                                        setId(id + 1);
                                        if(id > 8){
                                            setTimeout(() => {setWinnerState('grid')} , 1000)
                                            setRelDisplay('none') , setListVal([]);
                                            setWinnerValue("You failed");
                                        }
                                        else if(id >= 3)
                                            setGive('block');
                                        
                                    }   
                        }

                        }}
                    
                    >Guess</button>
                </div>

                <div className="relat" >
                    <div className="related" style={{display:relDisplay}}>
                        <div className="list">
                            {
                            
                            listVal.map(options => {
                                return (<div className="el" key={options.id} onClick={
                                    (event) => {
                                        setCountry(event.target.textContent);
                                        
                                    }
                                }>{options.value}</div>);

                            })}
                        </div>
                    </div>
                    <div className="guesses_list">
                    {
                        res.map(element => {

                            const searchFlag = () => {
                                for(let i = 0; i < MainList.length;++i){
                                    if(MainList[i].Name == element.value)
                                        return MainList[i].Code;
                                }
                            }

                            return (<div className="res" key={element.id}>
                                <div className="name">{element.value}</div>
                                <div className="fet">
                                    <div className="flag"><img className="litImg" src={`https://flagsapi.com/${searchFlag()}/flat/64.png`} alt="" /></div>
                                    <div className="delta">{element.distance}km</div>
                                </div>
                            </div>)
                        })
                    }
                 </div>
             </div>

            </div>
            <button className="give" style={{display:give}} onClick={() => {
                setTimeout(() => {setWinnerState('grid')} , 300)
                setWinnerValue("You failed!");

            }}>Give Up?</button>
          </div>
          <WinnerComponent 
                display={winnerState} 
                count={currentCountry} 
                win={winnerValue}
                score={9 - res.length}>
          </WinnerComponent>

          <TutorialComponent
                dis={setMainDisplay}
                tut={mdis}
                setTut={setmdis}
          ></TutorialComponent>
        </div>

    );

    function gameOver(){
        let number = randomNumber();
        setNumber(number);
        setCC(MainList[number].Name);
        setUrl(`https://flagsapi.com/${MainList[number].Code}/flat/64.png`);
        setCountry('');
        setId(1);
        setRes([]);
        restoreBox();
        setWinnerState('none');
        setBlack(1);
        setGive('none');
    }

    function addElement(number){
        setRes([...res , {
            value:country,
            taken:true,
            id:res.length,
            distance:number
        }])
    }

    function getCurrentFlag(name){
        for(let i = 0; i < MainList.length;++i){
            if(MainList[i].Name == name)
                return MainList[i].Code;
        }

        return false;
    }

    function restoreBox(){
        for(let i = 1; i <= 9;++i){
            document.getElementById(JSON.stringify(i)).style.transform =  'scale(1)';
        }
    }


    function WinnerComponent(props){
        return (
            <div className="mainComponent" ref={back} style={{display:props.display}}>
                <h2 className="title">
                   {props.win}
                </h2>
                <div className="info">
                    <div className="preg">The country is:</div>
                    <div className="countryName">{props.count}</div>
                    <div className="countryFlag"><img src={`https://flagsapi.com/${getCurrentFlag(props.count)}/flat/64.png`} alt="image" /></div>
                </div>
                <div className="score">
                    <div className="sc">Score:</div>
                    <div className="number">{props.score}</div>
                </div>
                <div className="newgame"
                    onClick={() => {
                       gameOver();
                    }}
                >New Game</div>
            </div>
        );
    }
}

function Navigation(){
    return (
       <div className="navbar">
           <h1 className="titles">
                <div className="txt">Flagle</div>
                <img className="flg" src={Flag} alt="" />
           </h1>
           <div className="mood"></div>
       </div>
    );


}

export {App , Navigation};
