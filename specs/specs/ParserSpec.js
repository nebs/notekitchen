describe("Parser", function() {
	var parser;

	beforeEach(function() {
		parser = new Parser();
	});

	describe("findSymbols", function() {
		describe("when the query is valid", function() {
			it("should return the proper symbols", function() {
				const testData = {
					'Cm7 Eb7': ['Cm7', 'Eb7'],
					'B': ['B'],
					'C      major   F#m7    (b5) G': ['C major', 'F#m7 (b5)', 'G'],
					'ABCDEFG': ['A','B','C','D','E','F','G'],
					'ABCfooDEFG': ['A','B','Cfoo','D','E','F','G'],
					'   C#11   D lydian    F# harmonic minor   G#7': ['C#11', 'D lydian', 'F# harmonic minor', 'G#7'],
					'FooCatBarGoalXerMoor': ['Foo', 'Cat', 'Bar', 'GoalXerMoor'],
					'y9870vnq7cun7h09OEbIUITQHH..,*(&^*&f/.ff)': ['EbIUITQHH..,*(&^*&f/.ff)'],
				};
				
				for (query in testData) {
					const symbols = parser.findSymbols(query);
					expect(symbols).toEqual(testData[query]);
				}
			});
		});
		
		describe("when the query is null", function() {
			it("should return null", function() {
				const query = null;
				symbols = parser.findSymbols(query);
				expect(symbols).toBeNull();
			});
		});
		
		describe("when the query is empty", function() {
			it("should return null", function() {
				const query = "";
				symbols = parser.findSymbols(query);
				expect(symbols).toBeNull();
			});
		});
		
		describe("when the query is all white space", function() {
			it("should return null", function() {
				const query = "           ";
				symbols = parser.findSymbols(query);
				expect(symbols).toBeNull();
			});
		});
		
		describe("when the query contains no root notes", function() {
			it("should return null", function() {
				const query = "zcwijsdlkjvjdvnlevhvlkjnfdlv(&%*%*&^ jaldghno87noify8o7yvbMNHITYRPOfj)";
				symbols = parser.findSymbols(query);
				expect(symbols).toBeNull();
			});
		});					
	});
});
