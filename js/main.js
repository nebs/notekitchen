document.addEventListener("DOMContentLoaded", function(event) { 
	var $query = document.getElementById("query");
	var $canvas = document.getElementById('canvas');
	
	const settings = new Settings();		
	const pianoView = new PianoView($canvas, settings);
	const chordEngine = new ChordEngine();
	const scaleEngine = new ScaleEngine();	
	const commandEngine = new CommandEngine(settings);
	const app = new App($query, chordEngine, scaleEngine, commandEngine, pianoView);
});