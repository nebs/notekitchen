class ScaleEngine {
	constructor(parser) {
		this.parser = parser;
		this.validScaleNames = ['major'];
        this.validMajorModeNames = {
            'ionian': 12, 
            'dorian': 10, 
            'phrygian': 8, 
            'lydian': 7, 
            'mixolydian': 5, 
            'aeolian': 3, 
            'locrian': 1,
        };
	}
	
	isScale(symbol) {
        let allScaleNames = this.validScaleNames
        for (let modeName in this.validMajorModeNames) {
            allScaleNames.push(modeName);
        }
        const re = new RegExp("[ABCDEFG](#|b)?\\s+(" + allScaleNames.join('|') + ")", 'gi');
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
		
        for (let modeName in this.validMajorModeNames) {
            if (symbol.toLowerCase().includes(' ' + modeName)) {   
                let nextNote = (rootIndex + this.validMajorModeNames[modeName]) % 12;                
                MusicLibrary.majorScaleIntervals.forEach(function(interval, index, array) {
                    notes.push(nextNote);
                    nextNote += interval;
                });                
            }            
        }
        
		if (notes.length == 0 && symbol.toLowerCase().includes('major')) {
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
