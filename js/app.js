class App {
	constructor($input, $title, soundEngine, noteEngine, chordEngine, scaleEngine, commandEngine, pianoView, parser, settings) {
		this.$input = $input; 
        this.$title = $title;
        this.soundEngine = soundEngine;
		this.noteEngine = noteEngine;
		this.chordEngine = chordEngine; 
		this.scaleEngine = scaleEngine; 
		this.commandEngine = commandEngine;
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
	
	process(query) {
		if (!query || query.length == 0) {
			return null;
		}			

		this.$input.classList.remove(Config.validCommandCSSClass);
		if (this.commandEngine.isCommand(query)) {
			if (this.commandEngine.isValidCommand(query)) {
				this.$input.classList.add(Config.validCommandCSSClass);
			}
			return null;
		}

		if (query.includes('root')) {
			const singleNotes = this.noteEngine.getNotesFromQuery(query);
			if (singleNotes.length > 0) {
				return singleNotes;
			}
		}
		
		const scaleNotes = this.scaleEngine.getNotesFromQuery(query);
		if (scaleNotes.length > 0) {
			return scaleNotes;
		}
		
		const chordNotes = this.chordEngine.getNotesFromQuery(query);
		if (chordNotes.length > 0) {
			return chordNotes;
		}				
		
        return null;
	}    
    
	processInput() {
        const query = this.$input.value;
        const activeNotes = this.process(query);
        this.updateActiveNotes(activeNotes);
	}
	
	start() {
		window.onresize = function() {
			this.draw();
		}.bind(this);	
		
		this.$input.onkeyup = function(e) {
			e.preventDefault();
			if (e.keyCode == 13) { // ENTER
				this.commandEngine.execute(this.$input.value);
				this.$input.classList.remove(Config.validCommandCSSClass);				
				this.$input.value = '';
                this.updateActiveNotes(null);
			} else if (e.keyCode == 38) { // UP
				this.$input.value = this.parser.transposeQuery(this.$input.value, 1);
				this.processInput();				
			} else if (e.keyCode == 40) { // DOWN
				this.$input.value = this.parser.transposeQuery(this.$input.value, -1);
				this.processInput();
			} else if (e.keyCode == 18) { // ALT
                this.soundEngine.togglePlayback();
                if (!this.soundEngine.isPlaying) {
                    this.highlightedNotes = null;
                }
                this.pianoView.toggleLED();
				this.processInput();
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
			this.processInput();
		}.bind(this);

        this.$title.onclick = function(e) {
            this.settings.toggleTheme();
            this.draw();
        }.bind(this);
        
        this.soundEngine.playCallback = function(note) {
            this.highlightedNotes = [note];
            this.draw();
        }.bind(this);
        
		this.$input.focus();
		this.draw();
	}
}