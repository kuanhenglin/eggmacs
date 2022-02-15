function Home() {
  document.title = "T-Eggletop Map Maker";

  return (
    <div>
      <h1>T-Eggletop Map Creator</h1>
      <p><i>
        Brought to you by Team <span className="eggmacs">Eggmacs</span>.
      </i></p>
      <h2 className="normal-margin"><center><b>___</b></center></h2>

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

      <h2><i>Hail fellow well met!</i></h2>
      <p>
        Tabletop roleplaying games (TTRPGs) have been bringing communities
        together for decades. Dungeons and Dragons, Monster of the Week,
        Pathfinder, and dozens of other TTRPGs provide an opportunity to eat
        junk food with your friends every weekend and tell a cool story
        together.
      </p>
      <p>
        Our team aims to make things easier for new Game Masters to create their
        own campaigns. Logistics such as map creation and stat rolling are an
        imperative part of the world-building process, we believe our virtual
        web application can help to make the process more efficient and
        accessible. 
      </p>
      
    </div>


  )
}

export default Home;