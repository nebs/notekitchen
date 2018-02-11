class Settings {
  constructor() {
    this.isShowingLetters = false;
    this.activeThemeIndex = 0;
  }

  activeTheme() {
    return Themes.all[this.activeThemeIndex];
  }

  toggleTheme() {
    this.activeThemeIndex++;
    if (this.activeThemeIndex >= Themes.all.length) {
      this.activeThemeIndex = 0;
    }
  }
}
