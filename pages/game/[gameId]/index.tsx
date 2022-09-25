import { LoadGameWithQuestions } from "../../../actions/endpoints";
import Layout from "../../../components/Layout";
import SingleGame from "../../../components/SingleGame";

type Props ={
  game:any,
  artistAlbums:any
}

export default function GamePage(props:Props){
// console.log(props);

  return(
    <Layout title="Home | BlindSpot Technical Interview">
   <SingleGame gameData={props?.game} questions={props?.artistAlbums} />
  </Layout>
  )
}



export async function getServerSideProps(ctx:any) {

  const data = await LoadGameWithQuestions(ctx?.params?.gameId)
  return {
    props: {
     ...data
    },
  }
}