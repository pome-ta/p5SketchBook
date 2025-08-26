// [p5.js-sound/examples/array_of_notes/sketch.js at main · processing/p5.js-sound · GitHub](https://github.com/processing/p5.js-sound/blob/main/examples/array_of_notes/sketch.js)

const interactionTraceKitPath =
  '../../sketchBooks/modules/interactionTraceKit.js';

const sketch = (p) => {
  let w, h;

  let pointerTracker;
  let tapIndicator;

  let synth;
  let songStarted = false;

  const song = [
    // Note pitch, velocity (between 0-1), start time (s), note duration (s)
    { pitch: 'E4', velocity: 1, time: 0, duration: 1 },
    { pitch: 'D4', velocity: 1, time: 1, duration: 1 },
    { pitch: 'C4', velocity: 1, time: 2, duration: 1 },
    { pitch: 'D4', velocity: 1, time: 3, duration: 1 },
    { pitch: 'E4', velocity: 1, time: 4, duration: 1 },
    { pitch: 'E4', velocity: 1, time: 5, duration: 1 },
    { pitch: 'E4', velocity: 1, time: 6, duration: 1 },
    // Rest indicated by offset in start time
    { pitch: 'D4', velocity: 1, time: 8, duration: 1 },
    { pitch: 'D4', velocity: 1, time: 9, duration: 1 },
    { pitch: 'E4', velocity: 1, time: 10, duration: 1 },
    { pitch: 'D4', velocity: 1, time: 11, duration: 1 },
    // Chord indicated by simultaneous note start times
    { pitch: 'C4', velocity: 1, time: 12, duration: 2 },
    { pitch: 'E4', velocity: 1, time: 12, duration: 2 },
    { pitch: 'G4', velocity: 1, time: 12, duration: 2 },
  ];

  p.preload = () => {
    p.loadModule(interactionTraceKitPath, (m) => {
      const { PointerTracker, TapIndicator } = m;
      pointerTracker = new PointerTracker(p);
      tapIndicator = new TapIndicator(p);
    });
  };

  p.setup = () => {
    // put setup code here
    w = p.windowWidth;
    h = p.windowHeight;

    p.canvas.addEventListener(pointerTracker.move, (e) => e.preventDefault(), {
      passive: false,
    });

    p.createCanvas(w, h);
    tapIndicator.setup();

    p.textAlign(p.CENTER, p.CENTER);

    // --- sound
    synth = new p5.PolySynth();
  };

  p.draw = () => {
    // put drawing code here
    p.background(180);
    songStarted
      ? p.text('song started', w / 2, h / 2)
      : p.text('click to play song', w / 2, h / 2);
  };

  p.touchStarted = (e) => {
    if (songStarted) {
      return;
    }
    songStarted = true; // Only play once
    song.forEach((note) => {
      synth.play(note.pitch, note.velocity, note.time, note.duration);
    });
  };

  p.touchMoved = (e) => {};

  p.touchEnded = (e) => {};

  p.windowResized = (e) => {
    w = p.windowWidth;
    h = p.windowHeight;
    p.resizeCanvas(w, h);
  };
};

new p5(sketch);
