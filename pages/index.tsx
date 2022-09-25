import Layout from '../components/Layout'
import WelcomComponent from '../components/Welcome'
import {preLoadGame} from '../actions/endpoints';
type Props={
  unCompletedGame:Object|null,
  artistAlbums:Object|null,
}
function  IndexPage (props:Props){
  return(
    <Layout title="Home | BlindSpot Technical Interview">
   
    <WelcomComponent {...props}/>
    
   </Layout>
  )
}

export default IndexPage


export async function getStaticProps(){
  const data = await preLoadGame();
  return {
   props:{
   ...data
  }
  }
}
