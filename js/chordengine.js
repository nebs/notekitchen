class ChordEngine {
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
		
		let flats = this.parser.findFlats(symbol);
		let sharps = this.parser.findSharps(symbol);

		let thirdIndex = rootIndex + 4;
		if (symbol.includes('m') && !symbol.includes('maj')) { thirdIndex = rootIndex + 3; }
		if (symbol.includes(rootString + '-')) { thirdIndex = rootIndex + 3; }		
		if (symbol.includes('dim')) { thirdIndex = rootIndex + 3; }			
		if (symbol.includes('sus4')) { thirdIndex = rootIndex + 5; }
		if (symbol.includes('sus2')) { thirdIndex = rootIndex + 2; }

		let fifthIndex = rootIndex + 7;
		if (symbol.includes('dim')) { fifthIndex = rootIndex + 6; }
		if (symbol.includes('b5')) { fifthIndex = rootIndex + 6; }
		if (symbol.includes('#5')) { fifthIndex = rootIndex + 8; }
		if (symbol.includes('+5')) { fifthIndex = rootIndex + 8; }
		if (symbol.includes('+7')) { fifthIndex = rootIndex + 8; }
		if (symbol.includes('aug')) { fifthIndex = rootIndex + 8; }

		let sixthIndex = rootIndex;
		if (symbol.includes('6')) { sixthIndex = rootIndex + 9; }

		let seventhIndex = rootIndex;
		if (symbol.includes('7')) { seventhIndex = rootIndex + 10; }
		if (symbol.includes('9')) { seventhIndex = rootIndex + 10; }
		if (symbol.includes('11')) { seventhIndex = rootIndex + 10; }
		if (symbol.includes('13')) { seventhIndex = rootIndex + 10; }
		if (symbol.includes('M7')) { seventhIndex = rootIndex + 11; }
		if (symbol.includes('M9')) { seventhIndex = rootIndex + 11; }
		if (symbol.includes('M11')) { seventhIndex = rootIndex + 11; }
		if (symbol.includes('M13')) { seventhIndex = rootIndex + 11; }
		if (symbol.includes('maj7')) { seventhIndex = rootIndex + 11; }
		if (symbol.includes('maj9')) { seventhIndex = rootIndex + 11; }
		if (symbol.includes('maj11')) { seventhIndex = rootIndex + 11; }
		if (symbol.includes('maj13')) { seventhIndex = rootIndex + 11; }
		if (symbol.includes('dim') && seventhIndex == rootIndex + 10) { seventhIndex--; }												

		let ninthIndex = rootIndex;
		if (!flats.includes(9) && !sharps.includes(9)) {
			if (symbol.includes('9')) { ninthIndex = rootIndex + 14; }
			if (symbol.includes('11')) { ninthIndex = rootIndex + 14; }
			if (symbol.includes('13')) { ninthIndex = rootIndex + 14; }				
		}

		let eleventhIndex = rootIndex;
		if (!flats.includes(11) && !sharps.includes(11)) {
			if (symbol.includes('11')) { eleventhIndex = rootIndex + 17; }
			if (symbol.includes('13')) { eleventhIndex = rootIndex + 17; }
		}
	
		let thirteenthIndex = rootIndex;
		if (!flats.includes(13) && !sharps.includes(13)) {			
			if (symbol.includes('13')) { thirteenthIndex = rootIndex + 21; }
		}
	
		let addToNotes = function(index) {
			let val = index % Config.totalNotes;
			if (val == 0) {
				val = 12;
			}
			if (!notes.includes(val)) {
				notes.push(val);
			}
		};
	
        const majorScaleIntervals = MusicLibrary.scaleIntervals['major'];
        
		flats.forEach(function(flatIndex, i, array) {
			let noteIndex = 0;
			let flatValue = rootIndex;
			for (noteIndex = 0; noteIndex < flatIndex - 1; noteIndex++) {
				flatValue += majorScaleIntervals[noteIndex % majorScaleIntervals.length];
			}
			addToNotes(flatValue - 1);
		});
		sharps.forEach(function(sharpIndex, i, array) {
			let noteIndex = 0;
			let sharpValue = rootIndex;
			for (noteIndex = 0; noteIndex < sharpIndex - 1; noteIndex++) {
				sharpValue += majorScaleIntervals[noteIndex % majorScaleIntervals.length];
			}
			addToNotes(sharpValue + 1);
		});			
	
		addToNotes(rootIndex);
		addToNotes(thirdIndex);
		addToNotes(fifthIndex);
		addToNotes(sixthIndex);
		addToNotes(seventhIndex);
		addToNotes(ninthIndex);
		addToNotes(eleventhIndex);
		addToNotes(thirteenthIndex);
	
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
