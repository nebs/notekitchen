describe("App", function() {
    let parser;
    let settings;
    let noteEngine;
    let chordEngine;
    let scaleEngine;
    let commandEngine;
    let $input;
    let app;

	beforeEach(function() {
       $input  document.createElement("div"); 
	   parser = new Parser();
	   settings = new Settings();		
	   noteEngine = new NoteEngine(parser);
	   chordEngine = new ChordEngine(parser);
	   scaleEngine = new ScaleEngine(parser);	
	   commandEngine = new CommandEngine(settings);
	   app = new App($input, 
                     null,
                     null,
                     noteEngine, 
                     chordEngine, 
                     scaleEngine, 
                     commandEngine, 
                     null, 
                     parser, 
                     settings);
	});

    describe("process", function() {
		describe("when given a query", function() {
			it("returns an array of active notes", function() {
				const testData = {
                    '': null,
                    'C': [1, 5, 8],
                    'C major': [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 30, 32, 34, 36],
                    'Cm7 BbM7 root': [1, 11],
                    'foo': null,
                    'show letters': null,
                    'C D': [1, 3, 5, 7, 8, 10],
				};
				
				for (query in testData) {
					const output = app.process(query);
					expect(output).toEqual(testData[query]);
				}
			});            
		});
        
		describe("when the query is null", function() {
			it("returns null", function() {
                expect(app.process(null)).toBeNull
			});
		});        
    });
});
