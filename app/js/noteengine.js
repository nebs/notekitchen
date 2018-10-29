class NoteEngine {
  constructor(parser) {
    this.parser = parser;
  }

  getNotesFromSymbol(symbol) {
    let notes = [];
    const rootString = this.parser.findRoot(symbol);
    if (!rootString) {
      return [];
    }

    const rootIndex = this.parser.noteStringToIndex(rootString);
    if (!rootIndex) {
      return [];
    }

    return [rootIndex];
  }

  getNotesFromQuery(query) {
    let notes = [];

    const symbols = this.parser.findSymbols(query);
    if (!symbols) {
      return [];
    }
    symbols.forEach(function(symbol, index, array) {
      const symbolNotes = this.getNotesFromSymbol(symbol);
      notes = notes.concat(symbolNotes);
    }, this);
    return notes;
  }
}
