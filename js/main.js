document.addEventListener("DOMContentLoaded", function(event) { 
	let $query = document.getElementById("query");
	let $pianoCanvas = document.getElementById('piano-canvas');
	let $shadowCanvas = document.getElementById('shadow-canvas');
	
	const parser = new Parser();
	const settings = new Settings();		
	const pianoView = new PianoView($pianoCanvas, settings);
	const shadowView = new ShadowView($shadowCanvas, $pianoCanvas);
    const soundEngine = new SoundEngine(parser);
	const noteEngine = new NoteEngine(parser);
	const chordEngine = new ChordEngine(parser);
	const scaleEngine = new ScaleEngine(parser);	
	const commandEngine = new CommandEngine(settings);
	const app = new App($query, 
                        soundEngine,
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