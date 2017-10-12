class SoundEngine {
    constructor() {
        this.synth = new Tone.Synth().toMaster();        
    }
    
    clear() {
        if (this.sequence) {
            this.sequence.removeAll();
        }
    }
    
    queueNotes(notes) {
        const wasPlaying = this.sequence && this.sequence.state == "started";
        this.stop();
        
        const baseOctave = 4;
        let noteNames = [];
        for (let i in notes) {
            const octave = Math.floor((notes[i] - 1) / 12) + baseOctave;
            const index = (notes[i] - 1) % MusicLibrary.flatNoteNames.length;
            const name = MusicLibrary.flatNoteNames[index] + octave.toString();
            noteNames.push(name);
        }
        
        const synth = this.synth;
        this.sequence = new Tone.Sequence(function(time, note) {
            synth.triggerAttackRelease(note, "8n", time);
        }, noteNames, "4n");
        
        if (wasPlaying) {
            this.play();
        }
    }
    
    play() {
        this.sequence.start();
        Tone.Transport.start();
    }
    
    stop() {
        if (this.sequence) {
            this.sequence.stop();            
            this.sequence.removeAll();
            this.sequence.dispose();
        }

        Tone.Transport.stop();
        this.sequence = null;
    }
    
    togglePlayback() {
        if (!this.sequence || this.sequence.state == "stopped") {
            this.play();
        } else {
            this.stop();
        }
    }
}