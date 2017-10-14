class Settings {
	constructor() {
		this.isShowingLetters = false;
        this.activeThemeIndex = 0;
        this.allThemes = [ThemeRed, ThemeBlue];
	}
    
    activeTheme() {
        return this.allThemes[this.activeThemeIndex];
    }
    
    toggleTheme() {
        this.activeThemeIndex++;
        if (this.activeThemeIndex >= this.allThemes.length) {
            this.activeThemeIndex = 0;
        }
    }
}