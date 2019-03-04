class SoundEngine {
  constructor(parser) {
    this.monoSynth = new Tone.Synth().toMaster();
    this.polySynth = new Tone.PolySynth(7).toMaster();
    this.playCallback = null;
    this.parser = parser;
    this.baseOctave = 4;
    this.isPlaying = false;
  }

  noteIndexToString(noteIndex) {
    const offsetIndex = noteIndex - 1;
    const octave = Math.floor(offsetIndex / 12) + this.baseOctave;
    const index = offsetIndex % MusicLibrary.flatNoteNames.length;
    return MusicLibrary.flatNoteNames[index] + octave.toString();
  }

  noteStringToIndex(noteString) {
    const rootString = this.parser.findRoot(noteString);
    let octave = this.parser.findOctave(noteString);
    if (!octave) {
      octave = 0;
    } else {
      octave -= this.baseOctave;
    }
    let index = this.parser.noteStringToIndex(rootString);
    return index + (octave * Config.notesPerOctave);
  }

  clear() {
    if (this.sequence) {
      this.sequence.removeAll();
    }
    if (this.loop) {
      this.loop.stop();
    }
  }

  queueNotes(notes, rootNotes, mode) {
    const wasPlaying = this.isPlaying;
    this.stop();

    let startIndex = -1;
    for (let i in rootNotes) {
      startIndex = notes.indexOf(rootNotes[i]);
      if (startIndex >= 0) {
        break;
      }
    }
    if (startIndex < 0) {
      startIndex = 0;
    }

    let noteNames = [];
    let insertIndex = startIndex;
    for (let i in notes) {
      const name = this.noteIndexToString(notes[insertIndex]);
      noteNames.push(name);
      insertIndex++;
      if (insertIndex >= notes.length) {
        insertIndex = 0;
      }
    }

    const that = this;

    if (mode === 'sequence') {
      this.sequence = new Tone.Sequence(function (time, note) {
        that.monoSynth.triggerAttackRelease(note, "8n", time);
        if (that.playCallback) {
          that.playCallback(that.noteStringToIndex(note));
        }
      }, noteNames, "4n");
    }
    if (mode === 'chord') {
      this.loop = new Tone.Loop(function (time) {
        that.polySynth.triggerAttackRelease(noteNames, "8n", time);
      }, "2n");
    }

    if (wasPlaying) {
      this.play(mode);
    }
  }

  play(mode) {
    this.isPlaying = true;
    if (this.loop && mode === 'chord') {
      this.loop.start();
    }
    if (this.sequence && mode === 'sequence') {
      this.sequence.start();
    }
    Tone.Transport.start();
  }

  stop() {
    this.isPlaying = false;
    if (this.sequence) {
      this.sequence.stop();
      this.sequence.removeAll();
      this.sequence.dispose();
    }
    if (this.loop) {
      this.loop.stop();
      this.loop.dispose();
    }
    Tone.Transport.stop();
    this.sequence = null;
    this.loop = null;
  }
}
