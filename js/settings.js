class Settings {
	constructor() {
		this.isShowingLetters = false;
        this.activeStyleIndex = 0;
        this.allStyles = [StyleRed, StyleBlue];
	}
    
    activeStyle() {
        return this.allStyles[this.activeStyleIndex];
    }
    
    toggleTheme() {
        this.activeStyleIndex++;
        if (this.activeStyleIndex >= this.allStyles.length) {
            this.activeStyleIndex = 0;
        }
    }
}