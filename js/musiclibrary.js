class MusicLibrary {
	static get majorScaleIntervals() {
		return [2, 2, 1, 2, 2, 2, 1];
	}
    
	static get naturalMinorScaleIntervals() {
		return [2, 1, 2, 2, 1, 2, 2];
	}
    
    static get harmonicMinorScaleIntervals() {
		return [2, 1, 2, 2, 1, 3, 1];
	}
    
    static get wholeToneScaleIntervals() {
		return [2, 2, 2, 2, 2, 2];
	}    
	
	static get sharpNoteNames() {
		return ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
	}
	
	static get flatNoteNames() {
		return ['C','Db','D','Eb','E','F','Gb','G','Ab','A','Bb','B'];
	}
    
	static get altNoteNames() {
		return ['B#','_','_','_','Fb','E#','_','_','_','_','_','Cb'];
	}    
}