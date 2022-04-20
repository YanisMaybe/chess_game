import React, {
    useEffect,
    useState
} from "react";

const OneBox = ({
    index,
    debute,
    type,
    image,
    direction,
    ThePionSelected,
    setThePionSelected,
    lineHeightIndex,
    anonymous,
    bORw,
    setMagicBordersPosibility,
    colorTurn,
    setColorTurn,
    whitePackage,
    setwhitePackage,
    setIsInChessMate,
    blackPackage,
    setBlackPackage
}) => {

    let theColorOne = "#92897e"
    let theColorTwo = "#ada295"

    if (debute) {
        theColorOne = "#ada295"
        theColorTwo = "#92897e"
    } else {
        theColorOne = "#92897e"
        theColorTwo = "#ada295"
    }

    let theKingIsInDanger = false;

    const onClickInPiece = (e) => {
        let myCol = bORw === "b" ? "black" : "white"

        if (myCol + "" === colorTurn + "") {
            //("on est la au moin c cool")
            let mine = e.target.parentElement.parentElement.parentElement

            if (e.target.classList[0] === "reduceScale") {
                //("c pas encore d'la merde")
                e.target.classList.remove("reduceScale")

                setThePionSelected({})
                //setElm([])
                setMagicBordersPosibility([])
            } else {


                const allPieces = document.querySelectorAll(".onePiece");
                //(e.target.parentElement)
                setThePionSelected({
                    id: mine.id,
                    type: e.target.parentElement.classList[1],
                    direction: direction,
                    index: index + 1,
                    lineHeightIndex: Math.floor(document.getElementById(mine.id).id.split("")[2]) - 1,
                    color: bORw === "b" ? "black" : "white"
                })

                allPieces.forEach(bx => {
                    if (bx.children[0].classList[0] === "reduceScale") {
                        bx.children[0].classList.remove("reduceScale")
                    }
                })

                e.target.classList.add("reduceScale")
            }
        }

    }
    const onClickInBox = (e) => {

        const kings = document.querySelectorAll(".oneBox .king")

        const target = e.target.parentElement
        const anotherTarget = e.target.parentElement.parentElement.parentElement

        const realTarget = target.classList[0] === "oneBox" ? target : anotherTarget.classList[0] === "oneBox" && anotherTarget;
        if (ThePionSelected.id && (realTarget.classList[1] === "magicBorder" || realTarget.classList[1] === "magicBorderRed")) {
            setIsInChessMate(false)
            if (ThePionSelected.type === "king") {
                kings.forEach(() => {
                    let kingY = target.classList[0] === "oneBox" ? Math.floor(target.id.split("")[2]) : anotherTarget.classList[0] === "oneBox" && Math.floor(anotherTarget.id.split("")[2])
                    let kingX = target.classList[0] === "oneBox" ? Math.floor(target.id.split("")[3]) : anotherTarget.classList[0] === "oneBox" && Math.floor(anotherTarget.id.split("")[3])


                    const lineSpe = document.getElementById(`lnh${kingY-1}`)
                    const lineSpeTwo = document.getElementById(`lnh${kingY+1}`)

                    if (true) {
                        //dans le cas du pion
                        if (ThePionSelected.color === "white") {
                            for (let index = 0; index < 8; index++) {
                                let pieceX = Math.floor(lineSpe.children[0].children[index].id.split("")[3])
                                if (pieceX - kingX === 1 || pieceX - kingX === -1) {
                                    //(lineSpe.children[0].children[index].children[0].children[0])
                                    if (lineSpe.children[0].children[index].children[0].children[0] && lineSpe.children[0].children[index].children[0].children[0].classList[1] + "" === "pion") {
                                        if (lineSpe.children[0].children[index].children[0].children[0].classList[2] + "" !== ThePionSelected.color + "") {
                                            //("danger detecté")
                                            //(lineSpe.children[0].children[index])
                                            theKingIsInDanger = true
                                            setIsInChessMate(true)
                                            lineSpe.children[0].children[index].classList.add("magicBorderRedSpe")
                                        }
                                    }
                                }
                            }
                        }
                        if (ThePionSelected.color === "black") {
                            for (let index = 0; index < 8; index++) {
                                let pieceX = Math.floor(lineSpeTwo.children[0].children[index].id.split("")[3])
                                if (pieceX - kingX === 1 || pieceX - kingX === -1) {
                                    if (lineSpeTwo.children[0].children[index].children[0].children[0] && lineSpeTwo.children[0].children[index].children[0].children[0].classList[1] + "" === "pion") {
                                        if (lineSpeTwo.children[0].children[index].children[0].children[0].classList[2] + "" !== ThePionSelected.color + "") {
                                            //(lineSpeTwo.children[0].children[index])
                                            theKingIsInDanger = true
                                            setIsInChessMate(true)
                                            lineSpeTwo.children[0].children[index].classList.add("magicBorderRedSpe")
                                        }
                                    }
                                }
                            }
                        }

                        //dans le cas du chevalier
                        const lineOne = document.getElementById(`lnh${kingY-1}`)
                        const lineTwo = document.getElementById(`lnh${kingY-2}`)
                        const lineThree = document.getElementById(`lnh${kingY+1}`)
                        const lineFour = document.getElementById(`lnh${kingY+2}`)

                        const lines = [lineOne, lineTwo, lineThree, lineFour]

                        lines.forEach(line => {
                            for (let index = 0; index < 8; index++) {

                                if (line && line.children[0] && line.children[0].children[index] && line.children[0].children[index].children[0]) {
                                    if (line.children[0].children[index].children[0].children[0] && line.children[0].children[index].children[0].children[0].classList[1] === "rider") {
                                        if (line.children[0].children[index].children[0].children[0].classList[2] + "" !== ThePionSelected.color + "") {
                                            const potRiderIndexY = Math.floor(line.children[0].children[index].id.split("")[2])
                                            const potRiderIndexX = Math.floor(line.children[0].children[index].id.split("")[3])

                                            if ((kingX - potRiderIndexX === 2 || kingX - potRiderIndexX === -2) && (potRiderIndexY - kingY === 1 || potRiderIndexY - kingY === -1)) {
                                                //(line.children[0].children[index])
                                                line.children[0].children[index].classList.add("magicBorderRedSpe")
                                                theKingIsInDanger = true
                                            }
                                            if ((kingX - potRiderIndexX === 1 || kingX - potRiderIndexX === -1) && (potRiderIndexY - kingY === 2 || potRiderIndexY - kingY === -2)) {
                                                //(line.children[0].children[index])
                                                theKingIsInDanger = true
                                                line.children[0].children[index].classList.add("magicBorderRedSpe")
                                            }
                                        }
                                    }
                                }
                            }
                        })

                        //dans le cas du fou (au meme temps a moitié la reine)

                        let varIndexOne = kingX
                        let varIndexTwo = kingX
                        let varIndexThree = kingX
                        let varIndexFour = kingX

                        let weCanOne = true
                        let weCanTwo = true
                        let weCanThree = true
                        let weCanFour = true

                        for (let index = kingY - 1; index > 0; index--) {
                            varIndexOne += 1

                            let theBox = document.getElementById(`on${index}${varIndexOne}`) ? document.getElementById(`on${index}${varIndexOne}`) : document.getElementById(`ob${index}${varIndexOne}`) ? document.getElementById(`ob${index}${varIndexOne}`) : document.getElementById(`ow${index}${varIndexOne}`)
                            if (theBox && theBox.children[0].children[0] && weCanOne) {
                                if (theBox.children[0].children[0].classList[1] === "crazy" || theBox.children[0].children[0].classList[1] === "queen") {
                                    if (theBox.children[0].children[0].classList[2] + "" !== ThePionSelected.color + "") {
                                        theKingIsInDanger = true;
                                        theBox.classList.add("magicBorderRedSpe")
                                    }
                                }
                                if (theBox.id !== ThePionSelected.id) {
                                    //("mafihach")
                                    weCanOne = false;
                                }
                            }
                        }
                        for (let index = kingY - 1; index > 0; index--) {
                            varIndexTwo -= 1

                            let theBox = document.getElementById(`on${index}${varIndexTwo}`) ? document.getElementById(`on${index}${varIndexTwo}`) : document.getElementById(`ob${index}${varIndexTwo}`) ? document.getElementById(`ob${index}${varIndexTwo}`) : document.getElementById(`ow${index}${varIndexTwo}`)
                            if (theBox && theBox.children[0].children[0] && weCanTwo) {
                                if (theBox.children[0].children[0].classList[1] === "crazy" || theBox.children[0].children[0].classList[1] === "queen") {
                                    if (theBox.children[0].children[0].classList[2] + "" !== ThePionSelected.color + "") {
                                        theKingIsInDanger = true;
                                        theBox.classList.add("magicBorderRedSpe")
                                    }
                                }
                                if (theBox.id !== ThePionSelected.id) {
                                    //("mafihach")
                                    weCanTwo = false;
                                }
                            }
                        }
                        for (let index = kingY + 1; index <= 8; index++) {
                            varIndexThree -= 1

                            let theBox = document.getElementById(`on${index}${varIndexThree}`) ? document.getElementById(`on${index}${varIndexThree}`) : document.getElementById(`ob${index}${varIndexThree}`) ? document.getElementById(`ob${index}${varIndexThree}`) : document.getElementById(`ow${index}${varIndexThree}`)
                            if (theBox && theBox.children[0].children[0] && weCanThree) {
                                if (theBox.children[0].children[0].classList[1] === "crazy" || theBox.children[0].children[0].classList[1] === "queen") {
                                    if (theBox.children[0].children[0].classList[2] + "" !== ThePionSelected.color + "") {
                                        theKingIsInDanger = true;
                                        theBox.classList.add("magicBorderRedSpe")
                                    }
                                }
                                if (theBox.id !== ThePionSelected.id) {
                                    //("mafihach")
                                    weCanThree = false;
                                }
                            }
                        }
                        for (let index = kingY + 1; index <= 8; index++) {
                            varIndexFour += 1

                            let theBox = document.getElementById(`on${index}${varIndexFour}`) ? document.getElementById(`on${index}${varIndexFour}`) : document.getElementById(`ob${index}${varIndexFour}`) ? document.getElementById(`ob${index}${varIndexFour}`) : document.getElementById(`ow${index}${varIndexFour}`)
                            if (theBox && theBox.children[0].children[0] && weCanFour) {
                                if (theBox.children[0].children[0].classList[1] === "crazy" || theBox.children[0].children[0].classList[1] === "queen") {
                                    if (theBox.children[0].children[0].classList[2] + "" !== ThePionSelected.color + "") {
                                        theKingIsInDanger = true;
                                        theBox.classList.add("magicBorderRedSpe")
                                    }
                                }
                                if (theBox.id !== ThePionSelected.id) {
                                    //("mafihach")
                                    weCanFour = false;
                                }
                            }
                        }

                        //dans le cas du chateaux (a moitié la reine)

                        const allLines = []

                        for (let index = 8; index > 0; index--) {
                            allLines.push(document.getElementById(`lnh${index}`))
                        }

                        let weCanOneCastle = true;
                        let weCanTwoCastle = true;
                        let weCanThreeCastle = true;
                        let weCanFourCastle = true;

                        const mineYSofisticatedToHigh = kingY === 8 ? 0 : kingY === 7 ? 1 : kingY === 6 ? 2 : kingY === 5 ? 3 : kingY === 4 ? 4 : kingY === 3 ? 5 : kingY === 2 ? 6 : kingY === 1 ? 7 : 8

                        for (let index = mineYSofisticatedToHigh + 1; index < 8; index++) {
                            if (allLines[index].children[0].children[kingX - 1].children[0].children[0] && weCanOneCastle) {
                                if (allLines[index].children[0].children[kingX - 1].children[0].children[0].classList[1] === "castle" || allLines[index].children[0].children[kingX - 1].children[0].children[0].classList[1] === "queen") {
                                    if (allLines[index].children[0].children[kingX - 1].children[0].children[0].classList[2] + "" !== ThePionSelected.color + "") {
                                        if(allLines[index].children[0].children[kingX - 1].id+""!==realTarget.id){
                                            theKingIsInDanger = true
                                            allLines[index].children[0].children[kingX - 1].classList.add("magicBorderRedSpe")
                                        }else{
                                            console.log("ooh c'est drole c le meme id")
                                        }
                             
                                    }
                                }
                                if (allLines[index].children[0].children[kingX - 1].id !== ThePionSelected.id) {
                                    //("mafihach")
                                    weCanOneCastle = false;
                                }

                            }
                        }
                        for (let index = mineYSofisticatedToHigh - 1; index >= 0; index--) {
                            if (allLines[index].children[0].children[kingX - 1].children[0].children[0] && weCanTwoCastle) {
                                if (allLines[index].children[0].children[kingX - 1].children[0].children[0].classList[1] === "castle" || allLines[index].children[0].children[kingX - 1].children[0].children[0].classList[1] === "queen") {
                                    if (allLines[index].children[0].children[kingX - 1].children[0].children[0].classList[2] + "" !== ThePionSelected.color + "") {
                                        if(allLines[index].children[0].children[kingX - 1].id+""!==realTarget.id){
                                            theKingIsInDanger = true
                                            allLines[index].children[0].children[kingX - 1].classList.add("magicBorderRedSpe")
                                        }else{
                                            console.log("ooh c'est drole c le meme id")
                                        }
                                    }
                                }
                                if (allLines[index].children[0].children[kingX - 1].id !== ThePionSelected.id) {
                                    //("mafihach")
                                    weCanTwoCastle = false;
                                }
                            }
                        }
                        for (let index = kingX; index < 8; index++) {
                            const theBox = allLines[mineYSofisticatedToHigh].children[0].children[index]
                            if (theBox.children[0].children[0] && weCanThreeCastle) {
                                if ((theBox.children[0].children[0].classList[1] + "" === "castle" || theBox.children[0].children[0].classList[1] + "" === "queen") && theBox.children[0].children[0].classList[2] + "" !== ThePionSelected.color + "") {
                                    if(theBox.id+""!==realTarget.id){
                                        theKingIsInDanger = true
                                        theBox.classList.add("magicBorderRedSpe")
                                    }else{
                                        console.log("ooh c'est drole c le meme id")
                                    }
                                }
                                if (theBox.id !== ThePionSelected.id) {
                                    //("mafiha2112ch")
                                    weCanThreeCastle = false;
                                }
                            }
                        }
                        for (let index = kingX - 1; index >= 0; index--) {
                            const theBox = allLines[mineYSofisticatedToHigh].children[0].children[index]
                            //(allLines[mineYSofisticatedToHigh].children[0].children[index])
                            if (theBox.children[0].children[0] && weCanFourCastle) {
                                //(theBox)
                                if ((theBox.children[0].children[0].classList[1] + "" === "castle" || theBox.children[0].children[0].classList[1] + "" === "queen") && theBox.children[0].children[0].classList[2] + "" !== ThePionSelected.color + "") {
                                    if(theBox.id+""!==realTarget.id){
                                        theKingIsInDanger = true
                                        theBox.classList.add("magicBorderRedSpe")
                                    }else{
                                        console.log("ooh c'est drole c le meme id")
                                    }
                                }
                                if (theBox.id !== ThePionSelected.id) {
                                    //("mafih4141ach")
                                    weCanFourCastle = false;
                                }
                            }
                        }

                        //dans le cas ou c'est l'autre roi
                        const getOneBox = (id, childIndex) => {
                            if (document.getElementById(id)) {
                                return document.getElementById(id).children[0].children[childIndex]
                            } else {
                                return null;
                            }
                        }

                        const allPotontielBoxs = [getOneBox(`lnh${kingY}`, kingX - 2), getOneBox(`lnh${kingY}`, kingX), getOneBox(`lnh${kingY-1}`, kingX - 1), getOneBox(`lnh${kingY-1}`, kingX - 2), getOneBox(`lnh${kingY-1}`, kingX), getOneBox(`lnh${kingY+1}`, kingX - 2), getOneBox(`lnh${kingY+1}`, kingX), getOneBox(`lnh${kingY+1}`, kingX - 1)]

                        //(allPotontielBoxs)

                        allPotontielBoxs.forEach(pot => {
                            if (pot && pot.children[0] && pot.children[0].children[0]) {
                                if (pot.children[0].children[0].classList[1] === "king" && pot.children[0].children[0].classList[2] + "" !== ThePionSelected.color + "") {
                                    theKingIsInDanger = true
                                    pot.classList.add("magicBorderRedSpe")
                                }
                            }
                        })
                    }


                })
            } else {
                const kings = document.querySelectorAll(".oneBox .king")
                const allThings = []
                for (let index = 1; index <= 8; index++) {
                    allThings.push(document.getElementById(`lnh${index}`))
                }

                kings.forEach(king => {
                    const kingX = Math.floor(king.parentElement.parentElement.id.split("")[3])
                    const kingY = Math.floor(king.parentElement.parentElement.id.split("")[2])

                    if (ThePionSelected.color + "" === king.classList[2] + "") {
                        //detection d'eventuel fou ou reine dangereux.se

                        let varKingY = kingY;
                        let varKingYTwo = kingY;
                        let varKingYThree = kingY;
                        let varKingYFour = kingY;

                        let crazyCanOne = true;
                        let crazyCanTwo = true;
                        let crazyCanThree = true;
                        let crazyCanFour = true;

                        for (let index = kingX; index < 8; index++) {
                            if (crazyCanOne) {
                                varKingY += 1
                                const theLineWhereTheKingIs = document.getElementById(`lnh${varKingY}`)

                                if (theLineWhereTheKingIs && theLineWhereTheKingIs.children[0] && theLineWhereTheKingIs.children[0].children[index]) {
                                    //(theLineWhereTheKingIs.children[0].children[index])
                                    //si il y'a une piece
                                    if (theLineWhereTheKingIs.children[0].children[index].children[0] && theLineWhereTheKingIs.children[0].children[index].children[0].children[0]) {
                                        //(theLineWhereTheKingIs.children[0].children[index].children[0].children[0])

                                        //si ce n'est pas le pion selectioné
                                        if (theLineWhereTheKingIs.children[0].children[index].id + "" !== ThePionSelected.id + "") {
                                            //verifie si la couleur de la piece est diffirente de celle du roi
                                            if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                                //si la target n'est pas entre le roi et la piece dangeureuse
                                                //(theLineWhereTheKingIs.children[0].children[index])
                                                //(realTarget)

                                                const realTargetX = Math.floor(realTarget.id.split("")[3])
                                                const realTargetY = Math.floor(realTarget.id.split("")[2])

                                                const actualX = Math.floor(theLineWhereTheKingIs.children[0].children[index].id.split("")[3])
                                                const actualY = Math.floor(theLineWhereTheKingIs.children[0].children[index].id.split("")[2])

                                                if (theLineWhereTheKingIs.children[0].children[index].id + "" === realTarget.id + "" || Math.abs(realTargetX - actualX) === Math.abs(realTargetY - actualY)) {
                                                    //("il est entre youpi")
                                                    crazyCanOne = false;
                                                } else {
                                                    //on verifie si la piece est un fou ou une reine
                                                    if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "crazy" || theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "queen") {
                                                        theKingIsInDanger = true;
                                                        crazyCanOne = false;
                                                        //("le roi est en danger")
                                                        theLineWhereTheKingIs.children[0].children[index].classList.add("magicBorderRedSpe")
                                                    } else {
                                                        //("le roi n'est pas en danger")
                                                        crazyCanOne = false;
                                                    }
                                                }


                                            } else {
                                                //("ce n'est pas le pion selectioné mais la piece est de meme couleur que le roi concerné")
                                                crazyCanOne = false;
                                            }
                                        } else {
                                            //("c'est le pion selectioné")
                                        }
                                    }
                                }
                            }
                        }
                        for (let index = kingX; index < 8; index++) {
                            if (crazyCanTwo) {
                                varKingYTwo -= 1
                                const theLineWhereTheKingIs = document.getElementById(`lnh${varKingYTwo}`)

                                if (theLineWhereTheKingIs && theLineWhereTheKingIs.children[0] && theLineWhereTheKingIs.children[0].children[index]) {
                                    //(theLineWhereTheKingIs.children[0].children[index])
                                    //si il y'a une piece
                                    if (theLineWhereTheKingIs.children[0].children[index].children[0] && theLineWhereTheKingIs.children[0].children[index].children[0].children[0]) {
                                        //(theLineWhereTheKingIs.children[0].children[index].children[0].children[0])

                                        //si ce n'est pas le pion selectioné
                                        if (theLineWhereTheKingIs.children[0].children[index].id + "" !== ThePionSelected.id + "") {
                                            //verifie si la couleur de la piece est diffirente de celle du roi
                                            if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                                //si la target n'est pas entre le roi et la piece dangeureuse


                                                const realTargetX = Math.floor(realTarget.id.split("")[3])
                                                const realTargetY = Math.floor(realTarget.id.split("")[2])

                                                const actualX = Math.floor(theLineWhereTheKingIs.children[0].children[index].id.split("")[3])
                                                const actualY = Math.floor(theLineWhereTheKingIs.children[0].children[index].id.split("")[2])

                                                if (theLineWhereTheKingIs.children[0].children[index].id + "" === realTarget.id + "" || Math.abs(realTargetX - actualX) === Math.abs(realTargetY - actualY)) {
                                                    //("il est entre youpi")
                                                    crazyCanTwo = false;
                                                } else {
                                                    //on verifie si la piece est un fou ou une reine
                                                    if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "crazy" || theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "queen") {
                                                        theKingIsInDanger = true;
                                                        crazyCanTwo = false;
                                                        //("le roi est en danger")
                                                        theLineWhereTheKingIs.children[0].children[index].classList.add("magicBorderRedSpe")
                                                    } else {
                                                        //("le roi n'est pas en danger")
                                                        crazyCanTwo = false;
                                                    }
                                                }


                                            } else {
                                                //("ce n'est pas le pion selectioné mais la piece est de meme couleur que le roi concerné")
                                                crazyCanTwo = false;
                                            }
                                        } else {
                                            //("c'est le pion selectioné")
                                        }
                                    }
                                }
                            }

                        }
                        for (let index = kingX - 2; index >= 0; index--) {
                            if (crazyCanThree) {
                                varKingYThree -= 1
                                const theLineWhereTheKingIs = document.getElementById(`lnh${varKingYThree}`)

                                if (theLineWhereTheKingIs && theLineWhereTheKingIs.children[0] && theLineWhereTheKingIs.children[0].children[index]) {
                                    //(theLineWhereTheKingIs.children[0].children[index])
                                    //si il y'a une piece
                                    if (theLineWhereTheKingIs.children[0].children[index].children[0] && theLineWhereTheKingIs.children[0].children[index].children[0].children[0]) {
                                        //(theLineWhereTheKingIs.children[0].children[index].children[0].children[0])

                                        //si ce n'est pas le pion selectioné
                                        if (theLineWhereTheKingIs.children[0].children[index].id + "" !== ThePionSelected.id + "") {
                                            //verifie si la couleur de la piece est diffirente de celle du roi
                                            if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                                //si la target n'est pas entre le roi et la piece dangeureuse
                                                //(theLineWhereTheKingIs.children[0].children[index])
                                                //(realTarget)

                                                const realTargetX = Math.floor(realTarget.id.split("")[3])
                                                const realTargetY = Math.floor(realTarget.id.split("")[2])

                                                const actualX = Math.floor(theLineWhereTheKingIs.children[0].children[index].id.split("")[3])
                                                const actualY = Math.floor(theLineWhereTheKingIs.children[0].children[index].id.split("")[2])

                                                if (theLineWhereTheKingIs.children[0].children[index].id + "" === realTarget.id + "" || Math.abs(realTargetX - actualX) === Math.abs(realTargetY - actualY)) {
                                                    //("il est entre youpi")
                                                    crazyCanThree = false;
                                                } else {
                                                    //on verifie si la piece est un fou ou une reine
                                                    if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "crazy" || theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "queen") {
                                                        theKingIsInDanger = true;
                                                        crazyCanThree = false;
                                                        //("le roi est en danger")
                                                        theLineWhereTheKingIs.children[0].children[index].classList.add("magicBorderRedSpe")
                                                    } else {
                                                        //("le roi n'est pas en danger")
                                                        crazyCanThree = false;
                                                    }
                                                }


                                            } else {
                                                crazyCanThree = false;
                                                //("ce n'est pas le pion selectioné mais la piece est de meme couleur que le roi concerné")
                                            }
                                        } else {
                                            //("c'est le pion selectioné")
                                        }
                                    }
                                }
                            }

                        }
                        for (let index = kingX - 2; index >= 0; index--) {
                            if (crazyCanFour) {
                                varKingYFour += 1
                                const theLineWhereTheKingIs = document.getElementById(`lnh${varKingYFour}`)

                                if (theLineWhereTheKingIs && theLineWhereTheKingIs.children[0] && theLineWhereTheKingIs.children[0].children[index]) {
                                    //(theLineWhereTheKingIs.children[0].children[index])
                                    //si il y'a une piece
                                    if (theLineWhereTheKingIs.children[0].children[index].children[0] && theLineWhereTheKingIs.children[0].children[index].children[0].children[0]) {
                                        //(theLineWhereTheKingIs.children[0].children[index].children[0].children[0])

                                        //si ce n'est pas le pion selectioné
                                        if (theLineWhereTheKingIs.children[0].children[index].id + "" !== ThePionSelected.id + "") {
                                            //verifie si la couleur de la piece est diffirente de celle du roi
                                            if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                                //si la target n'est pas entre le roi et la piece dangeureuse
                                                //(theLineWhereTheKingIs.children[0].children[index])
                                                //(realTarget)

                                                const realTargetX = Math.floor(realTarget.id.split("")[3])
                                                const realTargetY = Math.floor(realTarget.id.split("")[2])

                                                const actualX = Math.floor(theLineWhereTheKingIs.children[0].children[index].id.split("")[3])
                                                const actualY = Math.floor(theLineWhereTheKingIs.children[0].children[index].id.split("")[2])

                                                if (theLineWhereTheKingIs.children[0].children[index].id + "" === realTarget.id + "" || Math.abs(realTargetX - actualX) === Math.abs(realTargetY - actualY)) {
                                                    //("il est entre youpi")
                                                    crazyCanFour = false;
                                                } else {
                                                    //on verifie si la piece est un fou ou une reine
                                                    if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "crazy" || theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "queen") {
                                                        theKingIsInDanger = true;
                                                        crazyCanFour = false;
                                                        //("le roi est en danger")
                                                        theLineWhereTheKingIs.children[0].children[index].classList.add("magicBorderRedSpe")
                                                    } else {
                                                        //("le roi n'est pas en danger")
                                                        crazyCanFour = false;
                                                    }
                                                }


                                            } else {
                                                //("ce n'est pas le pion selectioné mais la piece est de meme couleur que le roi concerné")
                                                crazyCanFour = false;
                                            }
                                        } else {
                                            //("c'est le pion selectioné")
                                        }
                                    }
                                }
                            }

                        }

                        //detection d'eventuels pions dangereux
                        const realKing = king.parentElement.parentElement



                        const verifyIfAnyPionIsDangerous = (indexToAdd) => {
                            const potontialDangerousLine = document.getElementById(`lnh${Math.floor(realKing.id.split("")[2])-indexToAdd}`);

                            const potontialDangerousPionOne = potontialDangerousLine.children[0].children[kingX - 2]
                            const potontialDangerousPionTwo = potontialDangerousLine.children[0].children[kingX]

                            //(potontialDangerousLine)
                            //si un des potontiel box dangereux possede un fils c'est a dire une piece
                            if (potontialDangerousPionOne.children[0].children[0]) {
                                //si cette piece est de type pion
                                if (potontialDangerousPionOne.children[0].children[0].classList[1] === "pion") {
                                    //si le pion est de couleur diffirente que le roi
                                    if (potontialDangerousPionOne.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                        //(potontialDangerousPionOne.children[0].children[0].classList[2])
                                        //(king.classList[2]);
                                        //si la destination de la piece selectioné n'est pas la position actuel de la piece dangereuse
                                        if (realTarget.id + "" !== potontialDangerousPionOne.id + "") {
                                            //("le roi est en danger bordel")
                                            theKingIsInDanger = true
                                            setIsInChessMate(true)
                                            potontialDangerousPionOne.classList.add("magicBorderRedSpe")
                                        }

                                    }
                                }

                            }
                            if (potontialDangerousPionTwo.children[0].children[0]) {
                                //si cette piece est de type pion
                                if (potontialDangerousPionTwo.children[0].children[0].classList[1] === "pion") {
                                    //si le pion est de couleur diffirente que le roi
                                    if (potontialDangerousPionTwo.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                        //(potontialDangerousPionTwo.children[0].children[0].classList[2])
                                        //(king.classList[2]);
                                        //si la destination de la piece selectioné n'est pas la position actuel de la piece dangereuse
                                        if (realTarget.id + "" !== potontialDangerousPionTwo.id + "") {
                                            //("le roi est en danger bordel")
                                            theKingIsInDanger = true
                                            potontialDangerousPionTwo.classList.add("magicBorderRedSpe")
                                        }

                                    }
                                }
                            }
                        }

                        if (ThePionSelected.color === "black") {
                            verifyIfAnyPionIsDangerous(-1)

                        } else if (ThePionSelected.color === "white") {
                            verifyIfAnyPionIsDangerous(1)
                        }

                        //detections d'eventuels chateaux ou reine dangereux.se

                        let castleCanOne = true;
                        let castleCanTwo = true;
                        let castleCanThree = true;
                        let castleCanFour = true;

                        for (let index = kingY + 1; index <= 8; index++) {
                            const thePotPiece = document.getElementById(`lnh${index}`).children[0].children[kingX - 1]

                            //si la piece a réelement une piece 
                            if (castleCanOne && thePotPiece.children[0].children[0]) {
                                //si elle a une couleur difirente
                                if (thePotPiece.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {

                                    //si c'est le chateaux ou la reine
                                    if (thePotPiece.children[0].children[0].classList[1] === "castle" || thePotPiece.children[0].children[0].classList[1] === "queen") {
                                        //si la destination est safe

                                        const castleY = thePotPiece.id.split("")[2];
                                        const realKingY = realKing.id.split("")[2];
                                        const realTargetY = realTarget.id.split("")[2];

                                        if (Math.floor(realTarget.id.split("")[3]) === kingX && (realTargetY < castleY && realTargetY > realKingY)) {
                                            castleCanOne = false;
                                        } else {
                                            theKingIsInDanger = true
                                            castleCanOne = false;
                                            thePotPiece.classList.add("magicBorderRedSpe")
                                        }
                                    } else {
                                        castleCanOne = false;
                                    }
                                } else {
                                    //si c'est le pion selectioné
                                    if (thePotPiece.id + "" === ThePionSelected.id + "") {
                                        //("c'est le pion selectioné donc...")
                                    } else {
                                        castleCanOne = false;
                                    }

                                }
                            }
                        }
                        for (let index = kingY - 1; index > 0; index--) {
                            const thePotPiece = document.getElementById(`lnh${index}`).children[0].children[kingX - 1]

                            //si la piece a réelement une piece 
                            if (castleCanTwo && thePotPiece.children[0].children[0]) {
                                //si elle a une couleur difirente
                                if (thePotPiece.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {

                                    //si c'est le chateaux ou la reine
                                    if (thePotPiece.children[0].children[0].classList[1] === "castle" || thePotPiece.children[0].children[0].classList[1] === "queen") {
                                        //si la destination est safe
                                        const castleY = thePotPiece.id.split("")[2];
                                        const realKingY = realKing.id.split("")[2];
                                        const realTargetY = realTarget.id.split("")[2];

                                        if (Math.floor(realTarget.id.split("")[3]) === kingX && (realTargetY > castleY && realTargetY < realKingY)) {
                                            //("ca va alors")
                                            castleCanTwo = false;
                                        } else {
                                            theKingIsInDanger = true;
                                            castleCanTwo = false;
                                            thePotPiece.classList.add("magicBorderRedSpe")
                                        }
                                    } else {
                                        castleCanTwo = false;
                                    }
                                } else {
                                    //si c'est le pion selectioné
                                    if (thePotPiece.id + "" === ThePionSelected.id + "") {
                                        //("c'est le pion selectioné donc...")
                                    } else {
                                        castleCanTwo = false;
                                    }

                                }
                            }
                        }
                        for (let index = kingX; index < 8; index++) {
                            const thePotPiece = document.getElementById(`lnh${kingY}`).children[0].children[index]

                            //si la piece a réelement une piece 
                            if (castleCanThree && thePotPiece.children[0].children[0]) {
                                //si elle a une couleur difirente
                                if (thePotPiece.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {

                                    //si c'est le chateaux ou la reine
                                    if (thePotPiece.children[0].children[0].classList[1] === "castle" || thePotPiece.children[0].children[0].classList[1] === "queen") {
                                        //si la destination est safe
                                        const castleX = thePotPiece.id.split("")[3];
                                        const realKingX = realKing.id.split("")[3];
                                        const realTargetX = realTarget.id.split("")[3];

                                        if (Math.floor(realTarget.id.split("")[2]) === kingY && (realTargetX < castleX && realTargetX > realKingX)) {
                                            //("ca va alors")
                                            castleCanThree = false;
                                        } else {
                                            theKingIsInDanger = true
                                            castleCanThree = false;
                                            thePotPiece.classList.add("magicBorderRedSpe")
                                        }
                                    } else {
                                        castleCanThree = false;
                                    }
                                } else {
                                    //si c'est le pion selectioné
                                    if (thePotPiece.id + "" === ThePionSelected.id + "") {
                                        //("c'est le pion selectioné donc...")
                                    } else {
                                        castleCanThree = false;
                                    }
                                }
                            }
                        }
                        for (let index = kingX - 2; index >= 0; index--) {
                            const thePotPiece = document.getElementById(`lnh${kingY}`).children[0].children[index]

                            //si la piece a réelement une piece 
                            if (castleCanFour && thePotPiece.children[0].children[0]) {
                                //si elle a une couleur difirente
                                if (thePotPiece.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {

                                    //si c'est le chateaux ou la reine
                                    if (thePotPiece.children[0].children[0].classList[1] === "castle" || thePotPiece.children[0].children[0].classList[1] === "queen") {
                                        //si la destination est safe
                                        const castleX = thePotPiece.id.split("")[3];
                                        const realKingX = realKing.id.split("")[3];
                                        const realTargetX = realTarget.id.split("")[3];
                                        if (Math.floor(realTarget.id.split("")[2]) === kingY && (realTargetX > castleX && realTargetX < realKingX)) {
                                            //("ca va alors")
                                            castleCanFour = false;
                                        } else {
                                            theKingIsInDanger = true;
                                            castleCanFour = false;
                                            thePotPiece.classList.add("magicBorderRedSpe")
                                        }
                                    } else {
                                        castleCanFour = false;
                                    }
                                } else {
                                    //si c'est le pion selectioné
                                    if (thePotPiece.id + "" === ThePionSelected.id + "") {
                                        //("c'est le pion selectioné donc...")
                                    } else {
                                        castleCanFour = false;
                                    }
                                }
                            }
                        }

                        //detection d'eventuels chevaliers 

                        const number = kingY
                        const baseOne = document.getElementById(`lnh${number-1}`)
                        const baseTwo = document.getElementById(`lnh${number-2}`)
                        const baseThree = document.getElementById(`lnh${number+1}`)
                        const baseFour = document.getElementById(`lnh${number+2}`)

                        //(number)
                        const potontialElemBorderOne = baseOne && baseOne.children[0].children[Math.floor(realKing.id.split("")[3]) - 3]
                        const potontialElemBorderTwo = baseOne && baseOne.children[0].children[Math.floor(realKing.id.split("")[3]) + 1]
                        const potontialElemBorderThree = baseTwo && baseTwo.children[0].children[Math.floor(realKing.id.split("")[3])]
                        const potontialElemBorderFour = baseTwo && baseTwo.children[0].children[Math.floor(realKing.id.split("")[3]) - 2]
                        const potontialElemBorderFive = baseThree && baseThree.children[0].children[Math.floor(realKing.id.split("")[3]) - 3]
                        const potontialElemBorderSix = baseThree && baseThree.children[0].children[Math.floor(realKing.id.split("")[3]) + 1]
                        const potontialElemBorderSeven = baseFour && baseFour.children[0].children[Math.floor(realKing.id.split("")[3])]
                        const potontialElemBorderEight = baseFour && baseFour.children[0].children[Math.floor(realKing.id.split("")[3]) - 2]

                        const AllPotontialElemBorder = [potontialElemBorderOne, potontialElemBorderTwo, potontialElemBorderThree, potontialElemBorderFour, potontialElemBorderFive, potontialElemBorderSix, potontialElemBorderSeven, potontialElemBorderEight]


                        AllPotontialElemBorder.forEach(peb => {
                            //(peb)
                            if (peb) {
                                //si y'a une piece a l'interieur
                                if (peb.children[0].children[0]) {
                                    //si elle est de la meme couleur que l'actuel roi
                                    if (peb.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                        //si c'est un rider
                                        if (peb.children[0].children[0].classList[1] === "rider") {
                                            //si la destination n'est pas arrangante
                                            if (realTarget.id !== peb.id) {
                                                theKingIsInDanger = true;
                                                //("oula un danger rider")
                                                peb.classList.add("magicBorderRedSpe")
                                            }
                                        }
                                    }
                                }
                            }
                        })
                    } else {

                    }
                })
            }
        }

        if (!theKingIsInDanger) {
            if (e.target.parentElement.classList[1] === "magicBorder") {
                const newParent = document.getElementById(`${e.target.parentElement.id}`).children[0];
                const oldParent = document.getElementById(`${ThePionSelected.id}`).children[0];

                newParent.appendChild(oldParent.children[0]);
                setThePionSelected({})
                setMagicBordersPosibility([])

                if (ThePionSelected.color === "black") {
                    setColorTurn("white")
                } else if (ThePionSelected.color === "white") {
                    setColorTurn("black")
                }
                document.querySelector(".reduceScale").classList.remove("reduceScale")
            } else if (e.target.parentElement.parentElement.parentElement.classList[1] === "magicBorderRed") {
                //(e.target.parentElement.parentElement.parentElement)
                //(document.getElementById(`${e.target.parentElement.parentElement.parentElement.id}`))


                const newParent = document.getElementById(`${e.target.parentElement.parentElement.parentElement.id}`).children[0];
                const oldParent = document.getElementById(`${ThePionSelected.id}`).children[0];

                newParent.appendChild(oldParent.children[0]);

                //stockage des pieces eliminés
                const dateToAdd = {
                    type: e.target.parentElement.classList[1],
                    color: e.target.parentElement.classList[2],
                    id: e.target.parentElement.parentElement.parentElement.id
                }
                if (colorTurn === "white") {
                    setwhitePackage(prev => [...prev, dateToAdd])
                } else if (colorTurn === "black") {
                    setBlackPackage(prev => [...prev, dateToAdd])
                }
                //

                setThePionSelected({})
                setMagicBordersPosibility([])

                if (ThePionSelected.color === "black") {
                    setColorTurn("white")
                } else if (ThePionSelected.color === "white") {
                    setColorTurn("black")
                }


                e.target.parentElement.remove()
                document.querySelector(".reduceScale").classList.remove("reduceScale")
            }
        }

        if (ThePionSelected.id) {
            const blackLine = document.getElementById("lnh8")
            const WhiteLine = document.getElementById("lnh1")

            for (let index = 0; index < 8; index++) {
                //(blackLine.children[0].children[index])
                if (blackLine.children[0].children[index] && blackLine.children[0].children[index].children[0].children[0]) {
                    if (blackLine.children[0].children[index].children[0].children[0].classList[1] === "pion" && blackLine.children[0].children[index].children[0].children[0].classList[2] === "black") {
                        blackLine.children[0].children[index].children[0].children[0].classList.replace("pion", "queen")
                        blackLine.children[0].children[index].children[0].children[0].children[0].src = "https://www.mathsisfun.com/games/images/chess/stdbq.png"
                    }
                }
                if (WhiteLine.children[0].children[index] && WhiteLine.children[0].children[index].children[0].children[0]) {
                    if (WhiteLine.children[0].children[index].children[0].children[0].classList[1] === "pion" && WhiteLine.children[0].children[index].children[0].children[0].classList[2] === "white") {
                        WhiteLine.children[0].children[index].children[0].children[0].classList.replace("pion", "queen")
                        WhiteLine.children[0].children[index].children[0].children[0].children[0].src = "https://www.mathsisfun.com/games/images/chess/stdwq.png"
                    }
                }
            }
        }
        kings.forEach(king => {
            if (ThePionSelected.color + "" !== king.classList[2] + "") {
                const kingX = Math.floor(king.parentElement.parentElement.id.split("")[3])
                const kingY = Math.floor(king.parentElement.parentElement.id.split("")[2])

                //detection d'eventuels pions dangereux
                if(true){
                    const realKing = king.parentElement.parentElement
    
    
                //(king);
                const verifyIfAnyPionIsDangerous = (indexToAdd) => {
                    const potontialDangerousLine = document.getElementById(`lnh${Math.floor(realKing.id.split("")[2])+indexToAdd}`);
    
                    const potontialDangerousPionOne = potontialDangerousLine.children[0].children[kingX - 2]
                    const potontialDangerousPionTwo = potontialDangerousLine.children[0].children[kingX]
    
                    //(potontialDangerousLine)
                    //(potontialDangerousPionOne)
                    //(potontialDangerousPionTwo)
    
                    //(potontialDangerousLine)
                    //si un des potontiel box dangereux possede un fils c'est a dire une piece
                    if (potontialDangerousPionOne.children[0].children[0]) {
                        //si cette piece est de type pion
                        if (potontialDangerousPionOne.children[0].children[0].classList[1] === "pion") {
                            //si le pion est de couleur diffirente que le roi
                            //("ici tou va bien")
                            if (potontialDangerousPionOne.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                //("en check amte toupi")
                                
                                setIsInChessMate(true)
                                setTimeout(() => {
                                    potontialDangerousPionOne.classList.add("magicBorderRedSpe")
                                }, 100);
                            }
                        }
    
                    }
                    if (potontialDangerousPionTwo.children[0].children[0]) {
                        //si cette piece est de type pion
                        if (potontialDangerousPionTwo.children[0].children[0].classList[1] === "pion") {
                            //si le pion est de couleur diffirente que le roi
                            if (potontialDangerousPionTwo.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                          
                                setIsInChessMate(true)

                                setTimeout(() => {
                                    potontialDangerousPionTwo.classList.add("magicBorderRedSpe")
                                }, 100);
                            }
                        }
                    }
                }
    
                if (ThePionSelected.color === "black") {
                    verifyIfAnyPionIsDangerous(-1)
    
                } else if (ThePionSelected.color === "white") {
                    verifyIfAnyPionIsDangerous(1)
                }
                }
                //detection d'eventuels fou ou reine dangereux
                if(true){
                    let varKingY = kingY;
                    let varKingYTwo = kingY;
                    let varKingYThree = kingY;
                    let varKingYFour = kingY;

                    let crazyCanOne = true;
                    let crazyCanTwo = true;
                    let crazyCanThree = true;
                    let crazyCanFour = true;

                    for (let index = kingX; index < 8; index++) {
                        if (crazyCanOne) {
                            varKingY += 1
                            const theLineWhereTheKingIs = document.getElementById(`lnh${varKingY}`)

                            if (theLineWhereTheKingIs && theLineWhereTheKingIs.children[0] && theLineWhereTheKingIs.children[0].children[index]) {
                                //(theLineWhereTheKingIs.children[0].children[index]);    
                                if (theLineWhereTheKingIs.children[0].children[index].children[0] && theLineWhereTheKingIs.children[0].children[index].children[0].children[0]) {
                                    //verifie si la couleur de la piece est diffirente de celle du roi
                                    if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                        //on verifie si la piece est un fou ou une reine
                                        if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "crazy" || theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "queen") {
                                            setIsInChessMate(true)
                                            crazyCanOne = false;
                                            //("le roi est en echec youpi (enfin je crois)")
                                            theLineWhereTheKingIs.children[0].children[index].classList.add("magicBorderRedSpe")
                                        } else {
                                            //("le roi n'est pas en danger")
                                            crazyCanOne = false;
                                        }


                                    } else {
                                        //("ce n'est pas le pion selectioné mais la piece est de meme couleur que le roi concerné")
                                        crazyCanOne = false;
                                    }
                                }
                            }
                        }
                    }
                    for (let index = kingX; index < 8; index++) {
                        if (crazyCanTwo) {
                            varKingYTwo -= 1
                            const theLineWhereTheKingIs = document.getElementById(`lnh${varKingYTwo}`)

                            if (theLineWhereTheKingIs && theLineWhereTheKingIs.children[0] && theLineWhereTheKingIs.children[0].children[index]) {
                                //(theLineWhereTheKingIs.children[0].children[index])
                                //si il y'a une piece
                                if (theLineWhereTheKingIs.children[0].children[index].children[0] && theLineWhereTheKingIs.children[0].children[index].children[0].children[0]) {
                                    //verifie si la couleur de la piece est diffirente de celle du roi
                                    if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                        //on verifie si la piece est un fou ou une reine
                                        if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "crazy" || theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "queen") {
                                            crazyCanTwo = false;
                                            setIsInChessMate(true)
                                            theLineWhereTheKingIs.children[0].children[index].classList.add("magicBorderRedSpe")
                                            //("le roi est en echec youpi (enfin je crois)")
                                        } else {
                                            //("le roi n'est pas en danger")
                                            crazyCanTwo = false;
                                        }


                                    } else {
                                        //("ce n'est pas le pion selectioné mais la piece est de meme couleur que le roi concerné")
                                        crazyCanTwo = false;
                                    }
                                }
                            }
                        }

                    }
                    for (let index = kingX - 2; index >= 0; index--) {
                        if (crazyCanThree) {
                            varKingYThree -= 1
                            const theLineWhereTheKingIs = document.getElementById(`lnh${varKingYThree}`)
                       
                            if (theLineWhereTheKingIs && theLineWhereTheKingIs.children[0] && theLineWhereTheKingIs.children[0].children[index]) {
                                //(theLineWhereTheKingIs.children[0].children[index]);
                                //(theLineWhereTheKingIs.children[0].children[index])
                                //si il y'a une piece
                                if (theLineWhereTheKingIs.children[0].children[index].children[0] && theLineWhereTheKingIs.children[0].children[index].children[0].children[0]) {
                                    if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                        //on verifie si la piece est un fou ou une reine
                                        if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "crazy" || theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "queen") {
                                            setIsInChessMate(true)
                                            crazyCanThree = false;
                                            setTimeout(() => {
                                                theLineWhereTheKingIs.children[0].children[index].classList.add("magicBorderRedSpe")
                                            }, 100);
                                        } else {
                                            //("le roi n'est pas en danger")
                                            crazyCanThree = false;
                                        }

                                    } else {
                                        crazyCanThree = false;
                                        //("ce n'est pas le pion selectioné mais la piece est de meme couleur que le roi concerné")
                                    }
                                }
                            }
                        }

                    }
                    for (let index = kingX - 2; index >= 0; index--) {
                        if (crazyCanFour) {
                            varKingYFour += 1
                            const theLineWhereTheKingIs = document.getElementById(`lnh${varKingYFour}`)

                            if (theLineWhereTheKingIs && theLineWhereTheKingIs.children[0] && theLineWhereTheKingIs.children[0].children[index]) {
                                //(theLineWhereTheKingIs.children[0].children[index]);
                                //(theLineWhereTheKingIs.children[0].children[index])
                                //si il y'a une piece
                                if (theLineWhereTheKingIs.children[0].children[index].children[0] && theLineWhereTheKingIs.children[0].children[index].children[0].children[0]) {
                                    //(theLineWhereTheKingIs.children[0].children[index].children[0].children[0])

                                    //verifie si la couleur de la piece est diffirente de celle du roi
                                    if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                        //si la target n'est pas entre le roi et la piece dangeureuse
                                        //(theLineWhereTheKingIs.children[0].children[index])
                                        //(realTarget)

                                        //("mais la comme meme tout va bien")
                                        //on verifie si la piece est un fou ou une reine
                                        if (theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "crazy" || theLineWhereTheKingIs.children[0].children[index].children[0].children[0].classList[1] === "queen") {
                                            setIsInChessMate(true)
                                            crazyCanFour = false;
                                            //("le roi est en echec youpi (enfin je crois)")
                                            setTimeout(() => {
                                                theLineWhereTheKingIs.children[0].children[index].classList.add("magicBorderRedSpe")
                                            }, 100);
                                        } else {
                                            //("le roi n'est pas en danger")
                                            crazyCanFour = false;
                                        }


                                    } else {
                                        //("ce n'est pas le pion selectioné mais la piece est de meme couleur que le roi concerné")
                                        crazyCanFour = false;
                                    }
                                }
                            }
                        }

                    }
                }
                //detection d'eventuels reine ou chateaux dangereux
                if(true){
                    //detections d'eventuels chateaux ou reine dangereux.se

                        let castleCanOne = true;
                        let castleCanTwo = true;
                        let castleCanThree = true;
                        let castleCanFour = true;

                        const realKing = king.parentElement.parentElement

                        for (let index = kingY + 1; index <= 8; index++) {
                            const thePotPiece = document.getElementById(`lnh${index}`).children[0].children[kingX - 1]

                            //si la piece a réelement une piece 
                            if (castleCanOne && thePotPiece.children[0].children[0]) {
                                //si elle a une couleur difirente
                                if (thePotPiece.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {

                                    //si c'est le chateaux ou la reine
                                    if (thePotPiece.children[0].children[0].classList[1] === "castle" || thePotPiece.children[0].children[0].classList[1] === "queen") {
                                        //si la destination est safe

                                        const castleY = thePotPiece.id.split("")[2];
                                        const realKingY = realKing.id.split("")[2];
                                        const realTargetY = realTarget.id.split("")[2];

                                        if (Math.floor(realTarget.id.split("")[3]) === kingX && (realTargetY < castleY && realTargetY > realKingY)) {
                                            castleCanOne = false;
                                        } else {
                                            castleCanOne = false;

                                            setIsInChessMate(true)
                                            console.log("un chateaux check mate");
                                            setTimeout(() => {
                                                thePotPiece.classList.add("magicBorderRedSpe")
                                            }, 100);
                                        }
                                    } else {
                                        castleCanOne = false;
                                    }
                                } else {
                                    //si c'est le pion selectioné
                                    if (thePotPiece.id + "" === ThePionSelected.id + "") {
                                        //("c'est le pion selectioné donc...")
                                    } else {
                                        castleCanOne = false;
                                    }

                                }
                            }
                        }
                        for (let index = kingY - 1; index > 0; index--) {
                            const thePotPiece = document.getElementById(`lnh${index}`).children[0].children[kingX - 1]

                            //si la piece a réelement une piece 
                            if (castleCanTwo && thePotPiece.children[0].children[0]) {
                                //si elle a une couleur difirente
                                if (thePotPiece.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {

                                    //si c'est le chateaux ou la reine
                                    if (thePotPiece.children[0].children[0].classList[1] === "castle" || thePotPiece.children[0].children[0].classList[1] === "queen") {
                                        //si la destination est safe
                                        const castleY = thePotPiece.id.split("")[2];
                                        const realKingY = realKing.id.split("")[2];
                                        const realTargetY = realTarget.id.split("")[2];

                                        if (Math.floor(realTarget.id.split("")[3]) === kingX && (realTargetY > castleY && realTargetY < realKingY)) {
                                            //("ca va alors")
                                            castleCanTwo = false;
                                        } else {
                                            castleCanTwo = false;

                                            setIsInChessMate(true)
                                            console.log("un chateaux check mate");
                                            setTimeout(() => {
                                                thePotPiece.classList.add("magicBorderRedSpe")
                                            }, 100);
                                        }
                                    } else {
                                        castleCanTwo = false;
                                    }
                                } else {
                                    //si c'est le pion selectioné
                                    if (thePotPiece.id + "" === ThePionSelected.id + "") {
                                        //("c'est le pion selectioné donc...")
                                    } else {
                                        castleCanTwo = false;
                                    }

                                }
                            }
                        }
                        for (let index = kingX; index < 8; index++) {
                            const thePotPiece = document.getElementById(`lnh${kingY}`).children[0].children[index]

                            //si la piece a réelement une piece 
                            if (castleCanThree && thePotPiece.children[0].children[0]) {
                                //si elle a une couleur difirente
                                if (thePotPiece.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {

                                    //si c'est le chateaux ou la reine
                                    if (thePotPiece.children[0].children[0].classList[1] === "castle" || thePotPiece.children[0].children[0].classList[1] === "queen") {
                                        //si la destination est safe
                                        const castleX = thePotPiece.id.split("")[3];
                                        const realKingX = realKing.id.split("")[3];
                                        const realTargetX = realTarget.id.split("")[3];

                                        if (Math.floor(realTarget.id.split("")[2]) === kingY && (realTargetX < castleX && realTargetX > realKingX)) {
                                            //("ca va alors")
                                            castleCanThree = false;
                                        } else {
                                            castleCanThree = false;
                                        
                                            setIsInChessMate(true)
                                            console.log("un chateaux check mate");
                                            setTimeout(() => {
                                                thePotPiece.classList.add("magicBorderRedSpe")
                                            }, 100);
                                        }
                                    } else {
                                        castleCanThree = false;
                                    }
                                } else {
                                    //si c'est le pion selectioné
                                    if (thePotPiece.id + "" === ThePionSelected.id + "") {
                                        //("c'est le pion selectioné donc...")
                                    } else {
                                        castleCanThree = false;
                                    }
                                }
                            }
                        }
                        for (let index = kingX - 2; index >= 0; index--) {
                            const thePotPiece = document.getElementById(`lnh${kingY}`).children[0].children[index]

                            //si la piece a réelement une piece 
                            if (castleCanFour && thePotPiece.children[0].children[0]) {
                                //si elle a une couleur difirente
                                if (thePotPiece.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {

                                    //si c'est le chateaux ou la reine
                                    if (thePotPiece.children[0].children[0].classList[1] === "castle" || thePotPiece.children[0].children[0].classList[1] === "queen") {
                                        //si la destination est safe
                                        const castleX = thePotPiece.id.split("")[3];
                                        const realKingX = realKing.id.split("")[3];
                                        const realTargetX = realTarget.id.split("")[3];
                                        if (Math.floor(realTarget.id.split("")[2]) === kingY && (realTargetX > castleX && realTargetX < realKingX)) {
                                            //("ca va alors")
                                            castleCanFour = false;
                                        } else {
                                            castleCanFour = false;
                                            
                                            setIsInChessMate(true)
                                            console.log("un chateaux check mate");
                                            setTimeout(() => {
                                                thePotPiece.classList.add("magicBorderRedSpe")
                                            }, 100);
                                        }
                                    } else {
                                        castleCanFour = false;
                                    }
                                } else {
                                    //si c'est le pion selectioné
                                    if (thePotPiece.id + "" === ThePionSelected.id + "") {
                                        //("c'est le pion selectioné donc...")
                                    } else {
                                        castleCanFour = false;
                                    }
                                }
                            }
                        }
                }
                //detectop, d'eventuels rider dangereux
                if(true){
                    const realKing = king.parentElement.parentElement;

                    const number = kingY
                    const baseOne = document.getElementById(`lnh${number-1}`)
                    const baseTwo = document.getElementById(`lnh${number-2}`)
                    const baseThree = document.getElementById(`lnh${number+1}`)
                    const baseFour = document.getElementById(`lnh${number+2}`)

                    //(number)
                    const potontialElemBorderOne = baseOne && baseOne.children[0].children[Math.floor(realKing.id.split("")[3]) - 3]
                    const potontialElemBorderTwo = baseOne && baseOne.children[0].children[Math.floor(realKing.id.split("")[3]) + 1]
                    const potontialElemBorderThree = baseTwo && baseTwo.children[0].children[Math.floor(realKing.id.split("")[3])]
                    const potontialElemBorderFour = baseTwo && baseTwo.children[0].children[Math.floor(realKing.id.split("")[3]) - 2]
                    const potontialElemBorderFive = baseThree && baseThree.children[0].children[Math.floor(realKing.id.split("")[3]) - 3]
                    const potontialElemBorderSix = baseThree && baseThree.children[0].children[Math.floor(realKing.id.split("")[3]) + 1]
                    const potontialElemBorderSeven = baseFour && baseFour.children[0].children[Math.floor(realKing.id.split("")[3])]
                    const potontialElemBorderEight = baseFour && baseFour.children[0].children[Math.floor(realKing.id.split("")[3]) - 2]

                    const AllPotontialElemBorder = [potontialElemBorderOne, potontialElemBorderTwo, potontialElemBorderThree, potontialElemBorderFour, potontialElemBorderFive, potontialElemBorderSix, potontialElemBorderSeven, potontialElemBorderEight]


                    AllPotontialElemBorder.forEach(peb => {
                        //(peb)
                        if (peb) {
                            //si y'a une piece a l'interieur
                            if (peb.children[0].children[0]) {
                                //si elle est de la meme couleur que l'actuel roi
                                if (peb.children[0].children[0].classList[2] + "" !== king.classList[2] + "") {
                                    //si c'est un rider
                                    if (peb.children[0].children[0].classList[1] === "rider") {
                                        console.log("jusqu'ici tout va bien")
                                        setIsInChessMate(true)
                                        console.log("cool chess mate")
                                        setTimeout(() => {
                                            peb.classList.add("magicBorderRedSpe")
                                        }, 100);
                                    }
                                }
                            }
                        }
                    })
                }
            }
        })
       



    }
    const onMouseOver = e => {
        const allUnhoverable = document.querySelectorAll(".unhoverable")
        allUnhoverable.forEach(hov => {
            hov.classList.remove("unhoverable")
        })
        if (e.target.parentElement.classList[2] + "" !== colorTurn + "") {
            //("yeah boiooy");
            e.target.classList.add("unhoverable")
        }
    }
    return(
        <div onClick={onClickInBox} style={index % 2===0?{background:theColorOne}:{background:theColorTwo}} className="oneBox" id={`o${bORw?bORw:"n"}${lineHeightIndex+1}${index+1}`}>
            <div className="containerOfOb">
                {type&&<div onClick={e=>onClickInPiece(e)} className={`onePiece ${type} ${bORw==="b"?"black":"white"}`}>
                    <img onMouseOver={onMouseOver} src={image} alt="piece of chess" />
                </div>}
            </div>
        </div>
    )
}

export default OneBox;