class SoundEngine {
    constructor(parser) {
        this.synth = new Tone.Synth().toMaster();
        this.playCallback = null;
        this.parser = parser;
    }
    
    noteIndexToString(noteIndex, baseOctave) {
        const offsetIndex = noteIndex - 1;
        const octave = Math.floor(offsetIndex / 12) + baseOctave;
        const index = offsetIndex % MusicLibrary.flatNoteNames.length;
        return MusicLibrary.flatNoteNames[index] + octave.toString();        
    }
    
    noteStringToIndex(noteString) {
        const rootString = this.parser.findRoot(noteString);
        return this.parser.noteStringToIndex(rootString);
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
            const name = this.noteIndexToString(notes[i], baseOctave);
            noteNames.push(name);
        }
        
        const that = this;
        this.sequence = new Tone.Sequence(function(time, note) {
            that.synth.triggerAttackRelease(note, "8n", time);
            if (that.playCallback) {
                that.playCallback(that.noteStringToIndex(note));
            }
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