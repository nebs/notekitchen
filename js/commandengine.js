class CommandEngine {
	constructor(settings) {
		this.settings = settings;
	}
	
	parse(query) {
		if (query[0] != ':') {
			return false;
		}
		
		if (query.includes('names')) {
			if (query.includes('on')) {
				this.settings.isNamesOn = true;
			} else if (query.includes('off')) {
				this.settings.isNamesOn = false;
			}
		}
				
		return true;
	}
}
