describe("CommandEngine", function() {
	let commandEngine;
    let settings;

	beforeEach(function() {
        settings = new Settings();
		commandEngine = new CommandEngine(settings);
	});

	describe("isCommand", function() {
		describe("when given a query", function() {
			it("returns true or false", function() {
				const testData = {
                    'show letters': true,
                    'hide letters': true,
                    's': true,
                    'h': true,
                    '': false,
                    'foobar': false,
                    'letters': false,
                    'x show letters': false,
                    '    show letters': true,
                    '    hide letters': true,
				};
				
				for (query in testData) {
					const output = commandEngine.isCommand(query);
					expect(output).toEqual(testData[query]);
				}
			});            
		});
        
		describe("when the query is null", function() {
			it("returns false", function() {
                expect(commandEngine.isCommand(null)).toBeFalsy();
			});
		});        
    });
    
	describe("isValidCommand", function() {
		describe("when given a query", function() {
			it("returns true or false", function() {
				const testData = {
                    'show letters': true,
                    'hide letters': true,
                    'show letters foo': true,
                    'hide letters foo': true,
                    'show xxletters foo': true,
                    'hide xxletters foo': true,
                    's': false,
                    'h': false,
                    '': false,
                    'foobar': false,
                    'letters': false,
                    'x show letters': false,
                    '    show letters': true,
                    '    hide letters': true,
				};
				
				for (query in testData) {
					const output = commandEngine.isValidCommand(query);
					expect(output).toEqual(testData[query]);
				}
			});            
		});
        
		describe("when the query is null", function() {
			it("returns false", function() {
                expect(commandEngine.isValidCommand(null)).toBeFalsy();
			});
		});
    });
    
	describe("execute", function() {
		describe("when executing an invalid command", function() {
			it("returns false", function() {
                const query = 'foobar';
                expect(commandEngine.execute(query)).toBeFalsy();
			});
            
			it("does not update the settings", function() {
                const query = 'foobar';
                settings.isShowingLetters = true;
                expect(settings.isShowingLetters).toBeTruthy();
                expect(commandEngine.execute(query)).toBeFalsy();
                expect(settings.isShowingLetters).toBeTruthy();
			});
		});
        
		describe("when the query is null", function() {
			it("returns false", function() {
                const query = null;
                expect(commandEngine.execute(query)).toBeFalsy();
			});
            
			it("does not update the settings", function() {
                const query = null;
                settings.isShowingLetters = true;
                expect(settings.isShowingLetters).toBeTruthy();
                expect(commandEngine.execute(query)).toBeFalsy();
                expect(settings.isShowingLetters).toBeTruthy();
			});
		});        
        
		describe("when showing letters", function() {
			it("returns true", function() {
                const query = 'show letters';
                expect(commandEngine.execute(query)).toBeTruthy();
			});
            
			it("updates the settings", function() {
                const query = 'show letters';
                settings.isShowingLetters = false;
                expect(settings.isShowingLetters).toBeFalsy();
                expect(commandEngine.execute(query)).toBeTruthy();
                expect(settings.isShowingLetters).toBeTruthy();
			});
		});
        
		describe("when hiding letters", function() {
			it("returns true", function() {
                const query = 'hide letters';
                expect(commandEngine.execute(query)).toBeTruthy();
			});
            
			it("updates the settings", function() {
                const query = 'hide letters';
                settings.isShowingLetters = true;
                expect(settings.isShowingLetters).toBeTruthy();
                expect(commandEngine.execute(query)).toBeTruthy();
                expect(settings.isShowingLetters).toBeFalsy();
			});
		});
    });    
});
