class ScaleEngine {
  constructor(parser) {
    this.parser = parser;
  }

  isScale(symbol) {
    const re = new RegExp("[ABCDEFG](#|b)?\\s+(" + MusicLibrary.scaleNames.join('|') + ")", 'gi');
    return re.test(symbol);
  }

  getNotesFromSymbol(symbol) {
    if (!this.isScale(symbol)) {
      return [];
    }

    const rootString = this.parser.findRoot(symbol);
    if (!rootString) {
      return [];
    }

    const rootIndex = this.parser.noteStringToIndex(rootString);
    if (!rootIndex) {
      return [];
    }

    let notes = [];
    const scaleNames = MusicLibrary.scaleNames;
    for (let i in scaleNames) {
      const scaleName = scaleNames[i];
      if (symbol.toLowerCase().includes(scaleName)) {
        let nextNote = rootIndex;
        MusicLibrary.scaleIntervals[scaleName].forEach(function(interval, index, array) {
          notes.push(nextNote);
          nextNote += interval;
        });
        break;
      }
    }

    // Duplicates notes across remaining octaves
    let notesOctave = notes.slice(0);
    let i = 1;
    for (i = 1; i < Config.totalOctaves; i++) {
      notesOctave = notesOctave.map(function(n) {
        const value = n + Config.notesPerOctave;
        if (value == Config.totalNotes) {
          return value;
        } else {
          return value % Config.totalNotes;
        }
      });
      notes = notes.concat(notesOctave);
    }
    return notes.sort((a, b) => (a - b));
  }

  getNotesFromQuery(query) {
    let notes = [];
    const symbols = this.parser.findSymbols(query);
    if (!symbols) {
      return [];
    }
    symbols.forEach(function(symbol, i, a) {
      const symbolNotes = this.getNotesFromSymbol(symbol);
      symbolNotes.forEach(function(note, j, b) {
        if (!notes.includes(note)) {
          notes.push(note);
        }
      });
    }, this);
    return notes.sort((a, b) => (a - b));
  }
}
