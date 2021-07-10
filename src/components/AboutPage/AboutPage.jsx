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
        <h3>React | Redux | Redux Sagas | Node.js | PostgreSql | Tone.js (sound generation)| Tonal.js (scale generation) | npm-music-scale (scale generation) | nes.css </h3>
        <br></br>
        <br></br>

        <h1>Challenges</h1>
        <h1>Next</h1>
        <h3>Ability to change sequence length</h3>
        <h3>Sequence probability</h3>
        <h3>More intuitive sequencer UI</h3>
        <h3>More synthesizer parameters</h3>
        <h3>Effects (delay/reverb)</h3>
        
        
      </div>
    </div>
  );
}

export default AboutPage;
