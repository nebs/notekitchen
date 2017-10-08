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
	
	note_letters.forEach(function(letter, i, array) {
		if (input.includes(letter)) {
			root_index = i + 1;
			root_letter = letter;
			return;
		}
	});

	if (input.includes(root_letter + '#')) { root_index++; }
	if (input.includes(root_letter + 'b')) { root_index--; }			
	root_index = root_index % 12;
	if (root_index == 0) { root_index = 12; }

	if (root_index < 0) {
		console.log("Invalid root note");
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

function drawKeyboard(selectedNotes) {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
	
	const whiteNoteIndexes = [1,3,5,6,8,10,12];
	const blackNoteIndexes = [2,4,7,9,11];
	const whiteNotesPerOctaveCount = 7;			
	const blackNotesPerOctaveCount = 5;
	const whiteNoteCount = TOTAL_OCTAVES * whiteNotesPerOctaveCount;
	const blackNoteCount = TOTAL_OCTAVES * blackNotesPerOctaveCount;
	const whiteNoteWidth = canvas.width / whiteNoteCount;
	const blackNoteWidth = whiteNoteWidth * 0.5;
	const whiteNoteHeight = canvas.height;
	const blackNoteHeight = whiteNoteHeight * 0.7;
	
	var i = 0;
	var currentOctave = 0;
	for (i=0; i<whiteNoteCount; i++) {
		currentOctave = Math.floor(i / whiteNotesPerOctaveCount);
		const x = i * whiteNoteWidth;
		const y = 0;
		const w = whiteNoteWidth;
		const h = whiteNoteHeight;
		const noteIndex = whiteNoteIndexes[i % whiteNoteIndexes.length];
		if (selectedNotes.includes(noteIndex + (currentOctave * NOTES_PER_OCTAVE))) {
			ctx.fillStyle = '#A8B272';
		} else {
			ctx.fillStyle = '#FFF';
		}				
		ctx.strokeStyle = '#000';
		ctx.lineWidth = 1;				
		ctx.fillRect(x, y, w, h);				
		ctx.strokeRect(x, y, w, h);				
	}

	const blackNoteOffsets = [1, 1, 2, 2, 2];
	currentOctave = 0;
	const octaveWidth = canvas.width / TOTAL_OCTAVES;
	for (i=0; i<blackNoteCount; i++) {
		currentOctave = Math.floor(i / blackNotesPerOctaveCount);
		const offsetIndex = i % blackNoteOffsets.length;
		const offset = blackNoteOffsets[offsetIndex];
		const x = (currentOctave * octaveWidth) + ((offsetIndex + offset) * whiteNoteWidth) - (blackNoteWidth / 2);
		const y = 0;
		const w = blackNoteWidth;
		const h = blackNoteHeight;
		const noteIndex = blackNoteIndexes[i % blackNoteIndexes.length];
		if (selectedNotes.includes(noteIndex + (currentOctave * NOTES_PER_OCTAVE))) {
			ctx.fillStyle = '#A8B272';			
		} else {
			ctx.fillStyle = '#333';
		}				
		ctx.strokeStyle = '#000';
		ctx.lineWidth = 1;
		ctx.fillRect(x, y, w, h);				
		ctx.strokeRect(x, y, w, h);								
	}			
  }
}		

document.addEventListener("DOMContentLoaded", function(event) { 
	var input = document.getElementById("in");
	var container = document.getElementById("container");
	
	input.focus();
	input.oninput = function () {				
		var notes = processInput(input.value);
		drawKeyboard(notes);				
	}
	
	drawKeyboard([]);
});