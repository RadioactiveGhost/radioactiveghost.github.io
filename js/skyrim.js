function rollDice(value){
    roll = Math.floor(Math.random() * (value) +1);
    return roll;
}

function changeField(idName, i, a, b) {
    const textField = document.getElementById(idName);
    if (i) {
        textField.value = "Dice 1: "+a+" \t|\tDice 2: "+b;
    } else {
        textField.value = "Dice: "+a;
    }
}

function rollType(type, i, a, b) {
    dice1 = rollDice(a);
    dice2 = rollDice(b);
    changeField(type, i, dice1, dice2);
    return [dice1, dice2];
}

function rollSkill() {
    const textField = document.getElementById("skillsText");
    textField.value = "";
    for (let i = 0; i < 6; i++) {        
        dice1 = rollDice(6);
        dice2 = rollDice(6);       
        textField.value += "Dice 1: "+dice1+" \t|\tDice 2: "+dice2+" \n";
        if (dice1 < 3) {
            const selCells = document.getElementsByClassName("mage");
            selCells[dice2].className = "mage selected";
        } else if ((dice1 > 2) && (dice1 < 5)) {
            const selCells = document.getElementsByClassName("warrior");
            selCells[dice2].className = "warrior selected";         
        } else {
            const selCells = document.getElementsByClassName("thief");
            selCells[dice2].className = "thief selected";
        }
    }
}

function rollAlignments(a, b) {
    const lawfulCells = document.getElementsByClassName("lawful");
    const neutralCells = document.getElementsByClassName("neutral");
    const chaoticCells = document.getElementsByClassName("chaotic");
    resetCell(lawfulCells, "lawful");
    resetCell(neutralCells, "neutral");
    resetCell(chaoticCells, "chaotic");
    switch (a) {
        case 1:
            lawfulCells[b-1].className = "lawful selected";
            break;
    
        case 2:
            neutralCells[b-1].className = "neutral selected";
            break;
            
        case 3:
            chaoticCells[b-1].className = "chaotic selected";
            break;
    }
}


function changeCell(cells, classCell, dice) { 
    for (let i = 0; i < cells.length; i++) {
        cells[i].className = classCell;
        if (dice - 1 == i) {
            cells[i].className = classCell + " selected";           
        }
    }
}

function resetCell(cells, classCell) {
    for (let i = 0; i < cells.length; i++) {
        cells[i].className = classCell;
    }
}

// *Coll means Collection
// *Cells mean cells from table

function rollRace() {
    let rollColl = rollType("raceText", 1, 6, 5);
    dice1 = rollColl[0];
    dice2 = rollColl[1];

    if (dice1 < 4 ) {
        const selCells1 = document.getElementsByClassName("race1");
        const selCells2 = document.getElementsByClassName("race2");
        changeCell(selCells1,"race1",dice2);
        resetCell(selCells2,"race2");
    } else {
        const selCells1 = document.getElementsByClassName("race1");
        const selCells2 = document.getElementsByClassName("race2");
        changeCell(selCells2,"race2",dice2);
        resetCell(selCells1,"race1");
    }

}

function rollSkills() {
    const mageCells = document.getElementsByClassName("mage");
    const warriorCells = document.getElementsByClassName("warrior");
    const thiefCells = document.getElementsByClassName("thief");
    resetCell(mageCells, "mage");
    resetCell(warriorCells, "warrior");
    resetCell(thiefCells, "thief");
    rollSkill();
}

function rollDifficulty() {
    let rollColl = rollType("difficultyText", 0, 3, 0);
    dice = rollColl[0];
    const selCells = document.getElementsByClassName("diffCell");
    changeCell(selCells,"diffCell",dice);
}

function rollWin() {
    let winColl = rollType("winText", 0, 6, 0)
    dice = winColl[0];
    const winCells = document.getElementsByClassName("winCell");
    changeCell(winCells,"winCell",dice);
}

function rollAlignment() {
    let rollColl = rollType("alignmentText", 1, 3, 3);
    rollAlignments(rollColl[0], rollColl[1]);
}

function handToHand() {
    thief1 = document.getElementById("thiefLock");
    thief2 = document.getElementById("thiefPick");
    if (document.getElementById('hand').checked) 
  {
      thief1.innerHTML = "Hand to Hand";
      thief2.innerHTML = "Security";
  } else {
      thief1.innerHTML = "Lockpicking";
      thief2.innerHTML = "Pickpocket";
  }
}