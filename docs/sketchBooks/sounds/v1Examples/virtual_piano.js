// [p5.js-sound/examples/virtual_piano/sketch.js at main · processing/p5.js-sound · GitHub](https://github.com/processing/p5.js-sound/blob/main/examples/virtual_piano/sketch.js)
/**
 * Virtual Piano: Example for event-driven sound playback.
 * バーチャルピアノ: イベント駆動型のサウンド再生の例。
 *
 * This example uses the p5.PolySynth to produce instantaneously,
 * driven by user events.
 * この例では、p5.PolySynth を使用して、ユーザー イベントによって瞬時に生成します。
 */

const interactionTraceKitPath = 'modules/interactionTraceKit.js';

const sketch = (p) => {
  let w, h;

  let pointerTracker;
  let tapIndicator;

  let polySynth;
  const velocity = 0.7; // From 0-1
  const baseNote = 72;
  const keyOrder = 'ASDFGHJKL';
  const keyStates = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  p.preload = () => {
    p.loadModule(interactionTraceKitPath, (m) => {
      const {PointerTracker, TapIndicator} = m;
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
    p.strokeWeight(3);

    // --- sound
    // Create synth voice
    synth = new p5.PolySynth();
  };

  p.draw = () => {
    // put drawing code here
    const keyWidth = w / keyStates.length;

    for (let i = 0; i < keyStates.length; i++) {
      const keyColor =
        keyStates[i] === 1 ? p.color(255, 220, 120) : p.color(150, 230, 245);
      p.fill(keyColor);
      p.stroke(255);

      p.rect(i * keyWidth, 0, keyWidth, h);
      // Key label
      p.fill(40);
      p.noStroke();
      p.text(keyOrder[i], i * keyWidth + keyWidth / 2, h / 2);
    }
  };

  function keyPressed() {
    const keyIndex = keyOrder.indexOf(p.key);
    // Check if valid note key pressed
    if (keyIndex >= 0) {
      // Update key state
      keyStates[keyIndex] = 1;
      // Play synth
      const midiNoteNumber = baseNote + keyIndex; // 0-127; 60 is Middle C (C4)
      const freq = p.midiToFreq(midiNoteNumber);
      synth.noteAttack(freq, velocity, 0);
    }
  }

  function keyReleased() {
    const keyIndex = keyOrder.indexOf(p.key);
    // Check if valid note key pressed
    if (keyIndex >= 0) {
      // Update key state
      keyStates[keyIndex] = 0;
      // Stop synth
      const midiNoteNumber = baseNote + keyIndex; // 0-127; 60 is Middle C (C4)
      const freq = p.midiToFreq(midiNoteNumber);
      synth.noteRelease(freq, 0);
    }
  }

  p.touchStarted = (e) => {
    const keyWidth = w / keyStates.length;
    const keyIndex = p.floor(p.mouseX / keyWidth);
    // Update key state
    keyStates[keyIndex] = 1;
    // Play synth
    const midiNoteNumber = baseNote + keyIndex; // 0-127; 60 is Middle C (C4)
    const freq = p.midiToFreq(midiNoteNumber);
    synth.noteAttack(freq, velocity, 0);
  };

  p.touchMoved = (e) => {
  };

  p.touchEnded = (e) => {
    for (let i = 0; i < keyStates.length; i++) {
      keyStates[i] = 0;
    }
    synth.noteRelease();
  };

  p.windowResized = (e) => {
    w = p.windowWidth;
    h = p.windowHeight;
    p.resizeCanvas(w, h);
  };
};

new p5(sketch);
