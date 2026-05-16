const noteFrequencies: Record<string, number> = {
  C3: 130.81,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
};

type WebAudioWindow = Window & {
  AudioContext?: typeof AudioContext;
  webkitAudioContext?: typeof AudioContext;
};

export async function playDemoNotes(notes: string[]) {
  if (typeof window === "undefined" || notes.length === 0) {
    return;
  }

  const audioWindow = window as WebAudioWindow;
  const AudioContextClass = audioWindow.AudioContext ?? audioWindow.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const context = new AudioContextClass();
  const now = context.currentTime;

  notes.forEach((note, index) => {
    const frequency = noteFrequencies[note];
    if (!frequency) {
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = now + index * 0.42;
    const stop = start + 0.32;

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.22, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, stop);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(stop + 0.02);
  });
}
