describe("ScaleEngine", function() {
	let scaleEngine;
    let parser;

	beforeEach(function() {
        parser = new Parser();
		scaleEngine = new ScaleEngine(parser);
	});

    describe("isScale", function() {
		describe("when given a query", function() {
			it("returns true or false", function() {
				const testData = {
                    'C major': true,
                    'Cmajor': false,
                    'major': false,
                    'C minor': false,
                    '        Bb        major': true,
                    'major Bb': false,
                    '   C       major': true,
                    ' Bbm7 F major': true,
				};
				
				for (query in testData) {
					const output = scaleEngine.isScale(query);
					expect(output).toEqual(testData[query]);
				}
			});            
		});
        
		describe("when the query is null", function() {
			it("returns false", function() {
                expect(scaleEngine.isScale(null)).toBeFalsy();
			});
		});        
    });
    
	describe("getNotesFromSymbol", function() {
		describe("when given a query", function() {
			it("returns an array of notes", function() {
				const testData = {
                    '': [],
                    'Foo': [],
                    'C major': [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 30, 32, 34, 36],
                    'C ionian': [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 30, 32, 34, 36],
                    'D dorian': [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 30, 32, 34, 36],
                    'E phrygian': [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 30, 32, 34, 36],
                    'F lydian': [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 30, 32, 34, 36],
                    'G mixolydian': [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 30, 32, 34, 36],
                    'A aeolian': [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 30, 32, 34, 36],
                    'B locrian': [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 30, 32, 34, 36],
                    'C# major': [2, 4, 6, 7, 9, 11, 13, 14, 16, 18, 19, 21, 23, 25, 26, 28, 30, 31, 33, 35, 1],
				};
				
				for (query in testData) {
					const output = scaleEngine.getNotesFromSymbol(query);
					expect(output).toEqual(testData[query]);
				}
			});            
		});
        
		describe("when the query is null", function() {
			it("returns an empty array", function() {
                expect(scaleEngine.getNotesFromSymbol(null)).toEqual([]);
			});
		});        
    });
        
	describe("getNotesFromQuery", function() {
		describe("when given a query", function() {
			it("returns an array of notes", function() {
				const testData = {
                    '': [],
                    'Foo': [],                    
                    'C major': [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 30, 32, 34, 36],
                    'C major C# major': [1, 3, 5, 6, 8, 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 29, 30, 32, 34, 36, 2, 4, 6, 7, 9, 11, 13, 14, 16, 18, 19, 21, 23, 25, 26, 28, 30, 31, 33, 35, 1],
				};
				
				for (query in testData) {
					const output = scaleEngine.getNotesFromQuery(query);
					expect(output).toEqual(testData[query]);
				}
			});            
		});
        
		describe("when the query is null", function() {
			it("returns an empty array", function() {
                expect(scaleEngine.getNotesFromQuery(null)).toEqual([]);
			});
		});        
    });        
});
