// [002-Amplitude-VisualizingLoudness by thomasjohnmartinez -p5.js Web Editor](https://editor.p5js.org/thomasjohnmartinez/sketches/Wlcnc6WCD)
const soundPath = 'https://tonejs.github.io/audio/berklee/gong_1.mp3';

const sketch = (p) => {
  let w = p.windowWidth;
  let h = p.windowHeight;

  let sound;
  let amp;

  p.preload = () => {
    sound = p.loadSound(soundPath);
  };

  p.setup = () => {
    // put setup code here
    soundReStart();

    const cnv = p.createCanvas(w, h);
    cnv.mousePressed(playSound);

    p.textAlign(p.CENTER);
    p.fill(255);

    amp = new p5.Amplitude();
    sound.connect(amp);

    p.describe(
      'The color of the background changes based on the amplitude of the sound.'
    );

    window._cacheSounds = [sound, amp];
  };

  p.draw = () => {
    // put drawing code here
    const level = p.map(amp.getLevel(), 0, 0.2, 0, 225);
    p.background(level, 0, 0);
    p.text('click to play', w / 2, 120);
  };

  function playSound() {
    sound.play();
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
