class Config {
	static get totalOctaves() {
		return 3;
	}
	
	static get notesPerOctave() {
		return 12;
	}
	
	static get totalNotes() {
		return this.totalOctaves * this.notesPerOctave;
	}
	
	static get validCommandCSSClass() {
		return 'valid-command';
	}	
    
    static get hiddenCSSClass() {
        return 'hidden';
    }
}