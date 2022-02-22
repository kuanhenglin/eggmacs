function Home() {
  document.title = "T-Eggletop Map Maker";

  return (
    <div>

      <div className= "hspacer"></div>

      <h1>T-Eggletop Map Creator</h1>
      <p><i>
        Brought to you by Team <span className="eggmacs">Eggmacs</span>.
      </i></p>
      <h1 className="normal-margin"><center><b>___</b></center></h1>

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
      

      <div className = "hspacer"> space </div>

      <div className = "containerParent">
        <div className = "container"> 
          <div class="left"> 

          <h3> Meet the Team </h3>

          </div>
        </div>

        <div className = "container">
          <div className = "right"> 

          <p> hello hello </p>
          </div>
        </div>

      </div>

    </div>


  )
}

export default Home;