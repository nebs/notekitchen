describe("NoteEngine", function() {
	let noteEngine;
    let parser;

	beforeEach(function() {
        parser = new Parser();
		noteEngine = new NoteEngine(parser);
	});

	describe("getNotesFromSymbol", function() {
		describe("when given a query", function() {
			it("returns an array of notes", function() {
				const testData = {
                    'C': [1],
                    'C D E': [1],
                    'Cm7b5': [1],
                    'C major': [1],
                    'C#m7': [2],
                    'CM7': [1],
                    'DM7': [3],
                    '': [],
                    'Bbm7 G7 F# Locrian': [11],
                    'foobar C jones': [1],
                    'Ab+13': [9],
                    '        AM9': [10],
                    'sjdlfja ligmaireug9a8e7rug9aer': [],
                    'sjdlfja ligmaireug9a8e7F#ug9aer': [7],
				};
				
				for (query in testData) {
					const output = noteEngine.getNotesFromSymbol(query);
					expect(output).toEqual(testData[query]);
				}
			});            
		});
        
		describe("when the query is null", function() {
			it("returns an empty array", function() {
                expect(noteEngine.getNotesFromSymbol(null)).toEqual([]);
			});
		});        
    });
        
	describe("getNotesFromQuery", function() {
		describe("when given a query", function() {
			it("returns an array of notes", function() {
				const testData = {
                    'C': [1],
                    'CC#DD#EFF#GG#AA#B': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    'Cm7 BbM9 F locrian #2 Ab E+13(b9)  foobar D#': [1, 11, 6, 9, 5, 4],
                    '': [],
                    'foobar': [],
                    '            Cm7 BbM7': [1, 11],
                    'xxxCxxxBbxxxF#xxx': [1, 11, 7],
				};
				
				for (query in testData) {
					const output = noteEngine.getNotesFromQuery(query);
					expect(output).toEqual(testData[query]);
				}
			});            
		});
        
		describe("when the query is null", function() {
			it("returns an empty array", function() {
                expect(noteEngine.getNotesFromQuery(null)).toEqual([]);
			});
		});        
    });        
});
