class Parser {
	constructor() {
		this.sharpNoteNames = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
		this.flatNoteNames  = ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];		
	}
	
	transposeNote(noteString, amount) {
		var noteIndex = this.sharpNoteNames.indexOf(noteString);
		if (noteIndex < 0) {			
			noteIndex = this.flatNoteNames.indexOf(noteString);
		}
		if (noteIndex < 0) {
			return noteString;
		}
		
		noteIndex += amount;
		noteIndex = noteIndex % Config.notesPerOctave;
		if (noteIndex < 0) {
			noteIndex = Config.notesPerOctave - 1;
		}
		
		var transposedNoteString = noteString;
		if (amount < 0) {
			transposedNoteString = this.flatNoteNames[noteIndex];
		} else {
			transposedNoteString = this.sharpNoteNames[noteIndex];			
		}
		return transposedNoteString;
	}
	
	transposeQuery(query, amount) {
		if (!this.findRoot(query)) {
			return query;
		}
		
		var re = /[ABCDEFG]b?#?/g;
		var match = null;
		var indexes = [];
		var notes = [];
		var noteCount = 0;
		while ((match = re.exec(query)) != null) {
			indexes.push(match.index);
			notes.push(match[0]);
			noteCount++;
		}

		var newQuery = query;
		var i = 0;
		for (i = noteCount - 1; i >= 0; i--) {
			const index = indexes[i];
			const note = notes[i];
			const newNote = this.transposeNote(note, amount);
			const prefix = newQuery.substr(0, index);
			const middle = newNote;
			const suffix = newQuery.substr(index + note.length);
			newQuery = prefix + middle + suffix;
		}
		return newQuery;
	}
	
	findNotes(query) {
		return query.match(/[ABCDEFG]b?#?/g);
	}
	
	findSymbols(query) {
		if (!query) {
			return null;
		}
		
		const symbols = query.match(/[ABCDEFG](b?#?)([^ABCDEFG])*/g);
		if (!symbols) {
			return null;
		}
		
		return symbols.map(function(symbol) {
			return symbol.trim().replace(/\s+/g,' ');
		});
	}
	
	hasIsolatedRoot(query) {
		return query.search(/[ABCDEFG]b?#?\s/g) >= 0;
	}
	
	findRoot(query) {
		const results = query.match(/[ABCDEFG]b?#?/);
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