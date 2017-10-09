class App {
	constructor($input, chordEngine, scaleEngine, commandEngine, pianoView, parser) {
		this.$input = $input; 
		this.chordEngine = chordEngine; 
		this.scaleEngine = scaleEngine; 
		this.commandEngine = commandEngine;
		this.pianoView = pianoView;
		this.parser = parser;
		this.activeNotes = null;
	}
	
	draw() {
		if (!this.activeNotes) {
			this.pianoView.clear();
		} else {
			this.pianoView.draw(this.activeNotes);
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