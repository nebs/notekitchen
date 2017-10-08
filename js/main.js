const TOTAL_OCTAVES = 3;
const NOTES_PER_OCTAVE = 12;
const TOTAL_NOTES = TOTAL_OCTAVES * NOTES_PER_OCTAVE;

document.addEventListener("DOMContentLoaded", function(event) { 
	var input = document.getElementById("in");
	var container = document.getElementById("container");
	var canvas = document.getElementById('canvas');
	
	const keyboard = new PianoKeyboardUI(canvas);
	const chordEngine = new ChordEngine();
	
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
	
	input.focus();
	input.oninput = function () {				
		if (input.value.toLowerCase().includes('show names')) {
			showNames = true;
		} else if (input.value.toLowerCase().includes('hide names')) {
			showNames = false;
		}
		var notes = chordEngine.extractNotes(input.value);
		keyboard.draw(notes, showNames);				
	}
	
	keyboard.draw([], showNames);
});