document.addEventListener("DOMContentLoaded", function(event) { 
	var $query = document.getElementById("query");
	var $canvas = document.getElementById('canvas');
	
	const pianoView = new PianoView($canvas);
	const chordEngine = new ChordEngine();
	const scaleEngine = new ScaleEngine();	
	const commandEngine = new CommandEngine();
	const app = new App($query, chordEngine, scaleEngine, commandEngine, pianoView);
});