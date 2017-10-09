class PianoView {
	constructor($canvas, settings) {
		this.$canvas = $canvas;
		this.width = $canvas.width;
		this.height = $canvas.height;
		this.settings = settings;
	}
  
  	clear() {
  		this.draw([]);
  	}
  
	draw(selectedNotes) {
		if (!this.$canvas.getContext) {
			return;
		}
		
		const backgroundColor = '#000';
		const keyboardContainerTopPadding = 35;
		const keyboardContainerBottomPadding = 5;
		const keyboardContainerSidePadding = 8;
		const keyboardContainerX = keyboardContainerSidePadding;
		const keyboardContainerY = keyboardContainerTopPadding;
		const keyboardContainerWidth = this.width - (keyboardContainerSidePadding * 2);
		const keyboardContainerHeight = this.height - (keyboardContainerTopPadding + keyboardContainerBottomPadding);
		const totalOctaves = Config.totalOctaves;
		const notesPerOctave = Config.notesPerOctave;
		const whiteNoteIndexes = [1,3,5,6,8,10,12];
		const blackNoteIndexes = [2,4,7,9,11];
		const whiteNotesPerOctaveCount = 7;			
		const blackNotesPerOctaveCount = 5;
		const whiteNoteCount = totalOctaves * whiteNotesPerOctaveCount;
		const blackNoteCount = totalOctaves * blackNotesPerOctaveCount;
		const whiteNoteWidth = keyboardContainerWidth / whiteNoteCount;
		const blackNoteWidth = whiteNoteWidth * 0.5;
		const whiteNoteHeight = keyboardContainerHeight;
		const blackNoteHeight = whiteNoteHeight * 0.7;

		var ctx = this.$canvas.getContext('2d');
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, this.width, this.height);

		var i = 0;
		var currentOctave = 0;		
		for (i=0; i<whiteNoteCount; i++) {
			currentOctave = Math.floor(i / whiteNotesPerOctaveCount);
			const x = i * whiteNoteWidth + keyboardContainerX + 1;
			const y = keyboardContainerY;
			const w = whiteNoteWidth - 2;
			const h = whiteNoteHeight;
			const noteIndex = whiteNoteIndexes[i % whiteNoteIndexes.length];
			const indexToCheck = noteIndex + (currentOctave * notesPerOctave);
			if (selectedNotes.includes(indexToCheck)) {
				ctx.fillStyle = '#D80152';
				ctx.fillRect(x, y, w, h);
				ctx.fillStyle = '#A1013D';
				ctx.fillRect(x, y, 3, h);
				ctx.fillRect(x, y, w, 3);
			} else {
				ctx.fillStyle = '#FFF';
				ctx.fillRect(x, y, w, h);
			}

			if (this.settings.isNamesOn) {
				var note_letters = ['C','D','E','F','G','A','B'];
				ctx.font = '8px sans-serif';
				ctx.fillStyle = '#999';
				ctx.fillText(note_letters[i % note_letters.length], 3 + x, y + h - 3);
			}
		}

		const blackNoteOffsets = [1, 1, 2, 2, 2];
		currentOctave = 0;
		const octaveWidth = keyboardContainerWidth / totalOctaves;
		for (i=0; i<blackNoteCount; i++) {
			currentOctave = Math.floor(i / blackNotesPerOctaveCount);
			const offsetIndex = i % blackNoteOffsets.length;
			const offset = blackNoteOffsets[offsetIndex];
			const x = (currentOctave * octaveWidth) + ((offsetIndex + offset) * whiteNoteWidth) - (blackNoteWidth / 2) + keyboardContainerX;
			const y = keyboardContainerY;
			const w = blackNoteWidth;
			const h = blackNoteHeight;
			const noteIndex = blackNoteIndexes[i % blackNoteIndexes.length];
			if (selectedNotes.includes(noteIndex + (currentOctave * notesPerOctave))) {
				ctx.fillStyle = '#D80152';
				ctx.fillRect(x, y, w, h);
				ctx.fillStyle = '#A1013D';
				ctx.fillRect(x, y, w, 4);
			} else {
				ctx.fillStyle = '#333';
				ctx.fillRect(x, y, w, h);
			}			
		}

		ctx.font = '25px Grand Hotel';
		ctx.textAlign = 'center';
		ctx.fillStyle = '#FFF';
		ctx.fillText('note kitchen', this.width / 2, 26);		
	} 
}