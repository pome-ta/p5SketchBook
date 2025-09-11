// [001-Oscillator-FrequencyAmplitude by thomasjohnmartinez -p5.js Web Editor](https://editor.p5js.org/thomasjohnmartinez/sketches/z-KkeTrcu)
const interactionTraceKitPath ='modules/interactionTraceKit.js';

const sketch = (p) => {
  let w, h;

  let pointerTracker;

  let osc;
  let playing;
  let freq, amp;

  p.preload = () => {
    p.loadModule(interactionTraceKitPath, (m) => {
      const { PointerTracker } = m;
      pointerTracker = new PointerTracker(p);
    });
  };

  p.setup = () => {
    // put setup code here
    w = p.windowWidth;
    h = p.windowHeight;

    const cnv = p.createCanvas(w, h);
    cnv.mousePressed(playOscillator);
    osc = new p5.Oscillator();
  };

  p.draw = () => {
    // put drawing code here
    p.background(200);
    pointerTracker.updateXY();

    freq = pointerTracker.x
      ? p.constrain(p.map(pointerTracker.x, 0, w, 100, 500), 100, 500)
      : pointerTracker.x;
    amp = pointerTracker.y
      ? p.constrain(p.map(pointerTracker.y, h, 0, 0, 1), 0, 1)
      : pointerTracker.y;

    p.text('tap to play', w / 2 + 20, h / 2 + 20);
    p.text('freq: ' + freq, w / 2 + 20, h / 2 + 40);
    p.text('amp: ' + amp, w / 2 + 20, h / 2 + 60);

    if (playing) {
      osc.freq(freq ? freq : 0);
      osc.amp(amp ? amp : 0);
    }
  };

  function playOscillator() {
    osc.start();
    playing = true;
  }

  p.windowResized = (e) => {
    w = p.windowWidth;
    h = p.windowHeight;
    p.resizeCanvas(w, h);
  };
};

new p5(sketch);
