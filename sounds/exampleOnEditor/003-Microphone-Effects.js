// [p5.js Web Editor | 003-Microphone-Effects](https://editor.p5js.org/thomasjohnmartinez/sketches/5NV6gUkWM)

const interactionTraceKitPath =
  '../../sketchBooks/modules/interactionTraceKit.js';

const sketch = (p) => {
  let w = p.windowWidth;
  let h = p.windowHeight;

  let pointerTracker;

  let mic;
  let delay;
  let filter;

  p.preload = () => {
    p.loadModule(interactionTraceKitPath, (m) => {
      const { PointerTracker } = m;
      pointerTracker = new PointerTracker(p);
    });
  };

  p.setup = () => {
    // put setup code here
    soundReStart();
    p.canvas.addEventListener(pointerTracker.move, (e) => e.preventDefault(), {
      passive: false,
    });

    p.describe(
      `a sketch that accesses the user's microphone and connects it to a delay line.`
    );

    const cnv = p.createCanvas(w, h);
    cnv.mousePressed(startMic);
    p.background(220);

    mic = new p5.AudioIn();
    delay = new p5.Delay(0.74, 0.1);
    // todo: β `filter = new p5.Biquad(600, "bandpass");`
    const filter = new p5.Filter('bandpass');
    filter.freq(600);
    filter.res(1);

    mic.disconnect();
    mic.connect(delay);
    delay.disconnect();
    delay.connect(filter);

    p.textAlign(p.CENTER);
    p.textWrap(p.WORD);
    p.textSize(10);

    const maxWidth = 100;
    p.text(
      'click to open mic, watch out for feedback',
      w / 2 - maxWidth / 2,
      h / 2,
      maxWidth
    );

    window._cacheSounds = [mic, delay, filter];
  };

  p.draw = () => {
    // put drawing code here
    pointerTracker.updateXY();

    const d = pointerTracker.x ? p.map(pointerTracker.x, 0, w, 0.1, 0.5) : 0.1;
    delay.delayTime(d);
  };

  function startMic() {
    mic.start();
  }

  p.windowResized = (e) => {
    w = p.windowWidth;
    h = p.windowHeight;
    p.resizeCanvas(w, h);
  };

  function soundReStart() {
    // wip: クリップノイズ対策
    p.disposeSound();

    const soundArray = p.soundOut.soundArray;
    for (let soundIdx = soundArray.length - 1; soundIdx >= 0; soundIdx--) {
      const sound = soundArray[soundIdx];
      // todo: 過剰処理？
      sound?.stop && sound.stop();
      sound?.dispose && sound.dispose();
      sound?.disconnect && sound.disconnect();

      soundArray.splice(soundIdx, 1);
    }

    const parts = p.soundOut.parts;
    for (let partIdx = parts.length - 1; partIdx >= 0; partIdx--) {
      const phrases = parts[partIdx].phrases;
      for (let phraseIdx = phrases.length - 1; phraseIdx >= 0; phraseIdx--) {
        phrases.splice(phraseIdx, 1);
      }
      parts.splice(partIdx, 1);
    }

    p.soundOut.soundArray = [];
    p.soundOut.parts = [];
    p.soundOut.extensions = []; // todo: 対応必要？

    p.userStartAudio();
  }
};

new p5(sketch);
