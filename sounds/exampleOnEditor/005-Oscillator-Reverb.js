// [p5.js Web Editor | 005-Oscillator-Reverb](https://editor.p5js.org/thomasjohnmartinez/sketches/eMQrmFczQ)

const sketch = (p) => {
  let w, h;

  let osc;
  let reverb;
  let playing = false;

  p.setup = () => {
    // put setup code here
    w = p.windowWidth;
    h = p.windowHeight;

    const cnv = p.createCanvas(w, h);
    p.background(220);
    cnv.mousePressed(playSound);

    osc = new p5.Oscillator('sine');
    reverb = new p5.Reverb();
    osc.disconnect();
    osc.connect(reverb);

    p.textAlign(p.CENTER);
    p.text('click to play', w / 2, h / 2);
  };

  p.draw = () => {
    // put drawing code here
    osc.freq(p.map(p.mouseX, 0, w, 100, 1000));
  };

  function playSound() {
    if (!playing) {
      osc.start();
      playing = true;
    } else {
      osc.stop();
      playing = false;
    }
  }

  p.windowResized = (e) => {
    w = p.windowWidth;
    h = p.windowHeight;
    p.resizeCanvas(w, h);
  };
};

new p5(sketch);
