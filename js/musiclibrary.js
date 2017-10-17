class MusicLibrary {
    static get scaleIntervals() {
        return {
            'major':               [2, 2, 1, 2, 2, 2, 1],
            'natural minor':       [2, 1, 2, 2, 1, 2, 2],
            'minor':               [2, 1, 2, 2, 1, 2, 2],
            'harmonic minor':      [2, 1, 2, 2, 1, 3, 1],
            'chromatic':           [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            'ionian':              [2, 2, 1, 2, 2, 2, 1],
            'dorian':              [2, 1, 2, 2, 2, 1, 2],
            'phrygian':            [1, 2, 2, 2, 1, 2, 2],
            'lydian':              [2, 2, 2, 1, 2, 2, 1],
            'mixolydian':          [2, 2, 1, 2, 2, 1, 2],
            'aeolian':             [2, 1, 2, 2, 1, 2, 2],
            'locrian':             [1, 2, 2, 1, 2, 2, 2],
            'melodic minor':       [2, 1, 2, 2, 2, 2, 1],
            'pentatonic major':    [2, 2, 3, 2, 3],
            'pentatonic minor':    [3, 2, 2, 3, 2],
            'pentatonic blues':    [3, 2, 1, 1, 3, 2],
            'pentatonic neutral':  [2, 3, 2, 3, 2],
            'whole':               [2, 2, 2, 2, 2, 2],
            'half whole':          [1, 2, 1, 2, 1, 2, 1, 2],
            'dominant diminished': [1, 2, 1, 2, 1, 2, 1, 2],
            'whole half':          [2, 1, 2, 1, 2, 1, 2, 1],
            'diminished':          [2, 1, 2, 1, 2, 1, 2, 1],
            'algerian':            [2, 1, 2, 1, 1, 1, 3, 1],
            'arabic':              [2, 2, 1, 1, 2, 2, 2],
            'byzantine':           [1, 3, 1, 2, 1, 3, 2],
            'chinese':             [4, 2, 1, 4, 1],
            'egyptian':            [2, 3, 2, 3, 2],
            'eight tone spanish':  [1, 2, 1, 1, 1, 2, 2, 2],
            'enigmatic':           [1, 3, 2, 2, 2, 1, 1],
            'geez':                [2, 1, 2, 2, 1, 2, 2],
            'hindu':               [2, 2, 1, 2, 1, 2, 2],
            'hirajoshi':           [1, 4, 1, 4, 2],
            'hungarian':           [2, 1, 3, 1, 1, 2, 1],
            'japanese':            [1, 4, 2, 3, 2],
            'oriental':            [1, 3, 1, 1, 3, 1, 2],
            'romanian minor':      [2, 1, 3, 1, 2, 1, 2],
            'spanish gypsy':       [1, 3, 1, 2, 1, 2, 2],
            'super locrian':       [1, 2, 1, 2, 2, 2, 2],
            'maqam':               [1, 3, 1, 2, 1, 3, 1],
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