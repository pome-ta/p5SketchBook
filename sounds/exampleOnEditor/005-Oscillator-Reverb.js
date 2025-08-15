// [p5.js Web Editor | 005-Oscillator-Reverb](https://editor.p5js.org/thomasjohnmartinez/sketches/eMQrmFczQ)

const sketch = (p) => {
  let w = p.windowWidth;
  let h = p.windowHeight;

  let osc;
  let reverb;
  let playing = false;

  p.setup = () => {
    // put setup code here
    soundReStart();

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
