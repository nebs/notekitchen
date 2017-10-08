const TOTAL_OCTAVES = 3;
const NOTES_PER_OCTAVE = 12;
const TOTAL_NOTES = TOTAL_OCTAVES * NOTES_PER_OCTAVE;

var numbersWithModifier = function(input, modifier) {
	var numbers = []
	var re = new RegExp("(" + modifier + "\\d{1,})(?!.*\\1)", "g");
	var results = input.match(re);
	if (!results) {
		return [];
	}
	numbers = results.map(function(x) {
	   return parseInt(x.slice(1), 10);
	});
	return numbers
}

var processInput = function(input) {
	if (input === undefined || input.length == 0) {
		return [];
	}
	
	var notes = [];

	var note_letters = ['C','_','D','_','E','F','_','G','_','A','_','B'];
  	var root_index = -1;
  	var root_letter = '';
	
	note_letters.some(function(letter, i, array) {
		if (input.includes(letter)) {
			root_index = i + 1;
			root_letter = letter;
			return true;
		}
		
		return false;
	});

	if (input.includes(root_letter + '#')) { root_index++; }
	if (input.includes(root_letter + 'b')) { root_index--; }			
	root_index = root_index % 12;
	if (root_index == 0) { root_index = 12; }

	if (root_index < 0) {
		return [];
	}

	var flats = numbersWithModifier(input, 'b');
	var sharps = numbersWithModifier(input, '#');

	var third_index = root_index + 4;
	if (input.includes('m')) { third_index = root_index + 3; }
	if (input.includes('dim')) { third_index = root_index + 3; }			

	var fifth_index = root_index + 7;
	if (input.includes('dim')) { fifth_index = root_index + 6; }
	if (input.includes('b5')) { fifth_index = root_index + 6; }
	if (input.includes('#5')) { fifth_index = root_index + 8; }
	if (input.includes('aug')) { fifth_index = root_index + 8; }									

	var seventh_index = root_index;
	if (input.includes('7')) { seventh_index = root_index + 10; }
	if (input.includes('9')) { seventh_index = root_index + 10; }
	if (input.includes('11')) { seventh_index = root_index + 10; }
	if (input.includes('13')) { seventh_index = root_index + 10; }
	if (input.includes('M7')) { seventh_index = root_index + 11; }
	if (input.includes('M9')) { seventh_index = root_index + 11; }
	if (input.includes('M11')) { seventh_index = root_index + 11; }
	if (input.includes('M13')) { seventh_index = root_index + 11; }			
	if (input.includes('dim') && seventh_index == root_index + 10) { seventh_index--; }												

	var ninth_index = root_index;
	if (!flats.includes(9) && !sharps.includes(9)) {
		if (input.includes('9')) { ninth_index = root_index + 14; }
		if (input.includes('11')) { ninth_index = root_index + 14; }
		if (input.includes('13')) { ninth_index = root_index + 14; }				
	}

	var eleventh_index = root_index;
	if (!flats.includes(11) && !sharps.includes(11)) {
		if (input.includes('11')) { eleventh_index = root_index + 17; }
		if (input.includes('13')) { eleventh_index = root_index + 17; }
	}
	
	var thirteenth_index = root_index;
	if (!flats.includes(13) && !sharps.includes(13)) {			
		if (input.includes('13')) { thirteenth_index = root_index + 21; }
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

document.addEventListener("DOMContentLoaded", function(event) { 
	var input = document.getElementById("in");
	var container = document.getElementById("container");
	var canvas = document.getElementById('canvas');
	
	input.onkeyup = function(e) {
		e.preventDefault();
		if (e.keyCode == 13) {
			if (input.value.toLowerCase().includes('show names')) {
				input.value = '';
			} else if (input.value.toLowerCase().includes('hide names')) {
				input.value = '';
			}
		}
	}
	
	var showNames = false;
	
	const keyboard = new PianoKeyboardUI(canvas);
	
	input.focus();
	input.oninput = function () {				
		if (input.value.toLowerCase().includes('show names')) {
			showNames = true;
		} else if (input.value.toLowerCase().includes('hide names')) {
			showNames = false;
		}
		var notes = processInput(input.value);
		keyboard.draw(notes, showNames);				
	}
	
	keyboard.draw([], showNames);
});