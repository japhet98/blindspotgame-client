import Layout from '../../components/Layout'
import {LoadScoreBoardData} from '../../actions/endpoints';
import ScoreBoard from '../../components/ScoreBoard';
type Props={
  data:Object[]
}
function  ScoreBoardPage (props:Props){
  return(
    <Layout title="Score Board | BlindSpot Technical Interview">
   
<ScoreBoard games={props.data}/>    
   </Layout>
  )
}

export default ScoreBoardPage


export async function getServerSideProps(){
  const data = await LoadScoreBoardData();
  return {
   props:{
    data
   }
  }
}
