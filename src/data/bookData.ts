export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Section {
  id: string;
  title: string;
  readingText: string;
  questions: Question[];
}

export interface Theme {
  id: string;
  title: string;
  sections: Section[];
}

export const bookData: Theme[] = [
  {
    id: 'thema-1',
    title: 'Thema 1: Kennismaken en Voorstellen',
    sections: [
      {
        id: '1.1',
        title: '1.1 Mijn naam is Mahmut',
        readingText: 'Hallo! Mijn naam is Mahmut. Ik ben 40 jaar oud en ik kom uit Turkije. Ik woon sinds twee jaar in Nederland met mijn gezin. Ik leer graag de Nederlandse taal.',
        questions: [
          {
            id: 1,
            question: 'Hoe oud is Mahmut?',
            options: ['30 jaar', '35 jaar', '40 jaar'],
            correctAnswer: '40 jaar'
          },
          {
            id: 2,
            question: 'Waar komt hij vandaan?',
            options: ['Turkije', 'Nederland', 'Duitsland'],
            correctAnswer: 'Turkije'
          }
        ]
      },
      {
        id: '1.2',
        title: '1.2 Begroetingen en afscheid',
        readingText: 'In het Nederlands zeg je "Goedemorgen" in de ochtend en "Goedemiddag" in de middag. Als je weggaat, zeg je "Tot ziens" of simpelweg "Doei".',
        questions: [
          {
            id: 1,
            question: 'Wat zeg je in de ochtend?',
            options: ['Goedemiddag', 'Goedemorgen', 'Goedenavond'],
            correctAnswer: 'Goedemorgen'
          }
        ]
      }
    ]
  },
  {
    id: 'thema-2',
    title: 'Thema 2: Familie en Gezin',
    sections: [
      {
        id: '2.1',
        title: '2.1 Mijn familie',
        readingText: 'Mijn gezin bestaat uit vier personen. Ik ben getrouwd en we hebben twee kinderen. Mijn vader en moeder wonen in een leuk dorp en werken in de landbouw.',
        questions: [
          {
            id: 1,
            question: 'Uit hoeveel personen bestaat het gezin?',
            options: ['Drie personen', 'Vier personen', 'Vijf personen'],
            correctAnswer: 'Vier personen'
          }
        ]
      },
      {
        id: '2.2',
        title: '2.2 Familiebetrekkingen',
        readingText: 'De vader van mijn vrouw is mijn schoonvader. De dochter van mijn zus is mijn nichtje. We vieren verjaardagen altijd gezellig samen.',
        questions: [
          {
            id: 1,
            question: 'Wie is de vader van jouw vrouw?',
            options: ['Oom', 'Schoonvader', 'Broer'],
            correctAnswer: 'Schoonvader'
          }
        ]
      }
    ]
  },
  {
    id: 'thema-3',
    title: 'Thema 3: Boodschappen en Eten',
    sections: [
      {
        id: '3.1',
        title: '3.1 In de supermarkt',
        readingText: 'Elke zaterdag ga ik naar de markt en de supermarkt. Ik koop vers brood, Hollandse kaas, verse groenten en fruit. Kaas is erg populair in Nederland.',
        questions: [
          {
            id: 1,
            question: 'Wanneer gaat hij naar de markt?',
            options: ['Elke maandag', 'Elke zaterdag', 'Elke zondag'],
            correctAnswer: 'Elke zaterdag'
          }
        ]
      },
      {
        id: '3.2',
        title: '3.2 Bij de slager',
        readingText: 'De slager verkoopt vers vlees. Ik vraag aan de slager: "Mag ik één kilo gehakt en vier kipschnitzels?" De kwaliteit van het vlees is erg goed.',
        questions: [
          {
            id: 1,
            question: 'Hoeveel gehakt vraagt hij?',
            options: ['500 gram', 'Eén kilo', 'Twee kilo'],
            correctAnswer: 'Eén kilo'
          }
        ]
      }
    ]
  },
  {
    id: 'thema-4',
    title: 'Thema 4: Wonen en Omgeving',
    sections: [
      {
        id: '4.1',
        title: '4.1 Mijn huis',
        readingText: 'Wij wonen in een fijne eengezinswoning. De woonkamer is ruim en heeft veel licht. Achter het huis hebben we een mooie tuin met veel bloemen.',
        questions: [
          {
            id: 1,
            question: 'Wat staat er achter het huis?',
            options: ['Een garage', 'Een mooie tuin', 'Een balkon'],
            correctAnswer: 'Een mooie tuin'
          }
        ]
      },
      {
        id: '4.2',
        title: '4.2 De buurt en buren',
        readingText: 'Onze straat is erg rustig. De buren zijn vriendelijk en helpen elkaar graag. Er is een speeltuin voor de kinderen vlak bij ons huis.',
        questions: [
          {
            id: 1,
            question: 'Hoe is de straat?',
            options: ['Druk', 'Rustig', 'Gevaarlijk'],
            correctAnswer: 'Rustig'
          }
        ]
      }
    ]
  },
  {
    id: 'thema-5',
    title: 'Thema 5: Dagelijkse Routine en Hobby’s',
    sections: [
      {
        id: '5.1',
        title: '5.1 Mijn dagindeling',
        readingText: 'Ik sta om 07:00 uur op. Eerst ontbijt ik met mijn gezin ve daarna drink ik een kop koffie. Om 08:30 uur begin ik met werken op mijn computer.',
        questions: [
          {
            id: 1,
            question: 'Hoe laat staat hij op?',
            options: ['Om 06:00 uur', 'Om 07:00 uur', 'Om 08:00 uur'],
            correctAnswer: 'Om 07:00 uur'
          }
        ]
      },
      {
        id: '5.2',
        title: '5.2 Vrije tijd',
        readingText: 'In het weekend ga ik graag fietsen. Nederland is een geweldig land om te fietsen. Soms lees ik een boek of kijk ik een film in het Nederlands.',
        questions: [
          {
            id: 1,
            question: 'Wat doet hij graag in het weekend?',
            options: ['Zwemmen', 'Fietsen', 'Hardlopen'],
            correctAnswer: 'Fietsen'
          }
        ]
      }
    ]
  },
  {
    id: 'thema-6',
    title: 'Thema 6: Gezondheid en Zorg',
    sections: [
      {
        id: '6.1',
        title: '6.1 Afspraak bij de huisarts',
        readingText: 'Als ik me niet goed voel, bel ik de doktersassistente voor een afspraak. De huisarts onderzoekt mij ve geeft advies of een recept voor medicijnen.',
        questions: [
          {
            id: 1,
            question: 'Wie belt hij voor een afspraak?',
            options: ['De apotheek', 'De doktersassistente', 'Het ziekenhuis'],
            correctAnswer: 'De doktersassistente'
          }
        ]
      },
      {
        id: '6.2',
        title: '6.2 Bij de apotheek',
        readingText: 'Met het recept van de dokter ga ik naar de apotheek. De apotheker legt uit hoe ve wanneer ik de medicijnen moet innemen.',
        questions: [
          {
            id: 1,
            question: 'Waar haalt hij de medicijnen?',
            options: ['Bij de supermarkt', 'Bij de apotheek', 'Bij de tandarts'],
            correctAnswer: 'Bij de apotheek'
          }
        ]
      }
    ]
  },
  {
    id: 'thema-7',
    title: 'Thema 7: Werk ve Opleiding',
    sections: [
      {
        id: '7.1',
        title: '7.1 Werken in IT',
        readingText: 'Ik ben een software ontwikkelaar ve data analist. Ik schrijf code in Python ve TypeScript. Ik vind het leuk om complexe problemen op te lossen.',
        questions: [
          {
            id: 1,
            question: 'Wat is zijn beroep?',
            options: ['Docent', 'Software ontwikkelaar', 'Verkoper'],
            correctAnswer: 'Software ontwikkelaar'
          }
        ]
      },
      {
        id: '7.2',
        title: '7.2 Solliciteren',
        readingText: 'Wanneer je solliciteert in Nederland, stuur je een CV ve een motivatiebrief. Een goed netwerk op LinkedIn is ook erg belangrijk voor een baan.',
        questions: [
          {
            id: 1,
            question: 'Wat stuur je als je solliciteert?',
            options: ['Alleen een foto', 'Een CV en motivatiebrief', 'Een diploma'],
            correctAnswer: 'Een CV en motivatiebrief'
          }
        ]
      }
    ]
  },
  {
    id: 'thema-8',
    title: 'Thema 8: Vervoer ve Reizen',
    sections: [
      {
        id: '8.1',
        title: '8.1 Openbaar vervoer',
        readingText: 'Het openbaar vervoer in Nederland is goed geregeld. Met een OV-chipkaart kun je reizen met de bus, tram, metro ve trein. Vergeet niet in ve uit te checken!',
        questions: [
          {
            id: 1,
            question: 'Wat gebruik je om te reizen met het OV?',
            options: ['Een paspoort', 'Een OV-chipkaart', 'Een bankpas'],
            correctAnswer: 'Een OV-chipkaart'
          }
        ]
      },
      {
        id: '8.2',
        title: '8.2 Met de auto op weg',
        readingText: 'Om auto te rijden in Nederland heb je een geldig rijbewijs nodig. Je moet goed op de verkeersregels letten ve de maximale snelheid respecteren.',
        questions: [
          {
            id: 1,
            question: 'Wat heb je nodig om auto te rijden?',
            options: ['Een ID-kaart', 'Een geldig rijbewijs', 'Een OV-kaart'],
            correctAnswer: 'Een geldig rijbewijs'
          }
        ]
      }
    ]
  }
];