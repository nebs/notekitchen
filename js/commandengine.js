class CommandEngine {
	constructor(settings) {
		this.settings = settings;
        this.lettersKeyword = 'letters'
        this.showKeyword = 'show';
        this.hideKeyword = 'hide';
        this.themeKeyword = 'theme';
        this.redKeyword = 'red';
        this.blueKeyword = 'blue';
	}
	
	isCommand(query) {
        if (!query) {
            return false;
        }
        
		const trimmedQuery = query.trim();
		return trimmedQuery[0] == this.showKeyword[0] || 
            trimmedQuery[0] == this.hideKeyword[0] ||
            trimmedQuery[0] == this.themeKeyword[0];
	}
	
	isValidCommand(query) {
		if (!this.isCommand(query)) {
			return false;
		}
		
        const hasLettersKeyword = query.includes(this.lettersKeyword);
        const hasShowKeyword = query.includes(this.showKeyword);
        const hasHideKeyword = query.includes(this.hideKeyword);
        const isValidLettersCommand = hasLettersKeyword && (hasShowKeyword || hasHideKeyword);
        
        const hasThemeKeyword = query.includes(this.themeKeyword);
        const hasRedKeyword = query.includes(this.redKeyword);
        const hasBlueKeyword = query.includes(this.blueKeyword);
        const isValidThemeCommand = hasThemeKeyword && (hasRedKeyword || hasBlueKeyword);        
        
        return isValidLettersCommand || isValidThemeCommand;
	}
	
	execute(query) {
		if (!this.isValidCommand(query)) {
			return false;
		}
		
        const hasLettersKeyword = query.includes(this.lettersKeyword);
        const hasShowKeyword = query.includes(this.showKeyword);
        const hasHideKeyword = query.includes(this.hideKeyword);
        
        const hasThemeKeyword = query.includes(this.themeKeyword);
        const hasRedKeyword = query.includes(this.redKeyword);
        const hasBlueKeyword = query.includes(this.blueKeyword);        
        
		if (hasLettersKeyword) {
			if (hasShowKeyword) {
				this.settings.isShowingLetters = true;
			} else if (hasHideKeyword) {
				this.settings.isShowingLetters = false;
			}
		}
        
        if (hasThemeKeyword) {
            if (hasRedKeyword) {
                this.settings.style = StyleRed;
            } else if (hasBlueKeyword) {
                this.settings.style = StyleBlue;
            }
        }
				
		return true;
	}
}
