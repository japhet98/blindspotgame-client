import Layout from '../components/Layout'
import WelcomComponent from '../components/Welcome'
import {preLoadGame} from '../actions/endpoints';

function  IndexPage (){
  return(
    <Layout title="Home | BlindSpot Technical Interview">
   
    <WelcomComponent />
    
   </Layout>
  )
}

export default IndexPage

