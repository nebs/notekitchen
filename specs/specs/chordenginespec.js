describe("ChordEngine", function() {
	let chordEngine;
    let parser;
    let N, N2, N3;
    
	beforeEach(function() {
        parser = new Parser();
		chordEngine = new ChordEngine(parser);
        N = {
            'C': 1,
            'C#': 2,
            'Db': 2,
            'D': 3,
            'D#': 4,
            'Eb': 4,
            'E': 5,
            'F': 6,
            'F#': 7,
            'Gb': 7,
            'G': 8,
            'G#': 9,
            'Ab': 9,
            'A': 10,
            'A#': 11,
            'Bb': 11,
            'B': 12,
        };
        N2 = {};
        for (let key in N) {
            N2[key] = N[key] + 12;
        }
        N3 = {};        
        for (let key in N) {
            N3[key] = N2[key] + 12;
        }        
	});

	describe("getNotesFromSymbol", function() {
		describe("when given a query", function() {
			it("returns an array of notes", function() {
				const testData = {
                    '': [],
                    'C': [N['C'], N['E'], N['G']],
                    'Cm': [N['C'], N['Eb'], N['G']],
                    'C-': [N['C'], N['Eb'], N['G']],
                    'Cm7': [N['C'], N['Eb'], N['G'], N['Bb']],
                    'C-7': [N['C'], N['Eb'], N['G'], N['Bb']],
                    'Cm7b5': [N['C'], N['Eb'], N['Gb'], N['Bb']],
                    'C-7b5': [N['C'], N['Eb'], N['Gb'], N['Bb']],
                    'C7': [N['C'], N['E'], N['G'], N['Bb']],
                    'C9': [N['C'], N['E'], N['G'], N['Bb'], N2['D']],
                    'C11': [N['C'], N['E'], N['G'], N['Bb'], N2['D'], N2['F']],
                    'C13': [N['C'], N['E'], N['G'], N['Bb'], N2['D'], N2['F'], N2['A']],
                    'C+7': [N['C'], N['E'], N['G#'], N['Bb']],
                    'Caug': [N['C'], N['E'], N['G#']],
                    'Csus4': [N['C'], N['F'], N['G']],
                    'Csus2': [N['C'], N['D'], N['G']],
                    'Cdim': [N['C'], N['Eb'], N['Gb']],
                    'Cdim7': [N['C'], N['Eb'], N['Gb'], N['A']],
                    'CM7': [N['C'], N['E'], N['G'], N['B']],
                    'CM9': [N['C'], N['E'], N['G'], N['B'], N2['D']],
                    'CM11': [N['C'], N['E'], N['G'], N['B'], N2['D'], N2['F']],
                    'CM13': [N['C'], N['E'], N['G'], N['B'], N2['D'], N2['F'], N2['A']],
                    'Cmaj7': [N['C'], N['E'], N['G'], N['B']],
                    'Cmaj9': [N['C'], N['E'], N['G'], N['B'], N2['D']],
                    'Cmaj11': [N['C'], N['E'], N['G'], N['B'], N2['D'], N2['F']],
                    'Cmaj13': [N['C'], N['E'], N['G'], N['B'], N2['D'], N2['F'], N2['A']],                    
                    'C7b5': [N['C'], N['E'], N['Gb'], N['Bb']],
                    'C7#5': [N['C'], N['E'], N['G#'], N['Bb']],
                    'C7b9': [N['C'], N['E'], N['G'], N['Bb'], N2['C#']],
                    'C7#9': [N['C'], N['E'], N['G'], N['Bb'], N2['D#']],
                    'C7#5b9': [N['C'], N['E'], N['G#'], N['Bb'], N2['C#']],
                    'C9#11': [N['C'], N['E'], N['G'], N['Bb'], N2['D'], N2['F#']],
                    'C9b13': [N['C'], N['E'], N['G'], N['Bb'], N2['D'], N2['F'], N2['Ab']],
                    'C6': [N['C'], N['E'], N['G'], N['A']],
                    'Cm6': [N['C'], N['Eb'], N['G'], N['A']],
                    'C6sus4': [N['C'], N['F'], N['G'], N['A']],
                    'C9sus4': [N['C'], N['F'], N['G'], N['Bb'], N2['D']],
                    'C(b13)(#11)(b9)(#15)b2': [N['C'], N['Db'], N['E'], N['G'], N['Bb'], N2['Db'], N2['F#'], N2['Ab'], N3['C#']],
                    'Cm9b13#11': [N['C'], N['Eb'], N['G'], N['Bb'], N2['D'], N2['F#'], N2['Ab']],
                    'C   b14': [N['C'], N['E'], N['G'], N2['Bb']],
                    'C +9 -11 #13': [N['C'], N['E'], N['G'], N['Bb'], N2['D#'], N2['E'], N2['Bb']],
                    'CM7 +9 -11 #13': [N['C'], N['E'], N['G'], N['B'], N2['D#'], N2['E'], N2['Bb']],
                    'F#m7': [N['F#'], N['A'], N2['C#'], N2['E']],
                    'Bb+5': [N['Bb'], N2['D'], N2['F#']],
                    'Gbdim7   b13   #11': [N['Gb'], N['A'], N2['C'], N2['Eb'], N2['Ab'], N3['C'], N3['D']],
				};
				
				for (query in testData) {
					const output = chordEngine.getNotesFromSymbol(query);
					expect(output).toEqual(testData[query]);
				}
			});            
		});
        
		describe("when the query is null", function() {
			it("returns an empty array", function() {
                expect(chordEngine.getNotesFromSymbol(null)).toEqual([]);
			});
		});        
    });
        
	describe("getNotesFromQuery", function() {
		describe("when given a query", function() {
			it("returns an array of notes", function() {
				const testData = {
                    '': [],
                    'C': [N['C'], N['E'], N['G']],
                    'C D': [N['C'], N['D'], N['E'], N['F#'], N['G'], N['A']],
                    'Cm D-': [N['C'], N['D'], N['Eb'], N['F'], N['G'], N['A']],
                    'C D Bb': [N['C'], N['D'], N['E'], N['F#'], N['G'], N['A'], N['Bb'], N2['D'], N2['F']],
                    'C D Bb        b13': [N['C'], N['D'], N['E'], N['F#'], N['G'], N['A'], N['Bb'], N2['D'], N2['F'], N2['Ab'], N3['C'], N3['Eb'], N3['Gb']],
                    'C  b13 D Bb': [N['C'], N['D'], N['E'], N['F#'], N['G'], N['A'], N['Bb'], N2['D'], N2['F'], N2['Ab']],
				};
				
				for (query in testData) {
					const output = chordEngine.getNotesFromQuery(query);
					expect(output).toEqual(testData[query]);
				}
			});            
		});
        
		describe("when the query is null", function() {
			it("returns an empty array", function() {
                expect(chordEngine.getNotesFromQuery(null)).toEqual([]);
			});
		});        
    });        
});
