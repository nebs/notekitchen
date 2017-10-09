class Settings {
	constructor() {
		this.isNamesOn = false;
		this.onlyShowRoots = false;
	}
	
	toggleOnlyShowRoots() {
		this.onlyShowRoots = !this.onlyShowRoots;
	}
}