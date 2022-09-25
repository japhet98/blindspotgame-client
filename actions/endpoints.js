import axios from 'axios';
const baseEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const createGame = async(artistId)=>{
   const game = await axios.post(`${baseEndpoint}/games`,JSON.stringify({artistId}),{
        headers:{
            "content-type": "application/json"
        }
    })
    return game?.data;
}

export const preLoadGame = async()=>{  
    const incompleteGame = await axios.get(`${baseEndpoint}/games/me/incompleted`);
    let artistAlbums;
    if(incompleteGame?.data?.data == null){
      artistAlbums = await axios.get(`${baseEndpoint}/itunes/artists/starting`);
    }
    else{
      artistAlbums = await axios.get(`${baseEndpoint}/itunes/artists/${incompleteGame.data?.data?.artistId}`);
    }
    return {
        unCompletedGame:incompleteGame?.data?.data,
        artistAlbums: artistAlbums?.data?.data
    }
}

const AddMoreAlbums =(albums,count)=>{
    if(count<3 && count>0){
        albums.push(albums[0]);
        AddMoreAlbums(albums,albums?.length);
    }else{
        return albums
    }
}

export const LoadGameWithQuestions = async(gameId)=>{  
    const game = await axios.get(`${baseEndpoint}/games/game-questions/${gameId}`);
   
    return {
        game:game?.data?.data?.game,
        artistAlbums: game?.data?.data?.albums,
    }
}
export const LoadScoreBoardData = async()=>{  
    const game = await axios.get(`${baseEndpoint}/games/completed`);
    return game.data?.data;
}
export const CreateRound =async({
    gameId,
    artistName,
    album,

})=>{
    const round = await axios.post(`${baseEndpoint}/rounds`,JSON.stringify({ 
         gameId,
        artistName,
        album,
    }),{
        headers:{
            "content-type": "application/json",
            "accept": "*/*"
        }
    })
    return round;
}

export const RegisterAccount =async({
    gameId,
    username

})=>{
    const user = await axios.post(`${baseEndpoint}/users`,JSON.stringify({ 
        gameId,
        username
    }),{
        headers:{
            "content-type": "application/json",
            "accept": "*/*"
        }
    })
    return user;
}

export const resetGame =async({
    gameId,
})=>{
    const user = await axios.post(`${baseEndpoint}/games/reset`,JSON.stringify({ 
        gameId,
    }),{
        headers:{
            "content-type": "application/json",
            "accept": "*/*"
        }
    })
    return user;
}
