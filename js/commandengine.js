class CommandEngine {
	constructor(settings) {
		this.settings = settings;
	}
	
	isCommand(query) {
		const trimmedQuery = query.trim();
		return trimmedQuery[0] == 's' || trimmedQuery[0] == 'h';
	}
	
	execute(query) {
		if (!this.isCommand(query)) {
			return false;
		}
		
		if (query.includes('names')) {
			if (query.includes('show')) {
				this.settings.isNamesOn = true;
			} else if (query.includes('hide')) {
				this.settings.isNamesOn = false;
			}
		}
				
		return true;
	}
}
