import { useState } from 'react';
import OneBox from './OneBox';

const LineHeight = ({index,setThePionSelected,ThePionSelected,setMagicBordersPosibility,colorTurn,setColorTurn,whitePackage,setwhitePackage,blackPackage,setBlackPackage}) => {
    const [lists,setLists] = useState(["1","2","3","4","5","6","7","8"])

    const [isEven,setIsEven] = useState(index % 2 === 0)
    return(
        <div className={`oneLineHeight`} id={`lnh${index+1}`}>
            <div className={`containerOfLnh`}>
                {lists.map((list,n)=>{
                    if(index+1===2){
                        return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='b' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} direction="down" debute={isEven} index ={n} type = "pion" image = "https://www.mathsisfun.com/games/images/chess/stdbp.png" />
                    }
                    else if(index+1===7){
                        return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='w' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} direction="up" debute={isEven} index ={n} type = "pion" image = "https://www.mathsisfun.com/games/images/chess/stdwp.png" />
                    }
                    else if(index+1===1){
                        if(n===0||n===7){
                            return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='b' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} direction="down" debute={isEven} index ={n} type = "castle" image = "https://www.mathsisfun.com/games/images/chess/stdbr.png" />
                        }
                        else if(n===1||n===6){
                            return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='b' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} direction="down" debute={isEven} index ={n} type = "rider" image = "https://www.mathsisfun.com/games/images/chess/stdbn.png" />
                        }
                        else if(n===2||n===5){
                            return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='b' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} direction="down" debute={isEven} index ={n} type = "crazy" image = "https://www.mathsisfun.com/games/images/chess/stdbb.png" />
                        }
                        else if(n===3){
                            return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='b' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} direction="down" debute={isEven} index ={n} type = "queen" image = "https://www.mathsisfun.com/games/images/chess/stdbq.png" /> 
                        }
                        else if(n===4){
                            return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='b' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} direction="down" debute={isEven} index ={n} type = "king" image = "https://www.mathsisfun.com/games/images/chess/stdbk.png" />
                        }
                        else{
                            return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='b' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} debute={isEven} index ={n} direction="down" />
                        }
                    }
                    else if(index+1===8){
                        if(n===0||n===7){
                            return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='w' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} direction="up" debute={isEven} index ={n} type = "castle" image = "https://www.mathsisfun.com/games/images/chess/stdwr.png" />
                        }
                        else if(n===1||n===6){
                            return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='w' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} direction="up" debute={isEven} index ={n} type = "rider" image = "https://www.mathsisfun.com/games/images/chess/stdwn.png" />
                        }
                        else if(n===2||n===5){
                            return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='w' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} direction="up" debute={isEven} index ={n} type = "crazy" image = "https://www.mathsisfun.com/games/images/chess/stdwb.png" />
                        }
                        else if(n===3){
                            return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='w' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} direction="up" debute={isEven} index ={n} type = "queen" image = "https://www.mathsisfun.com/games/images/chess/stdwq.png" /> 
                        }
                        else if(n===4){
                            return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='w' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} direction="up" debute={isEven} index ={n} type = "king" image = "https://www.mathsisfun.com/games/images/chess/stdwk.png" />
                        }
                        else{
                            return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} bORw='w' lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} debute={isEven} index ={n} direction="up" />
                        }
                    }
                    else{
                        return <OneBox whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage} colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} lineHeightIndex = {index} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} debute={isEven} index ={n} direction="none" />
                    }
                
                })}
            </div>
        </div>
    )
}

export default LineHeight;