class Parser {
	constructor() {
		this.sharpNoteNames = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
		this.flatNoteNames = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];		
	}
	
	findSymbols(query) {
		return query.match(/[ABCDEFG](b?#?)([^ABCDEFG])*/g);
	}
	
	findRoot(query) {
		const results = query.match(/([ABCDEFG]b?#?)/);
		if (results && results.length > 0) {
			return results[0];
		}
		return null;
	}
	
	noteStringToIndex(noteString) {
		var noteIndex = this.sharpNoteNames.indexOf(noteString);
		if (noteIndex < 0) {
			noteIndex = this.flatNoteNames.indexOf(noteString);
		}

		if (noteIndex < 0) {
			return null;
		} else {
			return noteIndex + 1;
		}
	}
	
	findNumbersFollowingModifier(query, modifier) {
		const re = new RegExp(modifier + "\\d+", "g");
		const results = query.match(re);
		if (!results) {
			return [];
		}
		
		const flats = [];
		results.forEach(function(flatString, i, array) {
			const number = parseInt(flatString.slice(1), 10);
			if (!flats.includes(number)) {
				flats.push(number);
			}
		});
		return flats;				
	}
	
	findFlats(query) {
		return this.findNumbersFollowingModifier(query, 'b');
	}
	
	findSharps(query) {
		return this.findNumbersFollowingModifier(query, '#');
	}	
}