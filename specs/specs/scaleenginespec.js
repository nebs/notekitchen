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
                    'C minor': true,
                    'C harmonic minor': true,
                    'C natural minor': true,
                    '        Bb        major': true,
                    'major Bb': false,
                    '   C       major': true,
                    ' Bbm7 F major': true,
                    'C chromatic': true,
                    'C ionian': true,
                    'C dorian': true,
                    'C phrygian': true,
                    'C lydian': true,
                    'C mixolydian': true,
                    'C aeolian': true,
                    'C locrian': true,
                    'C melodic minor': true,
                    'C pentatonic major': true,
                    'C pentatonic minor': true,
                    'C pentatonic blues': true,
                    'C pentatonic neutral': true,
                    'C whole': true,
                    'C half whole': true,
                    'C dominant diminished': true,
                    'C whole half': true,
                    'C diminished': true,
                    'C algerian': true,
                    'C arabic': true,
                    'C byzantine': true,
                    'C chinese': true,
                    'C egyptian': true,
                    'C eight tone spanish': true,
                    'C enigmatic': true,
                    'C geez': true,
                    'C hindu': true,
                    'C hirajoshi': true,
                    'C hungarian': true,
                    'C japanese': true,
                    'C oriental': true,
                    'C romanian minor': true,
                    'C spanish gypsy': true,
                    'C super locrian': true,
                    'C maqam': true,
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
                    'C# major': [1, 2, 4, 6, 7, 9, 11, 13, 14, 16, 18, 19, 21, 23, 25, 26, 28, 30, 31, 33, 35],
                    'Gb harmonic minor': [2, 3, 6, 7, 9, 10, 12, 14, 15, 18, 19, 21, 22, 24, 26, 27, 30, 31, 33, 34, 36],
                    'Bb minor': [1, 2, 4, 6, 7, 9, 11, 13, 14, 16, 18, 19, 21, 23, 25, 26, 28, 30, 31, 33, 35],
                    'Bb natural minor': [1, 2, 4, 6, 7, 9, 11, 13, 14, 16, 18, 19, 21, 23, 25, 26, 28, 30, 31, 33, 35],
                    'C whole tone': [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35],
                    'C chromatic': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
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
                    'C major C# major': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
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
