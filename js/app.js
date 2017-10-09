class App {
	constructor($input, chordEngine, scaleEngine, commandEngine, pianoView) {
		this.$input = $input; 
		this.chordEngine = chordEngine; 
		this.scaleEngine = scaleEngine; 
		this.commandEngine = commandEngine;
		this.pianoView = pianoView;
	}
	
	start() {
		this.$input.onkeyup = function(e) {
			e.preventDefault();
			if (e.keyCode == 13) { // ENTER
				this.commandEngine.execute(this.$input.value);
				this.$input.value = '';				
				this.pianoView.clear();				
			} else if (e.keyCode == 38) { // UP
				
			} else if (e.keyCode == 40) { // DOWN
				
			}
		}.bind(this);
	
		this.$input.oninput = function() {
			const query = this.$input.value;
			if (query === undefined || query.length == 0) {
				this.pianoView.clear();
				return;
			}			

			if (this.commandEngine.isCommand(query)) {
				this.pianoView.clear();				
				return;
			}
			
			const scaleNotes = this.scaleEngine.getNotesFromQuery(query);
			if (scaleNotes.length > 0) {
				this.pianoView.draw(scaleNotes);
				return;
			}
			
			const chordNotes = this.chordEngine.getNotesFromQuery(query);
			if (chordNotes.length > 0) {
				this.pianoView.draw(chordNotes);
				return;
			}				
			
			this.pianoView.clear();
		}.bind(this);
		
		this.$input.focus();
		this.pianoView.clear();		
	}
}