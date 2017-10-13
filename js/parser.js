class Parser {
	transposeNote(noteString, amount) {
		let noteIndex = MusicLibrary.sharpNoteNames.indexOf(noteString);
		if (noteIndex < 0) {			
			noteIndex = MusicLibrary.flatNoteNames.indexOf(noteString);
		}
		if (noteIndex < 0) {
			return noteString;
		}
		
		noteIndex += amount;		
		noteIndex = noteIndex % Config.notesPerOctave;
		if (noteIndex < 0) {
			noteIndex = Config.notesPerOctave + noteIndex;
		}		
		
		let transposedNoteString = noteString;
		if (amount < 0) {
			transposedNoteString = MusicLibrary.flatNoteNames[noteIndex];
		} else {
			transposedNoteString = MusicLibrary.sharpNoteNames[noteIndex];			
		}
		return transposedNoteString;
	}
	
	transposeQuery(query, amount) {
		if (!this.findRoot(query)) {
			return query;
		}
		
		let re = /[ABCDEFG]b?#?/g;
		let match = null;
		let indexes = [];
		let notes = [];
		let noteCount = 0;
		while ((match = re.exec(query)) != null) {
			indexes.push(match.index);
			notes.push(match[0]);
			noteCount++;
		}

		let newQuery = query;
		let i = 0;
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
        if (!query) {
            return null;
        }
        
		const notes = query.match(/[ABCDEFG]b?#?/g);
        if (!notes) {
            return null;
        }
        return notes.map(function(note) {
            if (note == 'Cb') {
                return 'B';
            } else if (note == 'B#') {
                return 'C';
            } else if (note == 'E#') {
                return 'F';
            } else if (note == 'Fb') {
                return 'E';
            } else {
                return note;
            }
        });
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
        if (!query) {
            return false;
        }
        
		return query.search(/[ABCDEFG]b?#?(\s|$)/g) >= 0;
	}
	
	findRoot(query) {
		if (!query) {
			return null;
		}
		
		const results = query.match(/[ABCDEFG]b?#?/);
		if (results && results.length > 0) {
			return results[0];
		}
		return null;
	}
	
    findOctave(query) {
		if (!query) {
			return null;
		}
		
		const results = query.match(/\d+/);
		if (results && results.length > 0) {
			return parseInt(results[0], 10);
		}
		return null;        
    }
    
	noteStringToIndex(noteString) {
		let noteIndex = MusicLibrary.sharpNoteNames.indexOf(noteString);
		if (noteIndex < 0) {
			noteIndex = MusicLibrary.flatNoteNames.indexOf(noteString);
		}

		if (noteIndex < 0) {
			return null;
		} else {
			return noteIndex + 1;
		}
	}
	
	findNumbersFollowingModifiers(query, modifiers) {
		const re = new RegExp("(" + modifiers.join('|') + ")\\d+", "g");
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
		return this.findNumbersFollowingModifiers(query, ['b', '-']);
	}
	
	findSharps(query) {
		return this.findNumbersFollowingModifiers(query, ['#','\\+']);
	}
}