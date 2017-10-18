class PianoView {
	constructor($canvas, settings) {
		this.$canvas = $canvas;
		this.settings = settings;
        this.isLEDOn = false;
	}
  
    toggleLED() {
        this.isLEDOn = !this.isLEDOn;
    }
    
  	clear() {
  		this.draw([]);
  	}
  
    drawShadow(ctx, pianoX, pianoY, pianoW, pianoH, canvasW, canvasH) {
		const offset = Math.max(canvasW, canvasH);
		let gradient0 = {x: 0, y: 0};
        let gradient1 = {x: 0, y: 0};
        let gradientFade = 0.5;
        
		ctx.beginPath();
        
        // Top left
		let x = pianoX;
		let y = pianoY + pianoH;        
		ctx.moveTo(x, y);

        // Bottom left
        x += offset;
		y += offset;
        gradient0.x = x * gradientFade;
        gradient0.y = y * gradientFade;
		ctx.lineTo(x, y);
        
        // Bottom right
		x += pianoW;
		y -= pianoH;
		ctx.lineTo(x, y);
        
        // Top right
		x = pianoX + pianoW;
		y = pianoY;
        gradient1.x = x * gradientFade;
        gradient1.y = y * gradientFade;
		ctx.lineTo(x, y);
        
		ctx.closePath();
        
        let gradient = ctx.createLinearGradient(gradient0.x, gradient0.y, gradient1.x, gradient1.y);
        gradient.addColorStop(0, this.settings.activeTheme().primaryShadowColor2);
        gradient.addColorStop(1, this.settings.activeTheme().primaryShadowColor1);
        ctx.fillStyle = gradient;
		ctx.fill();        
    }
    
	draw(selectedNotes, highlightedNotes, rootNotes) {
		if (!this.$canvas.getContext) {
			return;
		}
        
        document.body.classList = '';
        document.body.classList.add(this.settings.activeTheme().cssClass);
        
		const canvasW = window.innerWidth;
		const canvasH = window.innerHeight;
        const pianoW = 300;
        const pianoH = 80;
        const pianoX = (canvasW / 2) - (pianoW / 2);
        const pianoY = (canvasH / 2) - (pianoH / 2);
        
        this.$canvas.width = canvasW;
        this.$canvas.height = canvasH;
		
		const keyboardContainerTopPadding = 35;
		const keyboardContainerBottomPadding = 5;
		const keyboardContainerSidePadding = 8;
		const keyboardContainerX = pianoX + keyboardContainerSidePadding;
		const keyboardContainerY = pianoY + keyboardContainerTopPadding;
		const keyboardContainerWidth = pianoW - (keyboardContainerSidePadding * 2);
		const keyboardContainerHeight = pianoH - (keyboardContainerTopPadding + keyboardContainerBottomPadding);
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
        
        // Draw canvas background
        ctx.fillStyle = this.settings.activeTheme().primaryBackgroundColor;
        ctx.fillRect(0, 0, canvasW, canvasH);        
        
        // Draw shadow
        this.drawShadow(ctx, pianoX, pianoY, pianoW, pianoH, canvasW, canvasH);
        
        // Draw keyboard background
        const ch = new CanvasHelper(ctx);
        ch.fillStyle = this.settings.activeTheme().pianoBackgroundColor;
        ch.highlightStyle = this.settings.activeTheme().pianoHighlightColor;
        ch.highlightSpeckStyle = this.settings.activeTheme().pianoHighlightSpeckColor;
        ch.shadowStyle = this.settings.activeTheme().pianoShadowColor;
        ch.highlightSize = pianoHighlightShadowSize;
        ch.shadowSize = pianoHighlightShadowSize;
        ch.fillRect(pianoX, pianoY, pianoW, pianoH);
        
        // Draw background behind the keys
        ctx.fillStyle = this.settings.activeTheme().pianoShadowColor;
        ctx.fillRect(keyboardContainerX, keyboardContainerY, keyboardContainerWidth, keyboardContainerHeight);
        
        // Draw shadow below the keys
		ctx.beginPath();
		ctx.moveTo(keyboardContainerX + 1, pianoY + pianoH - keyboardContainerBottomPadding);
		ctx.lineTo(keyboardContainerX + keyboardContainerBottomPadding + 1, pianoY + pianoH);
		ctx.lineTo(pianoX + pianoW, pianoY + pianoH);
		ctx.lineTo(pianoX + pianoW - keyboardContainerSidePadding, pianoY + pianoH - keyboardContainerBottomPadding);
		ctx.closePath();
        ctx.fillStyle = this.settings.activeTheme().pianoShadowColor;
        ctx.fill();
        
        // Draw decoration stripes
        const stripeWidth = 5;
        const stripeGap = 5;
        const stripeCount = 3;
        let stripeRightMargin = 50;
        for (let i=0; i<stripeCount; i++) {
            // Stripe
            ctx.fillStyle = this.settings.activeTheme().pianoStripeColor;
            ctx.fillRect(pianoX + pianoW - stripeRightMargin, pianoY + pianoHighlightShadowSize, stripeWidth, keyboardContainerTopPadding - pianoHighlightShadowSize);
            
            // Highlight
            ctx.fillStyle = this.settings.activeTheme().pianoStripeHighlightColor;
            ctx.fillRect(pianoX + pianoW - stripeRightMargin, pianoY, stripeWidth, pianoHighlightShadowSize);
            stripeRightMargin -= stripeWidth + stripeGap;
        }
        
        // Draw knobs
        const knobCount = 3;
        const knobOuterRadius = 6;
        const knobInnerRadius = 4;
        const knobGap = 10;
        const cos45 = 0.70710678118;
        let knobLeftMargin = 20;
        for (let i=0; i<knobCount; i++) {
            const knobCenterX = knobLeftMargin;
            const knobCenterY = pianoHighlightShadowSize + ((keyboardContainerTopPadding - pianoHighlightShadowSize) / 2);
            
            // Shadow
            const shadowX0 = knobCenterX - (knobOuterRadius * cos45);
            const shadowY0 = knobCenterY + (knobOuterRadius * cos45);
            const shadowX1 = shadowX0 + (keyboardContainerTopPadding - shadowY0);
            const shadowY1 = keyboardContainerTopPadding;
            const shadowX3 = knobCenterX + (knobOuterRadius * cos45);
            const shadowY3 = knobCenterY - (knobOuterRadius * cos45);            
            const shadowX2 = shadowX3 + (keyboardContainerTopPadding - shadowY3);
            const shadowY2 = keyboardContainerTopPadding;                        
            ctx.beginPath();
            ctx.moveTo(pianoX + shadowX0, pianoY + shadowY0);
            ctx.lineTo(pianoX + shadowX1, pianoY + shadowY1);
            ctx.lineTo(pianoX + shadowX2, pianoY + shadowY2);
            ctx.lineTo(pianoX + shadowX3, pianoY + shadowY3);
            ctx.closePath();
            ctx.fillStyle = this.settings.activeTheme().pianoKnobShadowColor;            
            ctx.fill();
            
            // Outer
            let gradient = ctx.createLinearGradient(pianoX + knobCenterX - knobOuterRadius, pianoY + knobCenterY - knobOuterRadius, pianoX + knobCenterX + knobOuterRadius, pianoY + knobCenterY + knobOuterRadius);
            gradient.addColorStop(0, this.settings.activeTheme().pianoOuterKnobHighlightColor);
            gradient.addColorStop(1, this.settings.activeTheme().pianoOuterKnobColor);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(pianoX + knobCenterX, pianoY + knobCenterY, knobOuterRadius, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();
            
            // Inner
            ctx.fillStyle = this.settings.activeTheme().pianoInnerKnobColor;
            ctx.beginPath();
            ctx.arc(pianoX + knobCenterX, pianoY + knobCenterY, knobInnerRadius, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fill();

            knobLeftMargin += (knobOuterRadius * 2) + knobGap;
        }
        
        // Draw LED
        ctx.beginPath();
        ctx.arc(pianoX + pianoW - 12, pianoY + 12, 2, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.strokeStyle = this.settings.activeTheme().pianoLEDBorderColor;
        ctx.lineWidth = 1;
        if (this.isLEDOn) {
            ctx.fillStyle = this.settings.activeTheme().pianoLEDOnColor;
        } else {
            ctx.fillStyle = this.settings.activeTheme().pianoLEDOffColor;
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
			let textColor = this.settings.activeTheme().pianoDarkTextColor;
			if (selectedNotes.includes(indexToCheck)) {
                textColor = this.settings.activeTheme().pianoLightTextColor;
                
                let pianoNoteSelectedColor = this.settings.activeTheme().pianoNoteSelectedColor;
                let pianoNoteSelectedShadowColor = this.settings.activeTheme().pianoNoteSelectedShadowColor;
                if (highlightedNotes && highlightedNotes.includes(indexToCheck)) {
                    pianoNoteSelectedColor = this.settings.activeTheme().pianoNoteHighlightedColor;
                    pianoNoteSelectedShadowColor = this.settings.activeTheme().pianoNoteHighlightedShadowColor;
                } else if (rootNotes && rootNotes.includes(indexToCheck)) {
                    pianoNoteSelectedColor = this.settings.activeTheme().pianoNoteRootColor;
                    pianoNoteSelectedShadowColor = this.settings.activeTheme().pianoNoteRootShadowColor;
                }
                
                // Draw the key
                ctx.fillStyle = pianoNoteSelectedColor;
				ctx.fillRect(x, y, w, h);
                
                // Draw top shadow
				ctx.fillStyle = pianoNoteSelectedShadowColor;		
				ctx.fillRect(x, y, w, 2);
                
                // Draw slanted shadow
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + h);
                ctx.lineTo(x + w/3, y + h);
                ctx.lineTo(x + 2, y);
                ctx.closePath();
                ctx.fillStyle = pianoNoteSelectedShadowColor;
                ctx.fill();               
			} else {
                // Draw the key
				ctx.fillStyle = this.settings.activeTheme().pianoWhiteNoteColor;
				ctx.fillRect(x, y, w, h);
                
                // Draw top shadow
				ctx.fillStyle = this.settings.activeTheme().pianoWhiteNoteShadowColor;
				ctx.fillRect(x, y, w, 2);
			}

			if (this.settings.isShowingLetters) {
				let noteLetters = ['C','D','E','F','G','A','B'];
				ctx.font = this.settings.activeTheme().pianoLettersFont;
				ctx.fillStyle = textColor;
				ctx.fillText(noteLetters[i % noteLetters.length], 3 + x, y + h - 3);
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
            const indexToCheck = noteIndex + (currentOctave * notesPerOctave);
			if (selectedNotes.includes(indexToCheck)) {
                let pianoNoteSelectedColor = this.settings.activeTheme().pianoNoteSelectedColor;
                let pianoNoteSelectedShadowColor = this.settings.activeTheme().pianoNoteSelectedShadowColor;
                if (highlightedNotes && highlightedNotes.includes(indexToCheck)) {
                    pianoNoteSelectedColor = this.settings.activeTheme().pianoNoteHighlightedColor;
                    pianoNoteSelectedShadowColor = this.settings.activeTheme().pianoNoteHighlightedShadowColor;   
                } else if (rootNotes && rootNotes.includes(indexToCheck)) {
                    pianoNoteSelectedColor = this.settings.activeTheme().pianoNoteRootColor;
                    pianoNoteSelectedShadowColor = this.settings.activeTheme().pianoNoteRootShadowColor;
                }            
                
                // Draw the key
				ctx.fillStyle = pianoNoteSelectedColor;
				ctx.fillRect(x, y, w, h);
                
                // Draw top and side shadows
				ctx.fillStyle = pianoNoteSelectedShadowColor;
				ctx.fillRect(x, y, w, 2);
				ctx.fillRect(x, y, 2, h);
				ctx.fillRect(x, y + h - 2, w, 2);
			} else {
                // Draw the key
				ctx.fillStyle = this.settings.activeTheme().pianoBlackNoteColor;
				ctx.fillRect(x, y, w, h);
                
                // Draw bottom highlight
				ctx.fillStyle = this.settings.activeTheme().pianoBlackNoteHighlightColor;
				ctx.fillRect(x, y + h - 4, w, 4);
			}						
		}
	} 
}