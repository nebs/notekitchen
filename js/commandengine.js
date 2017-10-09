class CommandEngine {
	constructor(settings) {
		this.settings = settings;
	}
	
	isCommand(query) {
		const trimmedQuery = query.trim();
		return trimmedQuery[0] == 's' || trimmedQuery[0] == 'h';
	}
	
	isValidCommand(query) {
		if (!this.isCommand(query)) {
			return false;
		}
		
		return query.includes('names') && (query.includes('show') || query.includes('hide'));
	}
	
	execute(query) {
		if (!this.isValidCommand(query)) {
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
