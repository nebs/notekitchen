class ChordEngine {
	constructor(parser) {
		this.parser = parser;
	}

	getNotesFromSymbol(symbol) {
		var notes = [];
		const rootString = this.parser.findRoot(symbol);
		if (!rootString) {
			return [];
		}
		
		const rootIndex = this.parser.noteStringToIndex(rootString);
		if (!rootIndex) {
			return [];
		}
		
		var flats = this.parser.findFlats(symbol);
		var sharps = this.parser.findSharps(symbol);

		var thirdIndex = rootIndex + 4;
		if (symbol.includes('m')) { thirdIndex = rootIndex + 3; }
		if (symbol.includes('dim')) { thirdIndex = rootIndex + 3; }			
		if (symbol.includes('sus4')) { thirdIndex = rootIndex + 5; }
		if (symbol.includes('sus2')) { thirdIndex = rootIndex + 2; }

		var fifthIndex = rootIndex + 7;
		if (symbol.includes('dim')) { fifthIndex = rootIndex + 6; }
		if (symbol.includes('b5')) { fifthIndex = rootIndex + 6; }
		if (symbol.includes('#5')) { fifthIndex = rootIndex + 8; }
		if (symbol.includes('+')) { fifthIndex = rootIndex + 8; }
		if (symbol.includes('aug')) { fifthIndex = rootIndex + 8; }

		var seventhIndex = rootIndex;
		if (symbol.includes('7')) { seventhIndex = rootIndex + 10; }
		if (symbol.includes('9')) { seventhIndex = rootIndex + 10; }
		if (symbol.includes('11')) { seventhIndex = rootIndex + 10; }
		if (symbol.includes('13')) { seventhIndex = rootIndex + 10; }
		if (symbol.includes('M7')) { seventhIndex = rootIndex + 11; }
		if (symbol.includes('M9')) { seventhIndex = rootIndex + 11; }
		if (symbol.includes('M11')) { seventhIndex = rootIndex + 11; }
		if (symbol.includes('M13')) { seventhIndex = rootIndex + 11; }			
		if (symbol.includes('dim') && seventhIndex == rootIndex + 10) { seventhIndex--; }												

		var ninthIndex = rootIndex;
		if (!flats.includes(9) && !sharps.includes(9)) {
			if (symbol.includes('9')) { ninthIndex = rootIndex + 14; }
			if (symbol.includes('11')) { ninthIndex = rootIndex + 14; }
			if (symbol.includes('13')) { ninthIndex = rootIndex + 14; }				
		}

		var eleventhIndex = rootIndex;
		if (!flats.includes(11) && !sharps.includes(11)) {
			if (symbol.includes('11')) { eleventhIndex = rootIndex + 17; }
			if (symbol.includes('13')) { eleventhIndex = rootIndex + 17; }
		}
	
		var thirteenthIndex = rootIndex;
		if (!flats.includes(13) && !sharps.includes(13)) {			
			if (symbol.includes('13')) { thirteenthIndex = rootIndex + 21; }
		}
	
		var addToNotes = function(index) {
			var val = index % Config.totalNotes;
			if (val == 0) {
				val = 12;
			}
			if (!notes.includes(val)) {
				notes.push(val);
			}
		};
	
		const majorIntervals = [2, 2, 1, 2, 2, 2, 1];
		flats.forEach(function(flatIndex, i, array) {
			var noteIndex = 0;
			var flatValue = rootIndex;
			for (noteIndex = 0; noteIndex < flatIndex - 1; noteIndex++) {
				flatValue += majorIntervals[noteIndex % majorIntervals.length];					
			}
			addToNotes(flatValue - 1);
		});
		sharps.forEach(function(sharpIndex, i, array) {
			var noteIndex = 0;
			var sharpValue = rootIndex;
			for (noteIndex = 0; noteIndex < sharpIndex - 1; noteIndex++) {
				sharpValue += majorIntervals[noteIndex % majorIntervals.length];					
			}
			addToNotes(sharpValue + 1);
		});			
	
		addToNotes(rootIndex);
		addToNotes(thirdIndex);
		addToNotes(fifthIndex);
		addToNotes(seventhIndex);
		addToNotes(ninthIndex);
		addToNotes(eleventhIndex);
		addToNotes(thirteenthIndex);
	
		return notes;		
	}
	
	getNotesFromQuery(query) {	
		var notes = [];
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
