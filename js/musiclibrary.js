class MusicLibrary {
    static get scaleIntervals() {
        return {
            'major': [2, 2, 1, 2, 2, 2, 1],
            'natural minor': [2, 1, 2, 2, 1, 2, 2],
            'minor': [2, 1, 2, 2, 1, 2, 2],
            'harmonic minor': [2, 1, 2, 2, 1, 3, 1],
            'whole tone': [2, 2, 2, 2, 2, 2],
            'chromatic': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            'ionian': [2, 2, 1, 2, 2, 2, 1],
            'dorian': [2, 1, 2, 2, 2, 1, 2],
            'phrygian': [1, 2, 2, 2, 1, 2, 2],
            'lydian': [2, 2, 2, 1, 2, 2, 1],
            'mixolydian': [2, 2, 1, 2, 2, 1, 2],
            'aeolian': [2, 1, 2, 2, 1, 2, 2],
            'locrian': [1, 2, 2, 1, 2, 2, 2],
        }        
    }
    
    static get scaleNames() {
        return Object.keys(MusicLibrary.scaleIntervals).sort(function(a, b) {
            return b.length - a.length;
        });        
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