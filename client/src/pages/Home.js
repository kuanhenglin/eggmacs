import { Link } from "react-router-dom";
function Home() {
  document.title = "T-Eggletop Map Maker";

  return (
    <div>

      <div className="hspacer">space</div>
      <div className="hspacer">space</div>

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

      <sub>
        Tabletop roleplaying games have been bringing communities
        together for decades. 
      </sub> 

      <p>
        Dungeons and Dragons, Monster of the Week, Pathfinder, and dozens of
        other tabletop roleplaying games provide an opportunity to eat junk food with your friends
        every weekend and tell a cool story together. T-Eggletop Map Creator
        (TeMC) helps make homebrewing and mapmaking more efficient and
        accessible for Game Masters of all levels.
      </p>

      <div className="hspacer">space</div>

      <div className="container-row">
        <Link to={`/map`}> <div className="img-button map-btn overlay"> <div className="img-text"> <b>Create a Map</b> </div> </div></Link>
        <Link to={`/search`}> <div className="img-button search-btn overlay"> <div className="img-text"><b>Browse Maps</b></div></div></Link>
        <Link to={`/user`}> <div className="img-button profile-btn overlay"> <div className="img-text"><b>Create a Profile</b> </div> </div></Link>
      </div>

      <div className="hspacer">space</div>
      <div className="hspacer">space</div>

      <div className="containerParent">
        <div className="container"> 

          <h3><center>Meet Team <span className="eggmacs">Eggmacs</span></center></h3>

          <Link to={"/user/jordanlin"}>
          <button><img className="team-profile eggmacs" src="https://64.media.tumblr.com/84218fd0a5e3a863fac57224d420806f/f2502252a89ac9d0-b9/s250x400/cb5664f7dbd0ae9b1bc2b03863542e7ca228ec65.png" />
          <sub><center>JORDAN</center></sub></button>
          </Link>
          
          <Link to={"/user/theresonlyjuice"}>
          <button><img className="team-profile eggmacs" src="https://64.media.tumblr.com/60e2a541654db82134a59adcc2527ba5/f2502252a89ac9d0-b4/s250x400/22716c8bc069414a0d66e66b62a84d2b9ced7d09.png" />
          <sub><center>JOICE</center></sub></button>
          </Link>
          
          <Link to={"/user/the-bay-kay"}>
          <button><img className="team-profile eggmacs" src="https://64.media.tumblr.com/c23dcbc345f3e1fac9dcc4790b82785e/f2502252a89ac9d0-c7/s250x400/a6dac0402ca4b744675fe230fce1ee50859e3834.png" />
          <sub><center>KAY</center></sub></button>
          </Link>
          
          <Link to={"/user/Shalphan"}>
          <button><img className="team-profile eggmacs" src="https://64.media.tumblr.com/84651b70bddc226c5333bb24a601252d/f2502252a89ac9d0-cf/s250x400/a9abde34d0241ebe484405a02ef1113b3cae29c3.png" />
          <sub><center>SEAN</center></sub></button>
          </Link>
        
          <Link to={"/user/mvchegg"}> 
          <button><img className="team-profile eggmacs" src="https://64.media.tumblr.com/0efb50dcd25b1df4af4d08f4a5932126/f2502252a89ac9d0-a4/s250x400/7bf090d8c675b027761d10795801750614c2516a.png" />
          <sub><center>MEGHANA</center></sub></button>
          </Link>
        </div>
      </div>

    <p>You can poke around at TeMC's GitHub repository&nbsp;
      <a
        className="hypertext"
        href="https://github.com/kuanhenglin/eggmacs"
        target="_blank"  // open in new tab
      >
        here
      </a>!
    </p>
    </div>
  )
}

export default Home;