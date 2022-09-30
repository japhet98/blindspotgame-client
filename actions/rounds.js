


const setRound = ({round,level})=>{
    localStorage.setItem('round',{round,level});
}

const getRound =()=>{
    return localStorage.getItem('round');
}

const RoundType = {
    roundOne:'First Round',
    roundTwo:'Second Round',
    roundThree:'Third Round',
    roundFour:'Fourth Round',
    finalRound: 'Final Round'
}

const AttemptLevel={
    levelOne:1,
    levelTwo:2,
    levelThree:3,
    levelFour:4

}


export{
    getRound,
    setRound,
    RoundType,
    AttemptLevel
}