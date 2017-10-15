class ScaleEngine {
	constructor(parser) {
		this.parser = parser;
		this.validScaleNames = ['major', 'ionian'];
	}
	
	isScale(symbol) {
        const re = new RegExp("[ABCDEFG](#|b)?\\s+(" + this.validScaleNames.join('|') + ")", 'gi');
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
		
		if (symbol.toLowerCase().includes('major') || symbol.toLowerCase().includes('ionian')) {
			let nextNote = rootIndex;			
			MusicLibrary.majorScaleIntervals.forEach(function(interval, index, array) {
				notes.push(nextNote);
				nextNote += interval;
			});
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
		
		return notes;
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
