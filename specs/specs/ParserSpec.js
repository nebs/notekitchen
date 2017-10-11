describe("Parser", function() {
	let parser;

	beforeEach(function() {
		parser = new Parser();
	});

	describe("transposeNote", function() {
		describe("when transposing up by 1", function() {
			it("should return the transposed note", function() {
				const testData = {
					'C':  'C#',
					'C#': 'D',
					'Db': 'D',
					'D':  'D#',
					'D#': 'E',
					'Eb': 'E',
					'E':  'F',
					'F':  'F#',
					'F#': 'G',
					'Gb': 'G',
					'G':  'G#',
					'G#': 'A',
					'Ab': 'A',
					'A':  'A#',
					'A#': 'B',
					'Bb': 'B',
					'B':  'C',
				};
				
				for (note in testData) {
					const output = parser.transposeNote(note, 1);
					expect(output).toEqual(testData[note]);
				}
			});
		});
		
		describe("when transposing down by 1", function() {
			it("should return the transposed note", function() {
				const testData = {
					'C':  'B',
					'C#': 'C',
					'Db': 'C',
					'D':  'Db',
					'D#': 'D',
					'Eb': 'D',
					'E':  'Eb',
					'F':  'E',
					'F#': 'F',
					'Gb': 'F',
					'G':  'Gb',
					'G#': 'G',
					'Ab': 'G',
					'A':  'Ab',
					'A#': 'A',
					'Bb': 'A',
					'B':  'Bb',
				};
				
				for (note in testData) {
					const output = parser.transposeNote(note, -1);
					expect(output).toEqual(testData[note]);
				}
			});
		});	
		
		describe("when transposing up by a larger number", function() {
			it("should return the transposed note", function() {
				const testData = {
					'C':  'D',
					'C#': 'D#',
					'Db': 'D#',
					'D':  'E',
					'D#': 'F',
					'Eb': 'F',
					'E':  'F#',
					'F':  'G',
					'F#': 'G#',
					'Gb': 'G#',
					'G':  'A',
					'G#': 'A#',
					'Ab': 'A#',
					'A':  'B',
					'A#': 'C',
					'Bb': 'C',
					'B':  'C#',
				};
				
				for (note in testData) {
					const output = parser.transposeNote(note, 26);
					expect(output).toEqual(testData[note]);
				}
			});
		});
		
		describe("when transposing down by a larger number", function() {
			it("should return the transposed note", function() {
				const testData = {
					'C':  'Gb',
					'C#': 'G',
					'Db': 'G',
					'D':  'Ab',
					'D#': 'A',
					'Eb': 'A',
					'E':  'Bb',
					'F':  'B',
					'F#': 'C',
					'Gb': 'C',
					'G':  'Db',
					'G#': 'D',
					'Ab': 'D',
					'A':  'Eb',
					'A#': 'E',
					'Bb': 'E',
					'B':  'F',
				};
				
				for (note in testData) {
					const output = parser.transposeNote(note, -6);
					expect(output).toEqual(testData[note]);
				}
			});
		});
		
		describe("when querying an invalid note", function() {
			it("returns query unmodified", function() {
				const output = parser.transposeNote('Moo', 3);
				expect(output).toEqual('Moo');
			});
		});
		
		describe("when querying more than a note", function() {
			it("returns query unmodified", function() {
				const output = parser.transposeNote('C major', 1);
				expect(output).toEqual('C major');
			});
		});
		
		describe("when the query is null", function() {
			it("returns null", function() {
				const output = parser.transposeNote(null, 1);
				expect(output).toBeNull();
			});
		});
		
		describe("when the query is empty", function() {
			it("returns an empty string", function() {
				const output = parser.transposeNote('', 1);
				expect(output).toEqual('');
			});
		});						
	});

	describe("transposeQuery", function() {
		describe("when transposing up by 1", function() {
			it("returns the query with all notes transposed", function() {
				const testData = {
					'C':  'C#',
					'Gm7   F# locrian #2   BbM7(b13) #11':  'G#m7   G locrian #2   BM7(b13) #11',
					'BbM7 F#m7b5 B locrian Db F# Gb minor': 'BM7 Gm7b5 C locrian D G G minor',
					'ABCDEFG': 'A#CC#D#FF#G#',
					'CCC': 'C#C#C#',
					'': '',
				};
				
				for (query in testData) {
					const output = parser.transposeQuery(query, 1);
					expect(output).toEqual(testData[query]);
				}
			});
		});
		
		describe("when transposing down by 1", function() {
			it("returns the query with all notes transposed", function() {
				const testData = {
					'C':  'B',
					'Gm7   F# locrian #2   BbM7(b13) #11':  'Gbm7   F locrian #2   AM7(b13) #11',
					'BbM7 F#m7b5 B locrian Db F# Gb minor': 'AM7 Fm7b5 Bb locrian C F F minor',
					'ABCDEFG': 'AbBbBDbEbEGb',
					'C#C#C#': 'CCC',
					'': '',
				};
				
				for (query in testData) {
					const output = parser.transposeQuery(query, -1);
					expect(output).toEqual(testData[query]);
				}
			});
		});
		
		describe("when transposing back and forth downwards", function() {
			it("returns the query with sharps converted to flats", function() {
				let query = 'Cm7 GM9 F# Locrian Bbdim7';
				query = parser.transposeQuery(query, 1);
				query = parser.transposeQuery(query, 1);
				query = parser.transposeQuery(query, 1);
				query = parser.transposeQuery(query, -3);												
				expect(query).toEqual('Cm7 GM9 Gb Locrian Bbdim7');
			});
		});				

		describe("when transposing back and forth upwards", function() {
			it("returns the query with flats converted to sharps", function() {
				let query = 'Cm7 GM9 F# Locrian Bbdim7';
				query = parser.transposeQuery(query, -1);
				query = parser.transposeQuery(query, -1);
				query = parser.transposeQuery(query, -1);
				query = parser.transposeQuery(query, 3);												
				expect(query).toEqual('Cm7 GM9 F# Locrian A#dim7');
			});
		});
		
		describe("when the query is null", function() {
			it("returns null", function() {
				const output = parser.transposeQuery(null, 3);												
				expect(output).toBeNull();
			});
		});						
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
