class ScaleEngine {
	constructor() {
		this.validScaleNames = ['major'];
		this.majorIntervals = [2, 2, 1, 2, 2, 2, 1];
	}
	
	isScale(query) {
		var isValid = false;
		this.validScaleNames.some(function(name, index, array) {
			isValid = query.toLowerCase().includes(name);
			return isValid;
		});
		return isValid;
	}
	
	parse(query) {
		if (!this.isScale(query)) {
			return null;
		}
		
		var notes = [];
		
		var note_letters = ['C','_','D','_','E','F','_','G','_','A','_','B'];
	  	var root_index = -1;
	  	var root_letter = '';
	
		note_letters.some(function(letter, i, array) {
			if (query.includes(letter)) {
				root_index = i + 1;
				root_letter = letter;
				return true;
			}
		
			return false;
		});

		if (query.includes(root_letter + '#')) { root_index++; }
		if (query.includes(root_letter + 'b')) { root_index--; }			
		root_index = root_index % 12;
		if (root_index == 0) { root_index = 12; }

		if (root_index < 0) {
			return null;
		}
		
		if (query.toLowerCase().includes('major')) {
			var nextNote = root_index;			
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
}
