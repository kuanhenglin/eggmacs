import { Link } from "react-router-dom";
function Home() {
  document.title = "T-Eggletop Map Maker";

  return (
    <div>

    <div className="hspacer"> space </div>

      <div className="shapes"> 
        <div id="square"></div>
        <div id="diamond"></div>
        <div id="triangle"></div> 
        <div id="circle"></div>
        <div id="square"></div>
        <div id="diamond"></div>
        <div id="triangle"></div> 
        <div id="circle"></div>
      </div> 



      <h2><i>Hail and well met!</i></h2>

      <sub> Tabletop roleplaying games (TTRPGs) have been bringing communities
        together for decades. 
      </sub> 

      <p>
        Dungeons and Dragons, Monster of the Week,
        Pathfinder, and dozens of other TTRPGs provide an opportunity to eat
        junk food with your friends every weekend and tell a cool story
        together. T-Eggletop Map Creator helps make homebrewing and mapmaking more 
        efficient and accessible for Game Masters of all levels.
      </p>
    
      <div className="hspacer"> space </div>
      

      <div className="containerrow">
        <Link to={`/map`}> <div className="img-button overlay"></div></Link>
        <Link to={`/search`}> <div className="img-button overlay"></div></Link>
        <Link to={`/user`}> <div className="img-button overlay"></div></Link>
      </div>

      <div className="hspacer"> space </div>

      <div className="containerParent">
        <div className="container"> 

          <h3> <center>Meet Team <span className="eggmacs">Eggmacs</span></center> </h3>
          <div className="hspacer"> space </div>

          <Link to={`/user/jordanlin`}>
          <button> <img src="https://64.media.tumblr.com/84218fd0a5e3a863fac57224d420806f/f2502252a89ac9d0-b9/s250x400/cb5664f7dbd0ae9b1bc2b03863542e7ca228ec65.png" width="135"/>
          <sub><center> JORDAN </center></sub> </button>
          </Link>
          
          <Link to={`/user/theresonlyjuice`}>
          <button> <img src="https://64.media.tumblr.com/60e2a541654db82134a59adcc2527ba5/f2502252a89ac9d0-b4/s250x400/22716c8bc069414a0d66e66b62a84d2b9ced7d09.png" width="135" />
          <sub> <center> JOICE </center> </sub> </button>
          </Link>
          
          <Link to={`/user/the-bay-kay`}>
          <button> <img src="https://64.media.tumblr.com/c23dcbc345f3e1fac9dcc4790b82785e/f2502252a89ac9d0-c7/s250x400/a6dac0402ca4b744675fe230fce1ee50859e3834.png" width="135"/>
          <sub> <center> KAY </center></sub> </button>
          </Link>
          
          <Link to={`/user/Shalphan`}>
          <button> <img src="https://64.media.tumblr.com/84651b70bddc226c5333bb24a601252d/f2502252a89ac9d0-cf/s250x400/a9abde34d0241ebe484405a02ef1113b3cae29c3.png" width="135"/>
          <sub><center> SEAN  </center></sub> </button>
          </Link>
        
          <Link to={`/user/mvchegg`}> 
          <button> <img src="https://64.media.tumblr.com/0efb50dcd25b1df4af4d08f4a5932126/f2502252a89ac9d0-a4/s250x400/7bf090d8c675b027761d10795801750614c2516a.png" width="135" />
          <sub><center> MEGHANA </center></sub> </button>
          </Link>

          <div className="hspacer"> space </div>
        </div>

      </div>

    </div>


  )
}

export default Home;