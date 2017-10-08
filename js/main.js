const TOTAL_OCTAVES = 3;
const NOTES_PER_OCTAVE = 12;
const TOTAL_NOTES = TOTAL_OCTAVES * NOTES_PER_OCTAVE;

document.addEventListener("DOMContentLoaded", function(event) { 
	var $query = document.getElementById("query");
	var $canvas = document.getElementById('canvas');
	
	const pianoView = new PianoView($canvas);
	const chordEngine = new ChordEngine();
	const scaleEngine = new ScaleEngine();	
	const commandEngine = new CommandEngine();
	const app = new App($query, chordEngine, scaleEngine, commandEngine, pianoView);
});