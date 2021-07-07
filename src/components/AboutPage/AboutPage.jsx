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
        <h3>React | Redux | Node.js | PostgreSql | Tone.js | Tonal.js </h3>
        <h1>Next</h1>
        <h3>Sequence probability</h3>
        <h3>More intuitive sequencer UI</h3>
        
        <br></br>
        <h1>Stretch</h1>
        <h3>Redo selects as a grid of clickable components</h3>
        <h3>Sequence length doubling/ halving</h3>
        <h3>Animation for displaying the present step and clock advancement</h3>
        
      </div>
    </div>
  );
}

export default AboutPage;
