class CommandEngine {
	constructor(settings) {
		this.settings = settings;
	}
	
	isCommand(query) {
		return query[0] == ':';
	}
	
	execute(query) {
		if (!this.isCommand(query)) {
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
