class CommandEngine {
	constructor(settings) {
		this.settings = settings;
        this.lettersKeyword = 'letters'
        this.showKeyword = 'show';
        this.hideKeyword = 'hide';
	}
	
	isCommand(query) {
		const trimmedQuery = query.trim();
		return trimmedQuery[0] == 's' || trimmedQuery[0] == 'h';
	}
	
	isValidCommand(query) {
		if (!this.isCommand(query)) {
			return false;
		}
		
        const hasLettersKeyword = query.includes(this.lettersKeyword);
        const hasShowKeyword = query.includes(this.showKeyword);
        const hasHideKeyword = query.includes(this.hideKeyword);
        
        return hasLettersKeyword && (hasShowKeyword || hasHideKeyword);
	}
	
	execute(query) {
		if (!this.isValidCommand(query)) {
			return false;
		}
		
        const hasLettersKeyword = query.includes(this.lettersKeyword);
        const hasShowKeyword = query.includes(this.showKeyword);
        const hasHideKeyword = query.includes(this.hideKeyword);        
        
		if (hasLettersKeyword) {
			if (hasShowKeyword) {
				this.settings.isShowingLetters = true;
			} else if (hasHideKeyword) {
				this.settings.isShowingLetters = false;
			}
		}
				
		return true;
	}
}
