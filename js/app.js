class App {
	constructor($input, chordEngine, scaleEngine, commandEngine, pianoView) {
		$input.onkeyup = function(e) {
			e.preventDefault();
			if (e.keyCode == 13) {
				commandEngine.execute($input.value);
				$input.value = '';				
				pianoView.clear();				
			}
		}
	
		$input.oninput = function() {
			const query = $input.value;
			if (query === undefined || query.length == 0) {
				pianoView.clear();
				return;
			}			
			
			if (commandEngine.isCommand(query)) {
				pianoView.clear();				
				return;
			}
			
			const scaleNotes = scaleEngine.parse(query);
			if (scaleNotes) {
				pianoView.draw(scaleNotes);
				return;
			}
			
			const chordNotes = chordEngine.parse(query);
			if (chordNotes) {
				pianoView.draw(chordNotes);
				return;
			}				
			
			pianoView.clear();
		}
		
		$input.focus();
		pianoView.clear();
	}
}