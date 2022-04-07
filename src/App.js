import React, {
  useEffect,
  useState
} from "react";
import LineHeight from './components/LineHeight';
import OneBox from "./components/OneBox";
import ReactDOM from "react-dom";

const App = () => {
  const [lists, setLists] = useState(["1", "2", "3", "4", "5", "6", "7", "8"]);

  const [ThePionSelected, setThePionSelected] = useState({})
  const [MagicBordersPosibility, setMagicBordersPosibility] = useState([])

  const [colorTurn,setColorTurn] = useState("white")

  const [blackPackage,setBlackPackage] = useState([]);
  const [whitePackage,setwhitePackage] = useState([])

  useEffect(() => {
    if (ThePionSelected.id) {
      document.querySelectorAll(".magicBorder").forEach(el => {
        el.classList.remove("magicBorder")
      })
      document.querySelectorAll(".magicBorderRed").forEach(el=>{
        el.classList.remove("magicBorderRed")
      })
      document.querySelectorAll(".magicBorderRedSpe").forEach(el=>{
        el.classList.remove("magicBorderRedSpe")
      })

      if (ThePionSelected.type === "pion") {
        if(ThePionSelected.direction==="up"){
          setMagicBordersPosibility([])
          const allBases = []
          
          for (let index = 8; index >0; index--) {
            allBases.push(document.getElementById(`lnh${index}`))
          }
  
          const mineX = ThePionSelected.id.split("")[3]
          const mineY = ThePionSelected.id.split("")[2]
  
          //("x:"+mineX + "  y:"+mineY)
  
          
          let pounce = true;
          allBases.forEach(base=>{
            for (let index = 0; index < 8; index++) {
              const pionY = Math.floor(ThePionSelected.id.split("")[2]);
              const pionX = Math.floor(ThePionSelected.id.split("")[3]);
    
              const baseY = Math.floor(base.children[0].children[index].id.split("")[2])
              const baseX = Math.floor(base.children[0].children[index].id.split("")[3])
  
          
              if(pounce&&base.children[0].children[index].id.split("")[3]+""===ThePionSelected.id.split("")[3]+""){
                if(pionY>6){
                  if(pionY-baseY<=2&&baseY<pionY){
                    if(!base.children[0].children[index].children[0].children[0]){
                      base.children[0].children[index].classList.add("magicBorder")
                    }else{
                      pounce = false;
                    }
                  }
                }else{
                  if(pionY-baseY<=1&&baseY<pionY){
                    if(!base.children[0].children[index].children[0].children[0]){
                      base.children[0].children[index].classList.add("magicBorder")
                    }else{
                      pounce = false;
                    }
          
                  }
                }
              }
              if(baseX-pionX===1||baseX-pionX===-1){
                if(baseY-pionY===1||baseY-pionY===-1){
                  if(baseY<pionY){
                    //(base.children[0].children[index].children[0].children[0])
                    if(base.children[0].children[index].children[0].children[0]&&base.children[0].children[index].children[0].children[0].classList[2]+""!==ThePionSelected.color+""){
                      base.children[0].children[index].classList.add("magicBorderRed")
                    }
               
                  }
                  
                }
              }
        
            }
          })
        }else if(ThePionSelected.direction==="down"){
          setMagicBordersPosibility([])
          const allBases = []
          
          for (let index = 1; index <=8; index++) {
            allBases.push(document.getElementById(`lnh${index}`))
          }
  
          const mineX = ThePionSelected.id.split("")[3]
          const mineY = ThePionSelected.id.split("")[2]
  
          //("x:"+mineX + "  y:"+mineY)
    
          let pounce = true;
          
          allBases.forEach(base=>{
            for (let index = 0; index < 8; index++) {
              const pionY = Math.floor(ThePionSelected.id.split("")[2]);
              const pionX = Math.floor(ThePionSelected.id.split("")[3]);
    
              const baseY = Math.floor(base.children[0].children[index].id.split("")[2])
              const baseX = Math.floor(base.children[0].children[index].id.split("")[3])
  
              if(pounce&&base.children[0].children[index].id.split("")[3]+""===ThePionSelected.id.split("")[3]+""){
                if(pionY<3){
                  if(baseY-pionY<=2&&baseY>pionY){
                    if(!base.children[0].children[index].children[0].children[0]&&pounce){ 
                      base.children[0].children[index].classList.add("magicBorder")
                    }else{
                      pounce = false;
                    }
                  }
                }else{
                  if(baseY-pionY<=1&&baseY>pionY){
                    if(!base.children[0].children[index].children[0].children[0]){
                      base.children[0].children[index].classList.add("magicBorder")
                    }else{
                      pounce = false;
                    }
          
                  }
                }
                
              }
              if(baseX-pionX===1||baseX-pionX===-1){
                if(baseY-pionY===1||baseY-pionY===-1){
                  if(baseY>pionY){
                    //(base.children[0].children[index].children[0].children[0])
                    if(base.children[0].children[index].children[0].children[0]&&base.children[0].children[index].children[0].children[0].classList[2]+""!==ThePionSelected.color+""){
                      base.children[0].children[index].classList.add("magicBorderRed")
                    }
               
                  }
                  
                }
              }
            }
          })
        }
      }
      if(ThePionSelected.type === "rider"){
        setMagicBordersPosibility([])
        const number = ThePionSelected.lineHeightIndex + 1
        const baseOne = document.getElementById(`lnh${number-1}`)
        const baseTwo = document.getElementById(`lnh${number-2}`)
        const baseThree = document.getElementById(`lnh${number+1}`)
        const baseFour = document.getElementById(`lnh${number+2}`)

        //(number)
        const potontialElemBorderOne = baseOne&&baseOne.children[0].children[Math.floor(ThePionSelected.id.split("")[3])-3]
        const potontialElemBorderTwo = baseOne&&baseOne.children[0].children[Math.floor(ThePionSelected.id.split("")[3])+1]
        const potontialElemBorderThree = baseTwo&&baseTwo.children[0].children[Math.floor(ThePionSelected.id.split("")[3])]
        const potontialElemBorderFour = baseTwo&&baseTwo.children[0].children[Math.floor(ThePionSelected.id.split("")[3])-2]
        const potontialElemBorderFive = baseThree&&baseThree.children[0].children[Math.floor(ThePionSelected.id.split("")[3])-3]
        const potontialElemBorderSix = baseThree&&baseThree.children[0].children[Math.floor(ThePionSelected.id.split("")[3])+1]
        const potontialElemBorderSeven = baseFour&&baseFour.children[0].children[Math.floor(ThePionSelected.id.split("")[3])]
        const potontialElemBorderEight = baseFour&&baseFour.children[0].children[Math.floor(ThePionSelected.id.split("")[3])-2]
       
        const AllPotontialElemBorder = [potontialElemBorderOne,potontialElemBorderTwo,potontialElemBorderThree,potontialElemBorderFour,potontialElemBorderFive,potontialElemBorderSix,potontialElemBorderSeven,potontialElemBorderEight]

        //(AllPotontialElemBorder);
        AllPotontialElemBorder.forEach(potEl=>{
          //("bouclé")
          if(potEl){
            if(!potEl.children[0].children[0]){
              potEl.classList.add("magicBorder")
              setMagicBordersPosibility(prev => [...prev, {
                lnhId: `lnh${number-1}`,
                id: potEl.id,
                indexInLine: potEl.id.split("ow")[1]?potEl.id.split("ow")[1]:potEl.id.split("on")[1]?potEl.id.split("on")[1]:potEl.id.split("ob")[1],
                lnhIdNumber: number - 1,
                pos: "first"
              }])
            }else{
              if(potEl.children[0].children[0].classList[2]+""!==ThePionSelected.color+""){
                potEl.classList.add("magicBorderRed")
              }
            }
          }
        })
      }
      if(ThePionSelected.type === "castle"||ThePionSelected.type==="queen"){
        const allBases = []
        
        for (let index = 8; index >0; index--) {
          allBases.push(document.getElementById(`lnh${index}`))
        }

        const mineX = ThePionSelected.id.split("")[3]
        const mineY = ThePionSelected.id.split("")[2]

        //("x:"+mineX + "  y:"+mineY)

        const mineYSofisticatedToHigh = mineY==="8"?0:mineY==="7"?1:mineY==="6"?2:mineY==="5"?3:mineY==="4"?4:mineY==="3"?5:mineY==="2"?6:mineY==="1"?7:8
        let pionRangementX = Math.floor(ThePionSelected.id.split("")[3])

        let iCan = true
        let iCanTwo = true
        let iCanThree = true
        let iCanFour = true
        for (let index = mineYSofisticatedToHigh+1; index < 8; index++) {
          if(iCan){
            //(allBases[index].children[0].children[pionRangementX-1].children[0])
            if(allBases[index].children[0].children[pionRangementX-1].children[0].children[0]&&allBases[index].children[0].children[pionRangementX-1].children[0].children[0].classList[2]+""!==ThePionSelected.color+""){
              allBases[index].children[0].children[pionRangementX-1].classList.add("magicBorderRed")
              iCan = false;
            }
            if(!allBases[index].children[0].children[pionRangementX-1].children[0].children[0]){
              allBases[index].children[0].children[pionRangementX-1].classList.add("magicBorder")
            }else{
              iCan = false
            }
          }
        }
        for (let index = mineYSofisticatedToHigh-1; index > -8; index--) {
          if(iCanTwo&&allBases[index]){
            if(!allBases[index].children[0].children[pionRangementX-1].children[0].children[0]){
              allBases[index].children[0].children[pionRangementX-1].classList.add("magicBorder")
            }else{
              if(allBases[index].children[0].children[pionRangementX-1].children[0].children[0]&&allBases[index].children[0].children[pionRangementX-1].children[0].children[0].classList[2]+""!==ThePionSelected.color+""){
                allBases[index].children[0].children[pionRangementX-1].classList.add("magicBorderRed")
              }
              iCanTwo = false
            }
          }
        }
        for (let index = mineX-1; index >= 0; index--) {
          if(iCanThree&&allBases[mineYSofisticatedToHigh].children[0].children[index].id+""!==ThePionSelected.id+""){
            if(!allBases[mineYSofisticatedToHigh].children[0].children[index].children[0].children[0]){
              allBases[mineYSofisticatedToHigh].children[0].children[index].classList.add("magicBorder")
            }else{
              if(allBases[mineYSofisticatedToHigh].children[0].children[index].children[0].children[0]&&allBases[mineYSofisticatedToHigh].children[0].children[index].children[0].children[0].classList[2]+""!==ThePionSelected.color+""){
                allBases[mineYSofisticatedToHigh].children[0].children[index].classList.add("magicBorderRed")
              }
              iCanThree = false;
            }
          }
        }
        for (let index = mineX; index < 8; index++) {
          if(iCanFour){
            if(!allBases[mineYSofisticatedToHigh].children[0].children[index].children[0].children[0]){
              allBases[mineYSofisticatedToHigh].children[0].children[index].classList.add("magicBorder")
            }else{
              //(allBases[mineYSofisticatedToHigh].children[0].children[index].children[0].children[0])
              if(allBases[mineYSofisticatedToHigh].children[0].children[index].children[0].children[0]&&allBases[mineYSofisticatedToHigh].children[0].children[index].children[0].children[0].classList[2]+""!==ThePionSelected.color+""){
                allBases[mineYSofisticatedToHigh].children[0].children[index].classList.add("magicBorderRed")
              }
              iCanFour = false
           
            }
          }
        }
      }
      if(ThePionSelected.type === "crazy"||ThePionSelected.type==="queen"){
        const allBases = []
        
        for (let index = 8; index >0; index--) {
          allBases.push(document.getElementById(`lnh${index}`))
        }
        const mineX = ThePionSelected.id.split("")[3]
        const mineY = ThePionSelected.id.split("")[2]

        //("x:"+mineX + "  y:"+mineY)

        const mineYSofisticatedToHigh = mineY==="8"?0:mineY==="7"?1:mineY==="6"?2:mineY==="5"?3:mineY==="4"?4:mineY==="3"?5:mineY==="2"?6:mineY==="1"?7:8

        let marge = mineX-2;
        let margeTwo = mineX;
        let margeThree = mineX;
        let margeFour = mineX-2;

        let canOne = true;
        let canTwo = true;
        let canThree = true;
        let canFour = true;
        for (let index = mineYSofisticatedToHigh; index < 8; index++) {
          marge+=1;
          //(allBases[index].children[0].children[marge])
          if(canOne&&allBases[index].children[0].children[marge]&&allBases[index].children[0].children[marge].id+""!==ThePionSelected.id+""){
            if(!allBases[index].children[0].children[marge].children[0].children[0]){
              allBases[index].children[0].children[marge].classList.add("magicBorder")
            }else{
              //()
              if(allBases[index].children[0].children[marge].children[0].children[0]&&allBases[index].children[0].children[marge].children[0].children[0].classList[2]+""!==ThePionSelected.color+''){
                allBases[index].children[0].children[marge].classList.add("magicBorderRed")
                canOne = false
              }
              else{
                canOne = false
              }
            }
          }
        }
        for (let index = mineYSofisticatedToHigh; index <8; index++) {
          margeTwo-=1
          if(canTwo&&allBases[index].children[0].children[margeTwo]&&allBases[index].children[0].children[margeTwo].id+""!==ThePionSelected.id+""){
            if(!allBases[index].children[0].children[margeTwo].children[0].children[0]){
              allBases[index].children[0].children[margeTwo].classList.add("magicBorder")
            }else{
              canTwo = false;
              if(allBases[index].children[0].children[margeTwo].children[0].children[0]&&allBases[index].children[0].children[margeTwo].children[0].children[0].classList[2]+""!==ThePionSelected.color+""){
                allBases[index].children[0].children[margeTwo].classList.add("magicBorderRed")
              }
            }
           
          }
        }
        for (let index = mineYSofisticatedToHigh; index >= 0; index--) {
          margeThree-=1
     
          if(canThree&&allBases[index].children[0].children[margeThree]&&allBases[index].children[0].children[margeThree].id+""!==ThePionSelected.id+""){
            if(!allBases[index].children[0].children[margeThree].children[0].children[0]){
              allBases[index].children[0].children[margeThree].classList.add("magicBorder")
            }else{
              canThree = false
              if(allBases[index].children[0].children[margeThree].children[0].children[0]&&allBases[index].children[0].children[margeThree].children[0].children[0].classList[2]+""!==ThePionSelected.color+""){
                allBases[index].children[0].children[margeThree].classList.add("magicBorderRed")
              }
            }
          }
        }
        for (let index = mineYSofisticatedToHigh; index >= 0; index--) {
          margeFour+=1
          //(allBases[index])
          //(margeFour)
     
          if(canFour&&allBases[index].children[0].children[margeFour]&&allBases[index].children[0].children[margeFour].id+""!==ThePionSelected.id+""){
            if(!allBases[index].children[0].children[margeFour].children[0].children[0]){
              allBases[index].children[0].children[margeFour].classList.add("magicBorder")
            }else{
              canFour = false;
              if(allBases[index].children[0].children[margeFour].children[0].children[0]&&allBases[index].children[0].children[margeFour].children[0].children[0].classList[2]+""!==ThePionSelected.color+""){
                allBases[index].children[0].children[margeFour].classList.add("magicBorderRed")
              }
            }
            
          }
        }
      }
      if(ThePionSelected.type === "king"){
        const allBases = []
        
        for (let index = 8; index >0; index--) {
          allBases.push(document.getElementById(`lnh${index}`))
        }
        const mineX = ThePionSelected.id.split("")[3]
        const mineY = ThePionSelected.id.split("")[2]

        //("x:"+mineX + "  y:"+mineY)

        const mineYSofisticatedToHigh = mineY==="8"?0:mineY==="7"?1:mineY==="6"?2:mineY==="5"?3:mineY==="4"?4:mineY==="3"?5:mineY==="2"?6:mineY==="1"?7:8

        let canWe = true
        if(canWe){
          allBases.forEach(base=>{
            //("king pos x:" + mineX + "   and actual base x pos:")
            //(base.children[0].children[0])
            for (let index = 0; index < 8; index++) {
              if(base.children[0].children[index]&&Math.floor(ThePionSelected.id.split("")[2])-Math.floor(base.children[0].children[index].id.split("")[2])<=1&&Math.floor(ThePionSelected.id.split("")[2])-Math.floor(base.children[0].children[index].id.split("")[2])>=-1){
                if(Math.floor(ThePionSelected.id.split("")[3])-Math.floor(base.children[0].children[index].id.split("")[3])<=1&&Math.floor(ThePionSelected.id.split("")[3])-Math.floor(base.children[0].children[index].id.split("")[3])>=-1){
                  if(!base.children[0].children[index].children[0].children[0]){
                    base.children[0].children[index].classList.add("magicBorder")
                  }
                  else{
                    canWe = false
                    if(base.children[0].children[index].children[0].children[0].classList[2]+""!==ThePionSelected.color+""){
                      base.children[0].children[index].classList.add("magicBorderRed")
                    }
                  }
                }
              }
            }
          })
        }
        
      }
      if(ThePionSelected.type === "queen"){
        
      }

    } else {
      document.querySelectorAll(".magicBorder").forEach(el => {
        el.classList.remove("magicBorder")
      })
      document.querySelectorAll(".magicBorderRed").forEach(el => {
        el.classList.remove("magicBorderRed")
      })
      document.querySelectorAll(".magicBorderRedSpe").forEach(el => {
        el.classList.remove("magicBorderRedSpe")
      })
    }
    
    
  }, [ThePionSelected,setThePionSelected])

  return (
    <>
      <div className="theDaron">
        <div id="bgImageYN"></div>
        <div id="bgBlackYN"></div>
        <div className="containerOfALL">
          <div className="ourBOXS">
            {
                lists.map((a,n)=>{
                  return <LineHeight whitePackage = {whitePackage} blackPackage = {blackPackage} setwhitePackage = {setwhitePackage} setBlackPackage = {setBlackPackage}  colorTurn = {colorTurn} setColorTurn = {setColorTurn} setMagicBordersPosibility = {setMagicBordersPosibility} ThePionSelected = {ThePionSelected} setThePionSelected = {setThePionSelected} index = {n}/>
                })
            }
            
          </div>
        </div>
      </div>
    </>
  )
}
export default App;