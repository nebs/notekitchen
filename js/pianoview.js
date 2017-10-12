class PianoView {
	constructor($canvas, settings) {
		this.$canvas = $canvas;
		this.width = $canvas.width;
		this.height = $canvas.height;
		this.settings = settings;
        this.isLEDOn = false;
	}
  
    toggleLED() {
        this.isLEDOn = !this.isLEDOn;
    }
    
  	clear() {
  		this.draw([]);
  	}
  
	draw(selectedNotes) {
		if (!this.$canvas.getContext) {
			return;
		}
		
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
        const pianoHighlightShadowSize = 2;
        
		const ctx = this.$canvas.getContext('2d');
        
        // Draw keyboard background
        const ch = new CanvasHelper(ctx);
        ch.fillStyle = Style.pianoBackgroundColor;
        ch.highlightStyle = Style.pianoHighlightColor;
        ch.shadowStyle = Style.pianoShadowColor;
        ch.highlightSize = pianoHighlightShadowSize;
        ch.shadowSize = pianoHighlightShadowSize;
        ch.fillRect(0, 0, this.width, this.height);
        
        // Draw background behind the keys
        ctx.fillStyle = Style.pianoShadowColor;
        ctx.fillRect(keyboardContainerSidePadding, keyboardContainerTopPadding, keyboardContainerWidth, keyboardContainerHeight);
        
        // Draw shadow below the keys
		ctx.beginPath();
		ctx.moveTo(keyboardContainerSidePadding + 1, this.height - keyboardContainerBottomPadding);
		ctx.lineTo(keyboardContainerSidePadding + keyboardContainerBottomPadding + 1, this.height);
		ctx.lineTo(this.width, this.height);
		ctx.lineTo(this.width - keyboardContainerSidePadding, this.height - keyboardContainerBottomPadding);
		ctx.closePath();
        ctx.fillStyle = Style.pianoShadowColor;
        ctx.fill();
        
        // Draw decoration stripes
        const stripeWidth = 5;
        const stripeGap = 5;
        const stripeCount = 3;
        let stripeRightMargin = 50;
        for (let i=0; i<stripeCount; i++) {
            // Stripe
            ctx.fillStyle = Style.pianoStripeColor;
            ctx.fillRect(this.width - stripeRightMargin, pianoHighlightShadowSize, stripeWidth, keyboardContainerTopPadding - pianoHighlightShadowSize);
            
            // Highlight
            ctx.fillStyle = Style.pianoStripeHighlightColor;
            ctx.fillRect(this.width - stripeRightMargin, 0, stripeWidth, pianoHighlightShadowSize);
            stripeRightMargin -= stripeWidth + stripeGap;
        }
        
        // Draw knobs
        const knobCount = 3;
        const knobRadius = 5;
        const knobGap = 5;
        let knobLeftMargin = 20;
        for (let i=0; i<knobCount; i++) {
            ctx.fillStyle = Style.pianoKnobColor;
            ctx.strokeStyle = Style.pianoKnobBorderColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(knobLeftMargin, pianoHighlightShadowSize + ((keyboardContainerTopPadding - pianoHighlightShadowSize) / 2), knobRadius, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            knobLeftMargin += (knobRadius * 2) + knobGap;
        }
        
        // Draw LED
        ctx.beginPath();
        ctx.arc(this.width - 12, 12, 2, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.strokeStyle = Style.pianoLEDBorderColor;
        ctx.lineWidth = 1;
        if (this.isLEDOn) {
            ctx.fillStyle = Style.pianoLEDOnColor;
        } else {
            ctx.fillStyle = Style.pianoLEDOffColor;
        }
        ctx.fill();
        ctx.stroke();        
        
		let i = 0;
		let currentOctave = 0;		
		for (i=0; i<whiteNoteCount; i++) {
			currentOctave = Math.floor(i / whiteNotesPerOctaveCount);
			const x = i * whiteNoteWidth + keyboardContainerX + 1;
			const y = keyboardContainerY;
			const w = whiteNoteWidth - 2;
			const h = whiteNoteHeight;
			const noteIndex = whiteNoteIndexes[i % whiteNoteIndexes.length];
			const indexToCheck = noteIndex + (currentOctave * notesPerOctave);
			let textColor = Style.pianoDarkTextColor;
			if (selectedNotes.includes(indexToCheck)) {
                textColor = Style.pianoLightTextColor;
                
                // Draw the key
				ctx.fillStyle = Style.pianoNoteSelectedColor;
				ctx.fillRect(x, y, w, h);
                
                // Draw top shadow
				ctx.fillStyle = Style.pianoNoteSelectedShadowColor;		
				ctx.fillRect(x, y, w, 2);
                
                // Draw slanted shadow
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + h);
                ctx.lineTo(x + w/3, y + h);
                ctx.lineTo(x + 2, y);
                ctx.closePath();
                ctx.fillStyle = Style.pianoNoteSelectedShadowColor;
                ctx.fill();               
			} else {
                // Draw the key
				ctx.fillStyle = Style.pianoWhiteNoteColor;
				ctx.fillRect(x, y, w, h);
                
                // Draw top shadow
				ctx.fillStyle = Style.pianoWhiteNoteShadowColor;
				ctx.fillRect(x, y, w, 2);
			}

			if (this.settings.isNamesOn) {
				let note_letters = ['C','D','E','F','G','A','B'];
				ctx.font = Style.pianoNoteNameFont;
				ctx.fillStyle = textColor;
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
                // Draw the key
				ctx.fillStyle = Style.pianoNoteSelectedColor;
				ctx.fillRect(x, y, w, h);
                
                // Draw top and side shadows
				ctx.fillStyle = Style.pianoNoteSelectedShadowColor;
				ctx.fillRect(x, y, w, 2);
				ctx.fillRect(x, y, 2, h);
				ctx.fillRect(x, y + h - 2, w, 2);
			} else {
                // Draw the key
				ctx.fillStyle = Style.pianoBlackNoteColor;
				ctx.fillRect(x, y, w, h);
                
                // Draw bottom highlight
				ctx.fillStyle = Style.pianoBlackNoteHighlightColor;
				ctx.fillRect(x, y + h - 4, w, 4);
			}						
		}
	} 
}