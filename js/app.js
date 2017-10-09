class App {
	constructor($input, chordEngine, scaleEngine, commandEngine, pianoView) {
		this.$input = $input; 
		this.chordEngine = chordEngine; 
		this.scaleEngine = scaleEngine; 
		this.commandEngine = commandEngine;
		this.pianoView = pianoView;
		this.activeNotes = null;
	}
	
	draw() {
		if (!this.activeNotes) {
			this.pianoView.clear();
		} else {
			this.pianoView.draw(this.activeNotes);
		}
	}
	
	start() {
		this.$input.onkeyup = function(e) {
			e.preventDefault();
			if (e.keyCode == 13) { // ENTER
				this.commandEngine.execute(this.$input.value);
				this.$input.value = '';
				this.activeNotes = null;				
				this.draw();			
			} else if (e.keyCode == 38) { // UP
				
			} else if (e.keyCode == 40) { // DOWN
				
			}
		}.bind(this);
	
		this.$input.oninput = function() {
			const query = this.$input.value;
			if (query === undefined || query.length == 0) {
				this.activeNotes = null;				
				this.draw();
				return;
			}			

			if (this.commandEngine.isCommand(query)) {
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
		}.bind(this);
		
		this.$input.focus();
		this.draw();
	}
}