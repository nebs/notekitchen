class ChordEngine {
	constructor() {
	}
	
	extractNotes(symbol) {
		if (symbol === undefined || symbol.length == 0) {
			return [];
		}
	
		var notes = [];

		var note_letters = ['C','_','D','_','E','F','_','G','_','A','_','B'];
	  	var root_index = -1;
	  	var root_letter = '';
	
		note_letters.some(function(letter, i, array) {
			if (symbol.includes(letter)) {
				root_index = i + 1;
				root_letter = letter;
				return true;
			}
		
			return false;
		});

		if (symbol.includes(root_letter + '#')) { root_index++; }
		if (symbol.includes(root_letter + 'b')) { root_index--; }			
		root_index = root_index % 12;
		if (root_index == 0) { root_index = 12; }

		if (root_index < 0) {
			return [];
		}

		var flats = numbersWithModifier(symbol, 'b');
		var sharps = numbersWithModifier(symbol, '#');

		var third_index = root_index + 4;
		if (symbol.includes('m')) { third_index = root_index + 3; }
		if (symbol.includes('dim')) { third_index = root_index + 3; }			

		var fifth_index = root_index + 7;
		if (symbol.includes('dim')) { fifth_index = root_index + 6; }
		if (symbol.includes('b5')) { fifth_index = root_index + 6; }
		if (symbol.includes('#5')) { fifth_index = root_index + 8; }
		if (symbol.includes('aug')) { fifth_index = root_index + 8; }									

		var seventh_index = root_index;
		if (symbol.includes('7')) { seventh_index = root_index + 10; }
		if (symbol.includes('9')) { seventh_index = root_index + 10; }
		if (symbol.includes('11')) { seventh_index = root_index + 10; }
		if (symbol.includes('13')) { seventh_index = root_index + 10; }
		if (symbol.includes('M7')) { seventh_index = root_index + 11; }
		if (symbol.includes('M9')) { seventh_index = root_index + 11; }
		if (symbol.includes('M11')) { seventh_index = root_index + 11; }
		if (symbol.includes('M13')) { seventh_index = root_index + 11; }			
		if (symbol.includes('dim') && seventh_index == root_index + 10) { seventh_index--; }												

		var ninth_index = root_index;
		if (!flats.includes(9) && !sharps.includes(9)) {
			if (symbol.includes('9')) { ninth_index = root_index + 14; }
			if (symbol.includes('11')) { ninth_index = root_index + 14; }
			if (symbol.includes('13')) { ninth_index = root_index + 14; }				
		}

		var eleventh_index = root_index;
		if (!flats.includes(11) && !sharps.includes(11)) {
			if (symbol.includes('11')) { eleventh_index = root_index + 17; }
			if (symbol.includes('13')) { eleventh_index = root_index + 17; }
		}
	
		var thirteenth_index = root_index;
		if (!flats.includes(13) && !sharps.includes(13)) {			
			if (symbol.includes('13')) { thirteenth_index = root_index + 21; }
		}
	
		var addToNotes = function(index) {
			var val = index % TOTAL_NOTES;
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
			var flatValue = root_index;
			for (noteIndex = 0; noteIndex < flatIndex - 1; noteIndex++) {
				flatValue += majorIntervals[noteIndex % majorIntervals.length];					
			}
			addToNotes(flatValue - 1);
		});
		sharps.forEach(function(sharpIndex, i, array) {
			var noteIndex = 0;
			var sharpValue = root_index;
			for (noteIndex = 0; noteIndex < sharpIndex - 1; noteIndex++) {
				sharpValue += majorIntervals[noteIndex % majorIntervals.length];					
			}
			addToNotes(sharpValue + 1);
		});			
	
		addToNotes(root_index);
		addToNotes(third_index);
		addToNotes(fifth_index);
		addToNotes(seventh_index);
		addToNotes(ninth_index);
		addToNotes(eleventh_index);
		addToNotes(thirteenth_index);
	
		return notes;		
	}
}
