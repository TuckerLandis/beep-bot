import React from 'react';
import './AboutPage.css'

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div className="next">
        <h1>Technologies used</h1>
        <br></br>
        <h3>React | Redux | Redux Sagas | Node.js | PostgreSql | Passport | nes.css </h3>
        <h3>Tone.js (sound generation)| Tonal.js (scale generation) | npm-music-scale (scale generation) </h3>
        <br></br>
   


        <h1>Next</h1>
        <h3>Variable sequence length</h3>
        <h3>Sequence probability</h3>
        <h3>More intuitive sequencer UI</h3>
        <h3>More synthesizer parameters</h3>
        <h3>Post processing effects chain</h3>
        <br></br>
        <h1>Contact</h1>
        <br></br>


        <section class="icon-list">


          <div>
            <i class="nes-icon instagram is-large"></i>
            <p>@splittamusic</p>
          </div>

          <div>
            <i class="nes-icon github is-large"></i>
            <p>https://github.com/TuckerLandis/beep-bot</p>
          </div>

          <div>
            <i class="nes-icon gmail is-large"></i>
            <p>landistuckerc@gmail.com</p>
          </div>

          <div>
            <i class="nes-icon linkedin is-large"></i>
            <p> Tucker Landis </p>
          </div>





        </section>
      </div>
    </div>
  );
}

export default AboutPage;
