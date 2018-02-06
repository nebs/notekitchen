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
	
    areSameRootNotes(noteA, noteB) {
        if (!noteA || !noteB) {
            return false;
        }
        
        return (noteA % 12) == (noteB % 12);
    }
    
    includesRoot(notes, root) {
        if (!notes || !root) {
            return false;
        }
        
        let includes = false;
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            if (this.areSameRootNotes(root, note)) {
                includes = true;
                break;
            }            
        }
        return includes;
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
		
        const validQuery = query.match(/[ABCDEFG](#|b)?\d+/);
        if (!validQuery || validQuery.length == 0) {
            return null;
        }
        
		const results = validQuery[0].match(/\d+/);
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
			noteIndex = MusicLibrary.altNoteNames.indexOf(noteString);
		}

		if (noteIndex < 0) {
			return null;
		} else {
			return noteIndex + 1;
		}
	}
	
	findFlats(query) {
        if (!query) {
            return [];
        }
        
        const safeQuery = query.replace(/([ABCDEFG](b|#)?)-?\d+/g, '');
		const results = safeQuery.match(/(b|-)\d+/g);
		if (!results) {
			return [];
		}
		
		const output = [];
		results.forEach(function(substring, i, array) {
			const number = parseInt(substring.slice(1), 10);
			if (!output.includes(number)) {
				output.push(number);
			}
		});
		return output;
	}
	
	findSharps(query) {
        if (!query) {
            return [];
        }
        
        const safeQuery = query.replace(/([ABCDEFG](b|#)?)\+?\d+/g, '');
		const results = safeQuery.match(/(#|\+)\d+/g);
		if (!results) {
			return [];
		}
		
		const output = [];
		results.forEach(function(substring, i, array) {
			const number = parseInt(substring.slice(1), 10);
			if (!output.includes(number)) {
				output.push(number);
			}
		});
		return output;
	}
    
    getQueryFromURL(url) {
        if (!url) return null;
        const regex = new RegExp("[?&]q(=([^&#]*)|&|#|$)");
        let results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return null;
        const query = decodeURIComponent(results[2].replace(/\+/g, " ")).trim();
        if (query.length == 0) {
            return null;
        }
        return query;
    }
    
    getURLFromQuery(query) {
        if (!query || query.trim().length == 0) {
            return null;
        }
        return "?q=" + encodeURIComponent(query.trim());
    }
}