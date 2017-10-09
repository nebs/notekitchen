document.addEventListener("DOMContentLoaded", function(event) { 
	var $query = document.getElementById("query");
	var $pianoCanvas = document.getElementById('piano-canvas');
	var $shadowCanvas = document.getElementById('shadow-canvas');
	
	const parser = new Parser();
	const settings = new Settings();		
	const pianoView = new PianoView($pianoCanvas, settings);
	const shadowView = new ShadowView($shadowCanvas, $pianoCanvas);
	const noteEngine = new NoteEngine(parser);
	const chordEngine = new ChordEngine(parser);
	const scaleEngine = new ScaleEngine(parser);	
	const commandEngine = new CommandEngine(settings);
	const app = new App($query, 
					    noteEngine, 
						chordEngine, 
						scaleEngine, 
						commandEngine, 
						shadowView, 
						pianoView, 
						parser, 
						settings);
	app.start();
});