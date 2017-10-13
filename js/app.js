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
        this.highlightedNotes = null;
	}
	
    updateActiveNotes(newActiveNotes) {
        this.activeNotes = newActiveNotes;
		if (!this.activeNotes) {
            this.soundEngine.clear();
		} else {
            this.soundEngine.queueNotes(this.activeNotes);
		}
        this.draw();
    }
    
	draw() {
		if (!this.activeNotes) {
			this.pianoView.clear();
		} else {
			this.pianoView.draw(this.activeNotes, this.highlightedNotes);
		}
	}
	
	processQuery() {
		const query = this.$input.value;
		if (query === undefined || query.length == 0) {
            this.updateActiveNotes(null);
			return;
		}			

		this.$input.classList.remove(Config.validCommandCSSClass);
		if (this.commandEngine.isCommand(query)) {
			if (this.commandEngine.isValidCommand(query)) {
				this.$input.classList.add(Config.validCommandCSSClass);
			}

            this.updateActiveNotes(null);
			return;
		}

		if (query.includes('root')) {
			const singleNotes = this.noteEngine.getNotesFromQuery(query);
			if (singleNotes.length > 0) {
                this.updateActiveNotes(singleNotes);
				return;
			}
		}
		
		const scaleNotes = this.scaleEngine.getNotesFromQuery(query);
		if (scaleNotes.length > 0) {
            this.updateActiveNotes(scaleNotes);
			return;
		}
		
		const chordNotes = this.chordEngine.getNotesFromQuery(query);
		if (chordNotes.length > 0) {
            this.updateActiveNotes(chordNotes);
			return;
		}				
		
        this.updateActiveNotes(null);
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
                this.updateActiveNotes(null);
			} else if (e.keyCode == 38) { // UP
				this.$input.value = this.parser.transposeQuery(this.$input.value, 1);
				this.processQuery();				
			} else if (e.keyCode == 40) { // DOWN
				this.$input.value = this.parser.transposeQuery(this.$input.value, -1);
				this.processQuery();
			} else if (e.keyCode == 18) { // ALT
                this.soundEngine.togglePlayback();
                if (!this.soundEngine.isPlaying) {
                    this.highlightedNotes = null;
                }
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
		
        this.soundEngine.playCallback = function(note) {
            this.highlightedNotes = [note];
            this.draw();
        }.bind(this);
        
		this.$input.focus();
		this.draw();
	}
}