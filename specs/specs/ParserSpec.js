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
    
    describe("findNotes", function() {
		describe("when querying for notes", function() {
			it("returns a list of the root notes", function() {
				const testData = {
					'C':  ['C'],
                    'ABCDEFGA#B#C#D#E#F#G#AbBbCbDbEbFbGb':  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A#', 'C', 'C#', 'D#', 'F', 'F#', 'G#', 'Ab', 'Bb', 'B', 'Db', 'Eb', 'E', 'Gb'],
                    'BbM7 Cm7 F Locrian Gbdim7C#9':  ['Bb', 'C', 'F', 'Gb', 'C#'],
                    'xofjlkbjflkjj ks#jdh fl$kjnew kfjsd':  null,
                    ',mxcnv,nkjnBbfjlksdjfluwhC#fdskjnksjnlsdiuG': ['Bb', 'C#', 'G'],
                    'bbc#f': null,
                    'CCCF#F#BbBb': ['C', 'C', 'C', 'F#', 'F#', 'Bb', 'Bb'],
                    'C major stuff Bbm7(b13)(#11)': ['C', 'Bb'],
				};
				
				for (query in testData) {
					const output = parser.findNotes(query);
					expect(output).toEqual(testData[query]);
				}
			});
		});
        
		describe("when the query is null", function() {
			it("returns null", function() {
                expect(parser.findNotes(null)).toBeNull();
			});
		});        
    });
    
    describe("hasIsolatedRoot", function() {
		describe("when checking if it includes an isolated root", function() {
			it("returns true or false", function() {
				const testData = {
                    'C': true,
					'C locrian':  true,
                    'Cm7':  false,
                    'Fm7 Bb7 GM7(b13) F locrian': true,
                    'Fm7 Bb7 GM7(b13) Fdim7': false,
                    'Bbm7 GM7 F#': true,
                    '': false,
                    'C D E F G': true,
				};
				
				for (query in testData) {
					const output = parser.hasIsolatedRoot(query);
					expect(output).toEqual(testData[query]);
				}
			});
		});
        
		describe("when the query is null", function() {
			it("returns false", function() {
                expect(parser.hasIsolatedRoot(null)).toBeFalsy();
			});
		});        
    });    
    
    describe("findRoot", function() {
		describe("when querying for root", function() {
			it("returns the root", function() {
				const testData = {
                    'C': 'C',
                    'Bb locrian': 'Bb',
                    'C#m7': 'C#',
                    'F Bb G': 'F',
                    'jldkfjslkdjC#fjsdlkjfksd': 'C#',
                    'X#m7': null,
                    '': null,
                    'foo': null,
                    'A': 'A',
                    'A#': 'A#',
                    'Ab': 'Ab',
                    'B': 'B',
                    'B#': 'B#',
                    'Bb': 'Bb',
                    'C': 'C',
                    'C#': 'C#',
                    'Cb': 'Cb',
                    'D': 'D',
                    'D#': 'D#',
                    'Db': 'Db',
                    'E': 'E',
                    'E#': 'E#',
                    'Eb': 'Eb',
                    'F': 'F',
                    'F#': 'F#',
                    'Fb': 'Fb',
                    'G': 'G',
                    'G#': 'G#',
                    'Gb': 'Gb',                    
				};
				
				for (query in testData) {
					const output = parser.findRoot(query);
					expect(output).toEqual(testData[query]);
				}
			});
		});
        
		describe("when the query is null", function() {
			it("returns null", function() {
                expect(parser.findRoot(null)).toBeNull();
			});
		});      
    });
    
    describe("findOctave", function() {
		describe("when querying for octave", function() {
			it("returns the octave", function() {
				const testData = {
                    '': null,
                    'foo': null,
                    'C': null,
                    'C4': 4,
                    'Bb65': 65,
                    'F#5': 5,
                    'Foobar C#4 Bb5': 4,
                    '5C': null,
                    'C 5': null,
                    '  Bb 11  12Bb   6F G 7 C5  Bb8 F#9 Bb10 ': 5,
				};
				
				for (query in testData) {
					const output = parser.findOctave(query);
					expect(output).toEqual(testData[query]);
				}
			});
		});
        
		describe("when the query is null", function() {
			it("returns null", function() {
                expect(parser.findOctave(null)).toBeNull();
			});
		});        
    });
    
    describe("noteStringToIndex", function() {
		describe("when converting note string to index", function() {
			it("returns the index", function() {
				const testData = {
                    'B#': 1,
                    'C': 1,
                    'C#': 2,
                    'Db': 2,
                    'D': 3,
                    'D#': 4,
                    'Eb': 4,
                    'E': 5,
                    'Fb': 5,
                    'F': 6,
                    'E#': 6,
                    'F#': 7,
                    'Gb': 7,
                    'G': 8,
                    'G#': 9,
                    'Ab': 9,
                    'A': 10,
                    'A#': 11,
                    'Bb': 11,
                    'B': 12,
                    'Cb': 12,
				};
				
				for (query in testData) {
					const output = parser.noteStringToIndex(query);
					expect(output).toEqual(testData[query]);
				}
			});
		});
        
		describe("when the string is null", function() {
			it("returns null", function() {
                expect(parser.noteStringToIndex(null)).toBeNull();
			});
		});        
    });
    
    describe("findFlats", function() {
		describe("when querying for flats", function() {
			it("returns a list of flats", function() {
				const testData = {
                    'b9': [9],
                    'Bb9': [],
                    'C-13': [],
                    'C7(#9)(b25)(#4)(b11)': [25, 11],
                    'b430980b2222#439839 b9fkjhk bfkjh': [430980, 2222, 9],
                    '-11': [11],
                    'Cm7-9 F#M7b13#9 F Locrian b2 Gm7#11b9 Bbm7-78': [9, 13, 2, 78],
                    'Cb9 b9 -9 #7': [9],
                    'Cb10 F#b11 Bbb12 F#b13 C-14 F#-15 Bb-16 B#17 Fm7#18(b19) b20 C7': [11, 12, 13, 19, 20], 
				};
				
				for (query in testData) {
					const output = parser.findFlats(query);
					expect(output).toEqual(testData[query]);
				}
			});
		});
        
		describe("when the query is null", function() {
			it("returns an empty array", function() {
                expect(parser.findFlats(null)).toEqual([]);
			});
		});        
    });
    
    describe("findSharps", function() {
		describe("when querying for sharps", function() {
			it("returns a list of sharps", function() {
				const testData = {
                    '#9': [9],
                    'F#9': [],
                    'C+13': [],
                    'C7(b9)(#25)(b4)(#11)': [25, 11],
                    '#430980#2222b439839 #9fkjhk #fkjh': [430980, 2222, 9],
                    '+11': [11],
                    'Cm7+9 BbM7#13b9 F Locrian #2 Gm7b11#9 F#m7+78': [9, 13, 2, 78],
                    'C#9 #9 +9 b7': [9],
                    'C#10 Bb#11 C##12 Bb##13 C+14 Bb+15 C#+16 Bb17 Fm7b18(#19) #20 C7': [11, 12, 13, 19, 20], 
				};
				
				for (query in testData) {
					const output = parser.findSharps(query);
					expect(output).toEqual(testData[query]);
				}
			});
		});
        
		describe("when the query is null", function() {
			it("returns an empty array", function() {
                expect(parser.findSharps(null)).toEqual([]);
			});
		});        
    });
});
