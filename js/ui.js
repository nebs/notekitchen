class PianoView {
	constructor(canvas) {
		this.canvas = canvas;
		this.width = canvas.width;
		this.height = canvas.height;
	}
  
  	clear() {
  		this.draw([]);
  	}
  
	draw(selectedNotes, showNames) {
		if (!this.canvas.getContext) {
			return;
		}
		
		var ctx = this.canvas.getContext('2d');
		const whiteNoteIndexes = [1,3,5,6,8,10,12];
		const blackNoteIndexes = [2,4,7,9,11];
		const whiteNotesPerOctaveCount = 7;			
		const blackNotesPerOctaveCount = 5;
		const whiteNoteCount = TOTAL_OCTAVES * whiteNotesPerOctaveCount;
		const blackNoteCount = TOTAL_OCTAVES * blackNotesPerOctaveCount;
		const whiteNoteWidth = this.width / whiteNoteCount;
		const blackNoteWidth = whiteNoteWidth * 0.5;
		const whiteNoteHeight = this.height;
		const blackNoteHeight = whiteNoteHeight * 0.7;

		var i = 0;
		var currentOctave = 0;
		for (i=0; i<whiteNoteCount; i++) {
			currentOctave = Math.floor(i / whiteNotesPerOctaveCount);
			const x = i * whiteNoteWidth;
			const y = 0;
			const w = whiteNoteWidth;
			const h = whiteNoteHeight;
			const noteIndex = whiteNoteIndexes[i % whiteNoteIndexes.length];
			if (selectedNotes.includes(noteIndex + (currentOctave * NOTES_PER_OCTAVE))) {
				ctx.fillStyle = '#A8B272';
			} else {
				ctx.fillStyle = '#FFF';
			}				
			ctx.strokeStyle = '#000';
			ctx.lineWidth = 1;				
			ctx.fillRect(x, y, w, h);				
			ctx.strokeRect(x, y, w, h);	

			if (showNames) {
				var note_letters = ['C','D','E','F','G','A','B'];
				ctx.font = '8px sans-serif';
				ctx.fillStyle = '#999';
				ctx.fillText(note_letters[i % note_letters.length], 4 + x, 46);					
			}
		}

		const blackNoteOffsets = [1, 1, 2, 2, 2];
		currentOctave = 0;
		const octaveWidth = this.width / TOTAL_OCTAVES;
		for (i=0; i<blackNoteCount; i++) {
			currentOctave = Math.floor(i / blackNotesPerOctaveCount);
			const offsetIndex = i % blackNoteOffsets.length;
			const offset = blackNoteOffsets[offsetIndex];
			const x = (currentOctave * octaveWidth) + ((offsetIndex + offset) * whiteNoteWidth) - (blackNoteWidth / 2);
			const y = 0;
			const w = blackNoteWidth;
			const h = blackNoteHeight;
			const noteIndex = blackNoteIndexes[i % blackNoteIndexes.length];
			if (selectedNotes.includes(noteIndex + (currentOctave * NOTES_PER_OCTAVE))) {
				ctx.fillStyle = '#A8B272';			
			} else {
				ctx.fillStyle = '#333';
			}				
			ctx.strokeStyle = '#000';
			ctx.lineWidth = 1;
			ctx.fillRect(x, y, w, h);				
			ctx.strokeRect(x, y, w, h);
		}
	} 
}