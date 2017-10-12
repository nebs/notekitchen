class App {
	constructor($input, soundEngine, noteEngine, chordEngine, scaleEngine, commandEngine, shadowView, pianoView, parser, settings) {
		this.$input = $input; 
        this.soundEngine = soundEngine;
		this.noteEngine = noteEngine;
		this.chordEngine = chordEngine; 
		this.scaleEngine = scaleEngine; 
		this.commandEngine = commandEngine;
		this.shadowView = shadowView;
		this.pianoView = pianoView;
		this.parser = parser;
		this.settings = settings;
		this.activeNotes = null;
	}
	
	draw() {
		if (!this.activeNotes) {
			this.pianoView.clear();
            this.soundEngine.clear();
		} else {
			this.pianoView.draw(this.activeNotes);
            this.soundEngine.queueNotes(this.activeNotes);
		}
	}
	
	processQuery() {
		const query = this.$input.value;
		if (query === undefined || query.length == 0) {
			this.activeNotes = null;				
			this.draw();
			return;
		}			

		this.$input.classList.remove(Config.validCommandCSSClass);
		if (this.commandEngine.isCommand(query)) {
			if (this.commandEngine.isValidCommand(query)) {
				this.$input.classList.add(Config.validCommandCSSClass);
			}
			
			this.activeNotes = null;				
			this.draw();
			return;
		}

		if (this.settings.onlyShowRoots) {
			const singleNotes = this.noteEngine.getNotesFromQuery(query);
			if (singleNotes.length > 0) {
				this.activeNotes = singleNotes;
				this.draw();
				return;
			}
		}
		
		const scaleNotes = this.scaleEngine.getNotesFromQuery(query);
		if (scaleNotes.length > 0) {
			this.activeNotes = scaleNotes;
			this.draw();
			return;
		}
		
		const chordNotes = this.chordEngine.getNotesFromQuery(query);
		if (chordNotes.length > 0) {
			this.activeNotes = chordNotes;
			this.draw();				
			return;
		}				
		
		this.activeNotes = null;				
		this.draw();		
	}
	
	start() {
		window.onresize = function() {
			this.shadowView.draw();
		}.bind(this);	
		this.shadowView.draw();		
		
		this.$input.onkeyup = function(e) {
			e.preventDefault();
			if (e.keyCode == 13) { // ENTER
				this.commandEngine.execute(this.$input.value);
				this.$input.classList.remove(Config.validCommandCSSClass);				
				this.$input.value = '';
				this.activeNotes = null;				
				this.draw();			
			} else if (e.keyCode == 38) { // UP
				this.$input.value = this.parser.transposeQuery(this.$input.value, 1);
				this.processQuery();				
			} else if (e.keyCode == 40) { // DOWN
				this.$input.value = this.parser.transposeQuery(this.$input.value, -1);
				this.processQuery();
			} else if (e.keyCode == 18) { // ALT
                this.soundEngine.togglePlayback();
                this.pianoView.toggleLED();
				this.processQuery();
			}
		}.bind(this);

		this.$input.onkeydown = function(e) {
			if (e.keyCode == 38) { // UP
				e.preventDefault();
			} else if (e.keyCode == 40) { // DOWN
				e.preventDefault();
			}			
		}.bind(this);
	
		this.$input.oninput = function() {
			this.processQuery();
		}.bind(this);
		
		this.$input.focus();
		this.draw();
	}
}