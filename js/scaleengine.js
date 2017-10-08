class ScaleEngine {
	constructor(parser) {
		this.parser = parser;
		this.validScaleNames = ['major'];
		this.majorIntervals = [2, 2, 1, 2, 2, 2, 1];
	}
	
	isScale(symbol) {
		var isValid = false;
		this.validScaleNames.some(function(name, index, array) {
			isValid = symbol.toLowerCase().includes(name);
			return isValid;
		});
		return isValid;
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
		
		var notes = [];		
		
		if (symbol.toLowerCase().includes('major')) {
			var nextNote = rootIndex;			
			this.majorIntervals.forEach(function(interval, index, array) {
				notes.push(nextNote);
				nextNote += interval;
			});
		}
		
		// Duplicates notes across remaining octaves
		var notesOctave = notes.slice(0);
		var i = 1;
		for (i = 1; i < Config.totalOctaves; i++) {
			notesOctave = notesOctave.map(function(n) {
			   return n + Config.notesPerOctave;
			});
			notes = notes.concat(notesOctave);
		}
		
		return notes;
	}
	
	getNotesFromQuery(query) {	
		var notes = [];
		const symbols = this.parser.findSymbols(query);
		symbols.forEach(function(symbol, index, array) {
			const symbolNotes = this.getNotesFromSymbol(symbol);
			notes = notes.concat(symbolNotes);
		}, this);
		return notes;
	}	
}
