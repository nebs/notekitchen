class SoundEngine {
  constructor(parser) {
    this.synth = new Tone.Synth().toMaster();
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
  }

  queueNotes(notes, rootNotes) {
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
    this.sequence = new Tone.Sequence(function(time, note) {
      that.synth.triggerAttackRelease(note, "8n", time);
      if (that.playCallback) {
        that.playCallback(that.noteStringToIndex(note));
      }
    }, noteNames, "4n");

    if (wasPlaying) {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    if (this.sequence) {
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
    Tone.Transport.stop();
    this.sequence = null;
  }
}
