document.addEventListener("DOMContentLoaded", function(event) { 
	let $query = document.getElementById("query");
	let $canvas = document.getElementById('canvas');
    let $title = document.getElementById('piano-title');
    let $link = document.getElementById('link');
	
	const parser = new Parser();
	const settings = new Settings();		
	const pianoView = new PianoView($canvas, settings, parser);
    const soundEngine = new SoundEngine(parser);
	const noteEngine = new NoteEngine(parser);
	const chordEngine = new ChordEngine(parser);
	const scaleEngine = new ScaleEngine(parser);	
	const commandEngine = new CommandEngine(settings);
	const app = new App($query, 
                        $title,
                        $link,
                        soundEngine,
					    noteEngine, 
						chordEngine, 
						scaleEngine, 
						commandEngine, 
						pianoView, 
						parser, 
						settings);
	app.start();
});