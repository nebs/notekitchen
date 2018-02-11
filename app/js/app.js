class App {
  constructor($input, $title, $link, soundEngine, noteEngine, chordEngine, scaleEngine, commandEngine, pianoView, parser, settings) {
    this.$input = $input;
    this.$title = $title;
    this.$link = $link;
    this.soundEngine = soundEngine;
    this.noteEngine = noteEngine;
    this.chordEngine = chordEngine;
    this.scaleEngine = scaleEngine;
    this.commandEngine = commandEngine;
    this.pianoView = pianoView;
    this.parser = parser;
    this.settings = settings;
    this.activeNotes = null;
    this.highlightedNotes = null;
    this.rootNotes = null;
  }

  updateActiveNotes(newActiveNotes) {
    this.activeNotes = newActiveNotes;
    if (!this.activeNotes) {
      this.soundEngine.clear();
    } else {
      this.soundEngine.queueNotes(this.activeNotes, this.rootNotes);
    }
    this.draw();
  }

  draw() {
    if (!this.activeNotes) {
      this.pianoView.clear();
    } else {
      this.pianoView.draw(this.activeNotes, this.highlightedNotes, this.rootNotes);
    }
  }

  process(query) {
    if (!query || query.length == 0) {
      return null;
    }

    this.$input.classList.remove(Config.validCommandCSSClass);
    if (this.commandEngine.isCommand(query)) {
      if (this.commandEngine.isValidCommand(query)) {
        this.$input.classList.add(Config.validCommandCSSClass);
      }
      return null;
    }

    this.rootNotes = this.noteEngine.getNotesFromQuery(query);
    if (query.includes('root') && this.rootNotes.length > 0) {
      return this.rootNotes;
    }

    const scaleNotes = this.scaleEngine.getNotesFromQuery(query);
    if (scaleNotes.length > 0) {
      return scaleNotes;
    }

    const chordNotes = this.chordEngine.getNotesFromQuery(query);
    if (chordNotes.length > 0) {
      return chordNotes;
    }

    return null;
  }

  updateLink(query) {
    const url = this.parser.getURLFromQuery(query);
    this.$link.classList.remove(Config.hiddenCSSClass);
    if (url) {
      this.$link.href = url;
    } else {
      this.$link.classList.add(Config.hiddenCSSClass);
    }
  }

  toggleSoundEngine(query) {
    if (query.includes('play')) {
      this.pianoView.isLEDOn = true;
      if (!this.soundEngine.isPlaying) {
        this.soundEngine.play();
      }
    } else {
      this.pianoView.isLEDOn = false;
      this.soundEngine.stop();
      this.highlightedNotes = null;
    }
  }

  processInput() {
    const query = this.$input.value;
    const activeNotes = this.process(query);
    this.updateLink(query);
    this.toggleSoundEngine(query);
    this.updateActiveNotes(activeNotes);
  }

  start() {
    const urlQuery = this.parser.getQueryFromURL(window.location.href);
    if (urlQuery) {
      this.$input.value = urlQuery;
      this.processInput();
    }

    window.onresize = function() {
      this.draw();
    }.bind(this);

    this.$input.onkeyup = function(e) {
      e.preventDefault();
      if (e.keyCode == 13) { // ENTER
        this.commandEngine.execute(this.$input.value);
        this.$input.classList.remove(Config.validCommandCSSClass);
        this.$input.value = '';
        this.processInput();
      } else if (e.keyCode == 38) { // UP
        this.$input.value = this.parser.transposeQuery(this.$input.value, 1);
        this.processInput();
      } else if (e.keyCode == 40) { // DOWN
        this.$input.value = this.parser.transposeQuery(this.$input.value, -1);
        this.processInput();
      }
    }.bind(this);

    this.$input.onkeydown = function(e) {
      if (e.keyCode == 38) { // UP
        e.preventDefault();
      } else if (e.keyCode == 40) { // DOWN
        e.preventDefault();
      }
    }.bind(this);

    this.$input.oninput = function() {
      this.processInput();
    }.bind(this);

    this.$title.onclick = function(e) {
      this.settings.toggleTheme();
      this.draw();
    }.bind(this);

    this.soundEngine.playCallback = function(note) {
      this.highlightedNotes = [note];
      this.draw();
    }.bind(this);

    this.$input.focus();
    this.draw();
  }
}
