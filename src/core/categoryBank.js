/**
 * "Can You Pass As..." — 131 identity-check trivia categories, grouped into
 * 16 sections, 8 questions each (1048 total). Sourced from the uploaded
 * question set and kept in the same [question, answer] pair shape that
 * `questions.js` already uses everywhere else, so a chosen category can be
 * fed straight into `machine.setQuestions()`.
 *
 * `SECTIONS` is the display grouping (for <optgroup> labels in the category
 * picker). `CATEGORY_BANK` is a flat name → questions lookup built from it,
 * since most call sites just want "give me this one category's questions".
 */
export const SECTIONS = [
  {
    section: 'Generations & Eras',
    categories: [
      {
        name: '5th Grader',
        questions: [
          ['What is 7 × 8?', '56'],
          ['What is 3/4 as a decimal?', '0.75'],
          ['What is 15% of 60?', '9'],
          ["What's the capital of Australia?", 'Canberra — not Sydney'],
          ['What is the past participle of "swim"?', 'Swum'],
          ['How many sides does a nonagon have?', 'Nine'],
          ["What's the largest organ in the human body?", 'The skin'],
          ['What is the perimeter of a rectangle 7cm by 3cm?', '20cm']
        ]
      },
      {
        name: '90s Kid',
        questions: [
          ['What was the Konami Code?', 'Up, up, down, down, left, right, left, right, B, A'],
          ['Which console launched before the PlayStation but lost the 90s format war?', 'The Sega Saturn'],
          ['What was Napster shut down over?', 'Copyright infringement — music piracy'],
          ['What did you need a pencil for, with a cassette?', 'Winding the chewed tape back in'],
          ['What was a Discman notorious for when you walked?', 'Skipping'],
          ['What happened to your internet when someone picked up the phone?', 'It disconnected — dial-up shared the phone line'],
          ['What were the first two Pokémon versions released in Japan?', 'Red and Green'],
          ['What did you do to a Tamagotchi that killed it fastest?', 'Ignored it — it needed feeding and cleaning constantly']
        ]
      },
      {
        name: 'Boomer',
        questions: [
          ['What was a "party line" on a telephone?', 'A shared line — neighbours could pick up and listen in'],
          ['What was carbon paper for?', 'Making a copy as you typed or wrote'],
          ['What was Sputnik?', 'The first artificial satellite, launched by the Soviet Union in 1957'],
          ['What was the Cuban Missile Crisis about?', 'Soviet nuclear missiles placed in Cuba, in 1962'],
          ['What was the "Iron Curtain"?', 'The divide between Soviet-controlled Eastern Europe and the West'],
          ['What did a typewriter\'s carriage return lever do?', 'Moved the paper up and back to start the next line'],
          ['What was the significance of Woodstock in 1969?', 'The defining festival of the counterculture'],
          ['What did "long distance" mean on a phone bill?', 'Calls charged by the minute by distance — you kept them short']
        ]
      },
      {
        name: 'Gen Z',
        questions: [
          ['What does "ate and left no crumbs" mean?', 'Did it flawlessly, with nothing to criticise'],
          ['What\'s a "pick-me"?', 'Someone seeking approval by putting down their own group'],
          ['What does "let him cook" mean?', "Leave them to it — they know what they're doing"],
          ['What\'s a "beige flag"?', 'A quirk that\'s neither good nor bad, just odd'],
          ['What does "mid" mean?', 'Mediocre — overrated'],
          ['What does "cooked" mean?', 'Finished, done for, in trouble'],
          ['What\'s "brainrot"?', 'Content so repetitive or absurd it feels like it melts your brain'],
          ['What are "aura points"?', 'An imaginary score for how cool — or how mortifying — something you did was']
        ]
      },
      {
        name: 'Millennial',
        questions: [
          ['What did a MySpace "Top 8" do to friendships?', 'Publicly ranked them — and started arguments'],
          ['What did Limewire downloads notoriously come with?', 'Viruses and mislabelled files'],
          ['What was Y2K feared to do?', 'Make computers fail at the year 2000 rollover'],
          ['What was a "LAN party"?', "Hauling your PC to someone's house to play networked games"],
          ['What was "planking"?', 'Lying rigid face-down in unlikely places for photos'],
          ['What was the Harlem Shake video format?', 'One person dancing alone, then a cut to everyone going wild'],
          ['What was an AIM "away message" actually used for?', 'Broadcasting song lyrics and passive-aggressive subtext'],
          ['What did "pics or it didn\'t happen" replace?', 'Taking someone at their word']
        ]
      },
      {
        name: '2010s Kid',
        questions: [
          ['How long was a Vine?', 'Six seconds, looping'],
          ['What did the Ice Bucket Challenge raise money for?', 'ALS research'],
          ['What was "the dress" argument about?', 'Whether it was blue and black or white and gold'],
          ['What happened to Flappy Bird?', 'Its creator pulled it from the app stores at its peak'],
          ['What was musical.ly before it became TikTok?', 'A lip-sync video app'],
          ['What was "dabbing"?', 'A dance move — head dropped into the crook of the elbow'],
          ['What was a "default dance"?', "Fortnite's standard-issue emote"],
          ['What was the point of a Snapchat "streak"?', 'Sending something every day without breaking the chain']
        ]
      },
      {
        name: 'Someone From the 80s',
        questions: [
          ['What was Live Aid, in 1985?', 'A global charity concert for Ethiopian famine relief'],
          ['What was the Challenger disaster?', 'The space shuttle broke apart shortly after launch in 1986'],
          ['What year did the Berlin Wall fall?', '1989'],
          ['What was a Walkman?', 'The first genuinely portable personal cassette player'],
          ['What did "greed is good" come from?', 'The 1987 film Wall Street — the decade\'s excess in three words'],
          ['What format war did VHS win, and against what?', 'Against Betamax'],
          ['What was the Rubik\'s Cube asking you to do?', 'Return every face to a single solid colour'],
          ['What did MTV play, around the clock, at launch?', 'Music videos']
        ]
      }
    ]
  },
  {
    section: 'Gender & Relationship Knowledge Checks',
    categories: [
      {
        name: 'a Woman in 2026',
        questions: [
          ['What is the luteal phase?', 'The second half of the menstrual cycle, after ovulation'],
          ['What\'s "cycle syncing"?', 'Adapting training, food and workload to menstrual cycle phases'],
          ['What\'s the difference between chemical and mineral sunscreen?', 'Chemical absorbs UV; mineral sits on the skin and reflects it'],
          ['What\'s "skin cycling"?', 'Rotating actives on a schedule — exfoliate, retinoid, then recovery nights'],
          ['What\'s "slugging"?', 'Sealing the face overnight under an occlusive like petroleum jelly'],
          ['What\'s "weaponised incompetence"?', "Doing a task badly on purpose so you're never asked again"],
          ['What\'s a "situationship"?', 'A romantic arrangement nobody will define'],
          ['Why do people take a retinoid at night and not in the morning?', 'It degrades in sunlight and raises sun sensitivity']
        ]
      },
      {
        name: 'a Man in 2026',
        questions: [
          ['What is "mewing"?', 'Pressing the tongue to the palate, claimed to sharpen the jawline'],
          ['What\'s "looksmaxxing"?', 'Optimising your appearance, often to extremes'],
          ['What does the "sigma male" claim to describe?', 'A lone wolf sitting outside the alpha/beta hierarchy'],
          ['What\'s a "grindset"?', 'An obsessive hustle-and-discipline mindset'],
          ['What\'s the "male loneliness epidemic" shorthand for?', 'Sharply declining close friendships among men'],
          ['What\'s the Roman Empire meme about?', 'How often men supposedly think about it'],
          ['What\'s "NPC behaviour"?', 'Acting on autopilot, like a non-player character'],
          ['What\'s a "dad bod"?', 'A softened, unpolished physique that still reads as healthy']
        ]
      },
      {
        name: 'a Girl Dad',
        questions: [
          ['Which athlete made "girl dad" mainstream?', 'Kobe Bryant'],
          ['What\'s the difference between a French and a Dutch braid?', 'A French braid crosses strands over; a Dutch crosses under, so it sits raised'],
          ['At what age does puberty typically begin in girls?', 'Around 8 to 13'],
          ['What is "period poverty"?', 'Not being able to afford menstrual products'],
          ['What\'s the difference between praising effort and praising talent?', 'Effort builds a growth mindset; "you\'re so clever" makes children avoid hard things'],
          ['What\'s "emotion coaching" as a parenting style?', 'Helping a child name and work through a feeling rather than dismissing it'],
          ['What\'s the "second shift"?', 'The unpaid domestic work done after the paid working day'],
          ['What does it mean to "hold the boundary" with a tantrum?', 'Keeping the limit in place while staying calm and connected']
        ]
      },
      {
        name: "Someone's Boyfriend",
        questions: [
          ['What are the five love languages?', 'Words of affirmation, acts of service, receiving gifts, quality time, physical touch'],
          ['What are Gottman\'s "Four Horsemen"?', 'Criticism, contempt, defensiveness and stonewalling'],
          ['Which of the four most strongly predicts a breakup?', 'Contempt'],
          ['What\'s "stonewalling"?', 'Shutting down and withdrawing mid-argument'],
          ['What\'s a "bid for connection"?', "A small attempt at attention that you either turn toward or away from"],
          ['What are the four attachment styles?', 'Secure, anxious, avoidant and disorganised'],
          ['What\'s a "repair attempt" in a fight?', 'Anything that de-escalates and re-establishes connection'],
          ['What\'s the difference between a boundary and an ultimatum?', 'A boundary is about what you will do; an ultimatum is about controlling what they do']
        ]
      },
      {
        name: 'a Bridesmaid',
        questions: [
          ['How does "something old, something new, something borrowed, something blue" actually end?', '"And a silver sixpence in her shoe"'],
          ['What does the maid of honour hold during the ceremony?', "The bride's bouquet and the groom's ring"],
          ['What is lobola?', 'Bride-price negotiated between the two families'],
          ['What\'s a "white wedding" in South Africa, versus a traditional one?', 'The Western-style ceremony, often held in addition to the customary one'],
          ['What\'s a "first look"?', 'A private moment where the couple see each other before the ceremony'],
          ['What does RSVP stand for?', "Répondez s'il vous plaît — please reply"],
          ['What\'s a "receiving line"?', 'The couple and family greeting every guest in turn'],
          ['What is a hen party called in the United States?', 'A bachelorette party']
        ]
      }
    ]
  },
  {
    section: 'Nationalities & Culture',
    categories: [
      {
        name: 'South African',
        questions: [
          ['What do the six colours of the South African flag officially symbolise?', 'Nothing — only the Y shape has an assigned meaning: convergence, taking the road ahead in unity'],
          ['Which language became the twelfth official language, and when?', 'South African Sign Language, in 2023'],
          ['What happened on 16 June 1976?', 'The Soweto uprising'],
          ['What was the Freedom Charter?', 'The 1955 statement of principles adopted by the Congress Alliance'],
          ['Why were the Big Five named that?', 'They were considered the most dangerous animals to hunt on foot'],
          ['What is the Tripartite Alliance?', 'The ANC, COSATU and the SACP'],
          ['Which river forms much of the border with Namibia?', 'The Orange River'],
          ['What does stage 6 load shedding mean in practice?', 'Around 6000MW being shed — several outages a day']
        ]
      },
      {
        name: 'American',
        questions: [
          ['How many amendments make up the Bill of Rights?', 'Ten'],
          ['What does the Fifth Amendment protect against?', 'Being compelled to incriminate yourself'],
          ['How many electoral votes win the presidency?', '270'],
          ['What is a filibuster?', 'Extending Senate debate to block a vote'],
          ['What does the 22nd Amendment do?', 'Limits a president to two terms'],
          ['What is Juneteenth?', '19 June — marking the end of slavery in Texas in 1865'],
          ['How does representation differ between the House and the Senate?', 'The House is by population; the Senate is two per state regardless of size'],
          ['What is "gerrymandering"?', 'Drawing district boundaries to favour one party']
        ]
      },
      {
        name: 'British',
        questions: [
          ['What\'s the difference between the UK, Great Britain and the British Isles?', 'Great Britain is the island; the UK adds Northern Ireland; the British Isles adds the Republic of Ireland too'],
          ['What does the Speaker of the Commons do?', 'Chairs debate and keeps order — and gives up party allegiance'],
          ['What is a by-election?', 'A single-seat election held between general elections'],
          ['What is the Barnett formula?', 'How funding is allocated to the devolved nations'],
          ['What is "Received Pronunciation"?', 'The traditional standard accent — the old BBC voice'],
          ['What does "pudding" mean in British usage?', 'The sweet course generally, not one specific dish'],
          ['What is Prime Minister\'s Questions?', 'A weekly Commons session where the PM takes questions from MPs'],
          ['What does it mean when Parliament is "prorogued"?', 'The session is formally ended, suspending business']
        ]
      },
      {
        name: 'Nigerian',
        questions: [
          ["What are Nigeria's three largest ethnic groups?", 'Hausa, Yoruba and Igbo'],
          ['What is "japa"?', 'Emigrating abroad for better prospects'],
          ['What does "wahala" mean?', 'Trouble'],
          ["What is Nigeria's capital — and what was it before?", 'Abuja; it was Lagos until 1991'],
          ['What is Nollywood known for globally?', 'Being one of the largest film industries in the world by output'],
          ['What is an "owambe"?', 'A big, lavish Yoruba party'],
          ['What is suya?', 'Spiced, skewered grilled meat'],
          ['What is Naija Pidgin?', 'Nigerian Pidgin English — a widely spoken lingua franca']
        ]
      },
      {
        name: 'Zulu',
        questions: [
          ['What happened at Isandlwana in 1879?', 'A Zulu army defeated a British force — one of the worst defeats in British colonial history'],
          ['What does "sawubona" literally mean?', '"I see you"'],
          ['What is ubuntu, in one line?', '"I am because we are" — personhood exists through other people'],
          ['What is umqombothi?', 'Traditional sorghum beer'],
          ['What is umkhosi womhlanga?', 'The Reed Dance — an annual ceremony before the king'],
          ['What is an induna?', 'A headman or appointed leader'],
          ['Who founded the Zulu Kingdom?', 'Shaka'],
          ['What is ilobolo traditionally paid in?', 'Cattle']
        ]
      },
      {
        name: 'a Frequent Traveller',
        questions: [
          ['What is the Schengen 90/180 rule?', '90 days in any rolling 180-day period across the whole Schengen area'],
          ['What is the difference between a layover and a stopover?', 'A layover is a short same-trip connection; a stopover is a deliberate multi-day break'],
          ['What is a transit visa for?', 'Passing through a country without formally entering it'],
          ['What does travel insurance almost never cover?', 'Pre-existing conditions and anything that happened while intoxicated'],
          ['What is "dynamic pricing" on flights?', 'Fares moving with demand, timing and sometimes your own search history'],
          ['What is overtourism?', "Visitor numbers exceeding a place's capacity to absorb them"],
          ['Why carry a local SIM instead of roaming?', 'Far cheaper data — at the cost of using your usual number'],
          ['What is the point of checking a country\'s yellow fever certificate requirement?', 'Some countries refuse entry without it if you have come from a risk area']
        ]
      }
    ]
  },
  {
    section: 'Professions',
    categories: [
      {
        name: 'a Doctor',
        questions: [
          ['What does a Glasgow Coma Scale of 15 mean?', 'Fully alert and oriented — the maximum score'],
          ['What is the first-line drug in anaphylaxis, and by what route?', 'Intramuscular adrenaline, into the anterolateral thigh'],
          ['What does "nil per os" mean on a chart?', 'Nothing by mouth'],
          ['What does a raised troponin indicate?', 'Myocardial injury — damage to heart muscle'],
          ["What are the three parts of Virchow's triad?", 'Stasis, endothelial injury and hypercoagulability'],
          ['What is the target INR range for most patients on warfarin?', '2.0 to 3.0'],
          ['What is a normal anion gap?', 'Roughly 8 to 12 mmol/L'],
          ['What does "SOB" mean in clinical notes?', 'Shortness of breath']
        ]
      },
      {
        name: 'a Pharmacist',
        questions: [
          ['What is a narrow therapeutic index drug — and name one?', 'One where the toxic dose sits close to the effective dose — warfarin, digoxin, lithium or phenytoin'],
          ['What is first-pass metabolism?', 'Drug metabolised by the liver before it ever reaches systemic circulation'],
          ['Which common antibiotic dangerously potentiates warfarin?', 'Metronidazole — co-trimoxazole does it too'],
          ['Why is grapefruit juice a problem with certain statins?', 'It inhibits CYP3A4, so drug levels rise'],
          ['What is the maximum daily paracetamol dose for a healthy adult?', '4 grams'],
          ['What has to be proven to register a generic against the originator?', 'Bioequivalence'],
          ['What is the key counselling point on alendronate?', 'Take it upright with water on an empty stomach, and stay upright for 30 minutes'],
          ['What separates a Schedule 5 from a Schedule 6 medicine in South Africa?', 'An S6 script can never be repeated — S2 to S5 can be, for up to six months']
        ]
      },
      {
        name: 'a Software Developer',
        questions: [
          ['What does it mean for an endpoint to be idempotent?', 'Calling it repeatedly has the same effect as calling it once'],
          ['What is a race condition?', 'When the result depends on the unpredictable timing of concurrent operations'],
          ['What does O(n log n) describe?', "An algorithm's time complexity — the shape of a good sorting algorithm"],
          ['What is the difference between git merge and git rebase?', 'Merge keeps both histories and adds a commit; rebase replays your commits onto a new base'],
          ['What is a memory leak?', 'Memory that is allocated and never released, so usage climbs over time'],
          ['What does CI/CD actually do?', 'Builds, tests and deploys changes automatically on every push'],
          ['What is technical debt?', 'Shortcuts taken now that cost more to undo later'],
          ['What is the difference between authentication and authorisation?', 'Authentication is who you are; authorisation is what you may do']
        ]
      },
      {
        name: 'a Lawyer',
        questions: [
          ['What is the standard of proof in a criminal trial?', 'Beyond a reasonable doubt'],
          ['What is the standard of proof in a civil trial?', 'A balance of probabilities'],
          ['What is mens rea?', 'The guilty mind — the intent element of a crime'],
          ['What does "sub judice" mean?', 'A matter still before the court, and so not to be publicly prejudged'],
          ['What is hearsay evidence?', 'Second-hand evidence offered to prove the truth of what was said'],
          ['What does prescription mean in law?', 'A claim lapsing after a set period of time'],
          ['What is the difference between an attorney and an advocate in South Africa?', 'Attorneys deal directly with clients; advocates are briefed by attorneys and argue in the higher courts'],
          ['What does it mean to be held "in contempt"?', 'Disobeying or disrespecting the authority of the court']
        ]
      },
      {
        name: 'a Chef',
        questions: [
          ['What are the five French mother sauces?', 'Béchamel, velouté, espagnole, hollandaise and tomato'],
          ['What is the temperature "danger zone" for food?', 'Roughly 5 to 60°C'],
          ['What is the ratio for a classic roux?', 'Equal parts fat and flour, by weight'],
          ['What is a brunoise?', 'A very fine dice — around 3mm'],
          ['What is carryover cooking?', 'Meat continuing to cook on residual heat after it leaves the pan or oven'],
          ['What does "monter au beurre" mean?', 'Finishing a sauce by whisking in cold butter'],
          ['What does "all day" mean called across the pass?', 'The running total of that item across every open ticket'],
          ['What is the difference between a chef de partie and a commis?', 'The chef de partie runs a station; the commis is the junior working under them']
        ]
      },
      {
        name: 'a Teacher',
        questions: [
          ['What is scaffolding in teaching?', 'Temporary support that is deliberately withdrawn as the learner becomes able'],
          ['What is the zone of proximal development?', 'The gap between what a learner can do alone and what they can do with help'],
          ['What is the difference between formative and summative assessment?', 'Formative checks learning in progress; summative measures it at the end'],
          ["What is Bloom's taxonomy used for?", 'Classifying learning objectives, from recall up to creation'],
          ['What three things does differentiation vary?', 'Content, process and product'],
          ['What is moderation of marks?', 'Checking marking consistency between markers or schools'],
          ['What is "wait time"?', 'The pause after asking a question before you take an answer — and most teachers leave far too little'],
          ['What is an IEP?', 'An individualised education programme for a learner with additional needs']
        ]
      },
      {
        name: 'an Athlete',
        questions: [
          ['What is the lactate threshold?', 'The intensity at which lactate accumulates faster than the body clears it'],
          ['What is periodisation?', 'Structuring training into phases that build toward a peak'],
          ['What is a taper?', 'Cutting training load before competition so you arrive fresh rather than fatigued'],
          ['What is the difference between a concentric and an eccentric contraction?', 'Concentric shortens the muscle under load; eccentric lengthens it'],
          ['When does DOMS usually peak?', '24 to 72 hours after the session'],
          ['What does VO2 max measure?', 'The maximum rate at which your body can use oxygen'],
          ['What is overtraining syndrome?', 'Performance falling because training load has outrun recovery'],
          ['What does RPE stand for, and what is it for?', 'Rate of Perceived Exertion — gauging intensity by feel rather than by numbers']
        ]
      },
      {
        name: 'a Musician',
        questions: [
          ['What notes make up a C major triad?', 'C, E and G'],
          ['What is the relative minor of C major?', 'A minor'],
          ['What is a ii–V–I?', 'The most common chord progression in jazz'],
          ['How does 6/8 differ in feel from 3/4?', '6/8 is two groups of three — a compound lilt; 3/4 is three even beats'],
          ['What is a tritone?', 'An interval of three whole tones — the old "devil\'s interval"'],
          ['What does a capo on the second fret do to the key?', 'Raises everything by a whole tone'],
          ['What is the circle of fifths for?', 'Showing how keys relate, and how many sharps or flats each carries'],
          ['What does "rubato" instruct a player to do?', 'Flex the tempo expressively rather than hold it strictly']
        ]
      }
    ]
  },
  {
    section: 'Subcultures & Fandoms',
    categories: [
      {
        name: 'a Foodie',
        questions: [
          ['What is the Maillard reaction?', 'Browning from amino acids and sugars reacting under heat — and it is not caramelisation'],
          ['How does caramelisation differ from the Maillard reaction?', 'Caramelisation is sugar alone; Maillard needs protein as well'],
          ['What does sous vide control that a pan cannot?', 'Exact core temperature, edge to edge'],
          ['What is nixtamalisation?', 'Treating maize with an alkali — it frees the niacin and makes masa possible'],
          ['What is the difference between stock and broth?', 'Stock is bones and collagen for body; broth is meat and seasoning, drinkable as is'],
          ['What compound is responsible for umami?', 'Glutamate'],
          ['What does a Michelin green star recognise?', 'Sustainability, rather than cooking'],
          ['What does omakase leave to the chef?', 'Everything — you eat what they decide to serve']
        ]
      },
      {
        name: 'a Gym Bro',
        questions: [
          ['What is progressive overload?', 'Gradually increasing demand so the body is forced to adapt'],
          ['What rep ranges suit hypertrophy versus pure strength?', 'Roughly 6 to 12 for hypertrophy; 1 to 5 heavier for strength'],
          ['What does creatine actually do?', 'Regenerates ATP, improving short bursts of high-intensity output'],
          ['What is time under tension?', 'The total time the muscle is loaded during a set'],
          ['What is a drop set?', 'Going to failure, cutting the weight and immediately continuing'],
          ['What does RPE mean to a lifter?', 'Rate of Perceived Exertion — how many reps you left in the tank'],
          ['What is a deload week for?', 'A planned lighter week so you recover and come back stronger'],
          ['Why do people take protein spread across the day rather than in one hit?', 'Muscle protein synthesis responds better to repeated doses than one large one']
        ]
      },
      {
        name: 'a Gamer',
        questions: [
          ['What is frame pacing, as opposed to frame rate?', 'How consistent the gap between frames is — uneven pacing feels bad even at a high average'],
          ['What is input lag?', 'The delay between a control input and the response on screen'],
          ['What is server tick rate?', 'How many times per second the server updates game state'],
          ['What is a "soulslike"?', 'A punishing, stamina-managed action RPG in the Dark Souls mould'],
          ['What is rubber-banding in a racing game?', 'AI speed adjusting to keep the race artificially close'],
          ['What does "crunch" mean in the games industry?', 'Sustained mandatory overtime before a release'],
          ['What is a battle pass?', 'A tiered seasonal reward track you progress through or pay to skip'],
          ['What does RNG stand for?', 'Random number generation — the luck element']
        ]
      },
      {
        name: 'a Swiftie',
        questions: [
          ['Why did Taylor Swift re-record her albums?', 'To own her masters, after the originals were sold without her'],
          ['Which was the first "Taylor\'s Version" released?', "Fearless (Taylor's Version)"],
          ['What is a "vault track"?', 'A song written during the original era but never released, added to the re-recording'],
          ['Which album marked the full move from country to pop?', '1989'],
          ['What is the significance of the number 13 to Swift?', 'Her lucky number — her birthday, and a running motif throughout her career'],
          ['What does "era" mean to a Swiftie?', "An album's entire aesthetic, sound and period"],
          ['How was the Eras Tour set structured?', 'In segments, one per album era'],
          ['What made the 10-minute "All Too Well" notable?', 'It was the full original version of the fan favourite, finally released']
        ]
      },
      {
        name: 'a Marvel Fan',
        questions: [
          ['Name the six Infinity Stones.', 'Space, Mind, Reality, Power, Time and Soul'],
          ['What is the TVA?', 'The Time Variance Authority'],
          ['What is the Sacred Timeline?', 'The single permitted timeline the TVA polices'],
          ['What is the in-universe name for the snap?', 'The Blip — also called the Decimation'],
          ['What is the difference between vibranium and adamantium?', 'Vibranium is Wakandan and absorbs energy; adamantium is the indestructible alloy bonded to Wolverine'],
          ['Who is Kang?', 'A time-travelling conqueror who exists as countless variants'],
          ['Which two artists co-created most of the core Marvel roster with Stan Lee?', 'Jack Kirby and Steve Ditko'],
          ['What is "Phase Four"?', 'The post-Endgame slate of MCU films and series']
        ]
      },
      {
        name: 'a True Crime Fan',
        questions: [
          ['What is the difference between modus operandi and signature?', 'MO is how the crime gets done; signature is the psychological need being satisfied'],
          ['What is linkage blindness?', 'Failing to connect related crimes across different jurisdictions'],
          ['What is the "CSI effect"?', 'Juries expecting a forensic certainty that real casework rarely delivers'],
          ['What is the Reid technique?', 'A confrontational interrogation method widely criticised for producing false confessions'],
          ['What separates a serial killer from a spree killer?', 'A serial killer has a cooling-off period between offences; a spree killer does not'],
          ['What is touch DNA?', 'Trace DNA left behind by skin cells on contact'],
          ['What is victimology in an investigation?', 'Studying the victim to understand why they in particular were chosen'],
          ['Why do innocent people confess?', 'Coercive interrogation, exhaustion, and believing they can sort it out later']
        ]
      },
      {
        name: 'a Wine Person',
        questions: [
          ['What is malolactic fermentation?', 'Converting sharp malic acid into softer lactic acid — the buttery note in Chardonnay'],
          ['What does "corked" actually mean?', 'TCA contamination — a wet cardboard smell, nothing to do with bits of cork'],
          ['What is the traditional method in sparkling wine?', 'The second fermentation happening inside the bottle'],
          ['What is Pinotage a cross of?', 'Pinot Noir and Cinsaut'],
          ['What is the difference between Brut and Extra Brut?', 'Brut is under 12g/l residual sugar; Extra Brut is under 6'],
          ['What does terroir actually cover?', 'Soil, climate, aspect and local practice — everything of place that shapes the wine'],
          ['What do "legs" on the glass indicate?', 'Alcohol and sugar content — not quality'],
          ['Which South African region is most associated with Chenin Blanc?', 'The Western Cape — Stellenbosch and Swartland in particular']
        ]
      },
      {
        name: 'a Car Guy',
        questions: [
          ['What is the difference between torque and horsepower?', 'Torque is rotational force; power is torque times engine speed — how fast the work gets done'],
          ['Where does turbo lag come from?', 'Waiting for exhaust flow to spin the turbine up'],
          ['How does a supercharger differ from a turbocharger?', 'A supercharger is driven by the engine itself; a turbo is driven by exhaust gas'],
          ['What is a limited-slip differential for?', 'Sending torque to the wheel with grip instead of the one spinning'],
          ['What is the difference between understeer and oversteer?', 'Understeer is the front pushing wide; oversteer is the rear stepping out'],
          ['What does "naturally aspirated" mean?', 'No forced induction — no turbo or supercharger'],
          ['What does a dual-clutch gearbox do that a torque converter does not?', 'Pre-selects the next gear on a second clutch, so shifts are near-instant'],
          ['What is double-declutching for?', 'Matching gearbox speeds in a transmission without synchromesh']
        ]
      }
    ]
  },
  {
    section: 'Life Stages & Roles',
    categories: [
      {
        name: 'a Parent',
        questions: [
          ['What is the "fourth trimester"?', 'The first three months after birth'],
          ['When is the notorious sleep regression?', 'Around four months'],
          ['What is parallel play?', 'Toddlers playing alongside each other rather than with each other'],
          ['What is the "witching hour"?', 'The evening stretch of inconsolable newborn crying'],
          ['When does object permanence develop?', 'From around eight months — which is also when separation anxiety starts'],
          ['What is the recommended sleep position for an infant?', 'On the back, every single sleep'],
          ['What does gentle parenting actually require?', 'Holding a firm limit while validating the feeling behind the behaviour'],
          ['What is responsive feeding?', "Feeding to the baby's cues rather than to a fixed schedule"]
        ]
      },
      {
        name: 'Married',
        questions: [
          ['What does "in community of property" mean in South Africa?', 'The default regime — a single joint estate, and shared debts'],
          ['What is an antenuptial contract?', 'A contract signed before the wedding excluding community of property'],
          ['What is the accrual system?', 'Sharing the growth of each estate during the marriage, but not what each brought in'],
          ['What is a customary marriage, legally?', 'A marriage under customary law — legally recognised and registerable'],
          ['What is spousal privilege?', 'A spouse generally cannot be compelled to testify against the other'],
          ['What is the difference between a divorce and an annulment?', 'A divorce ends a valid marriage; an annulment declares there never was one'],
          ['What is maintenance?', 'Court-ordered financial support after a separation'],
          ['What ratio of positive to negative interactions did Gottman find in stable couples?', 'About five to one']
        ]
      },
      {
        name: 'Someone in Their 20s',
        questions: [
          ['What is lifestyle creep?', 'Spending rising to swallow every raise'],
          ['How much should an emergency fund cover?', 'Three to six months of expenses'],
          ['What is the single most important variable in compound interest?', 'Time — starting early beats contributing more later'],
          ['What is a TFSA in South Africa?', 'A tax-free savings account, with annual and lifetime contribution limits'],
          ['What is quiet quitting?', 'Doing your job exactly as described and nothing beyond it'],
          ['What quietly damages a credit record most often?', 'Missed payments on small accounts — store cards and phone contracts'],
          ['What is a situationship?', 'A romantic arrangement nobody will define'],
          ['What does "pay yourself first" mean?', 'Moving savings off the top on payday, before you spend anything']
        ]
      },
      {
        name: 'a University Student',
        questions: [
          ['What mark is usually a distinction at a South African university?', '75% and above'],
          ['What is NSFAS?', "South Africa's National Student Financial Aid Scheme"],
          ['What is academic exclusion?', 'Being barred from re-registering after repeated failure'],
          ['What is the difference between a dissertation and a thesis in South African usage?', "A dissertation is master's level; a thesis is doctoral"],
          ['What is a "credit" in a degree structure?', 'A unit of notional learning hours attached to a module'],
          ['What software do most universities run submissions through?', 'Turnitin'],
          ['What is a supplementary exam?', 'A second attempt, usually offered for marks just below the pass'],
          ['What does cum laude signify?', 'With distinction — an honours designation carried on the degree itself']
        ]
      },
      {
        name: 'Retired',
        questions: [
          ['What is the difference between a living annuity and a life annuity?', 'A living annuity stays invested and you draw from it; a life annuity buys guaranteed income for life'],
          ['What is the "two-pot" retirement system?', 'Splitting contributions into a savings pot you can access and a retirement pot that stays preserved'],
          ['What is the 4% rule?', 'Drawing roughly 4% a year so the capital is likely to outlast you'],
          ['What is longevity risk?', 'Outliving your money'],
          ['What is sequence of returns risk?', 'Poor market returns early in retirement doing damage you never recover from'],
          ['What is the SASSA older persons grant?', 'The South African state old-age grant'],
          ['What happens to a living annuity when you die?', 'The remaining capital passes to your nominated beneficiaries'],
          ['Why is inflation the retiree\'s real enemy?', 'A fixed income loses purchasing power every year it does not grow']
        ]
      }
    ]
  },
  {
    section: 'Skills & Knowledge Domains',
    categories: [
      {
        name: 'Book Smart',
        questions: [
          ['What is an unreliable narrator?', 'A narrator whose account the reader cannot trust'],
          ['What does "in medias res" mean?', 'Starting the story in the middle of the action'],
          ['What is the difference between denotation and connotation?', 'Denotation is the literal meaning; connotation is everything it drags along with it'],
          ['What does "begging the question" properly mean?', 'Assuming the conclusion inside the premise'],
          ['What is a syllogism?', 'A deductive argument built from two premises and a conclusion'],
          ['What is the difference between deduction and induction?', 'Deduction goes from a general rule to a specific case; induction generalises from specific cases'],
          ['What is the Socratic method?', 'Teaching by relentless questioning rather than by telling'],
          ['What is a red herring, in an argument?', 'A deliberate distraction from the actual issue']
        ]
      },
      {
        name: 'Street Smart',
        questions: [
          ['What is a SIM swap fraud?', 'Taking over your phone number so they receive your banking OTPs'],
          ['What is smishing?', 'Phishing carried out over SMS'],
          ['What is social engineering?', 'Manipulating people rather than systems to get access'],
          ['What is card skimming, and what do you do about it?', 'Cloning your card at the machine — freeze the card, dispute the transactions, have it reissued'],
          ['What is the clearest sign of a fake marketplace seller?', 'Pushing you off the platform to pay directly'],
          ['What is tailgating, in building security?', 'Following someone through a controlled door without badging in yourself'],
          ['What is the safest response to being mugged?', 'Hand it over — property is replaceable'],
          ['What is a "pigeon drop"?', 'A con where the mark puts up their own money to share in found cash that never existed']
        ]
      },
      {
        name: 'a History Buff',
        questions: [
          ['What directly triggered the First World War?', 'The assassination of Archduke Franz Ferdinand in Sarajevo in 1914'],
          ['What did the Treaty of Versailles impose on Germany?', 'Reparations, territorial losses and formal war guilt'],
          ['What was the Berlin Conference of 1884–85?', 'Where the European powers carved up Africa between themselves'],
          ['What was the Marshall Plan?', 'American aid to rebuild Western Europe after the Second World War'],
          ['What was Sykes-Picot?', 'A secret Anglo-French agreement to divide Ottoman territory'],
          ['What was the Mfecane?', 'A period of widespread war and migration across southern Africa in the early 1800s'],
          ['What conventionally marks the end of the Western Roman Empire?', 'The deposition of Romulus Augustulus in 476'],
          ['What happened at the Cape in 1652?', 'Jan van Riebeeck landed and established a Dutch supply station']
        ]
      },
      {
        name: 'Good at Geography',
        questions: [
          ['Which two countries border the most others?', 'China and Russia — fourteen each'],
          ['What is the difference between Holland and the Netherlands?', 'Holland is two provinces of the Netherlands, not the whole country'],
          ['What is the largest landlocked country in the world?', 'Kazakhstan'],
          ['Which line of latitude crosses northern South Africa?', 'The Tropic of Capricorn'],
          ['What is the deepest known point in the ocean?', 'The Challenger Deep, in the Mariana Trench'],
          ['What is the capital of Turkey?', 'Ankara — not Istanbul'],
          ['Which strait separates Africa from Europe?', 'The Strait of Gibraltar'],
          ['Which African country famously resisted colonisation?', 'Ethiopia']
        ]
      },
      {
        name: 'Financially Literate',
        questions: [
          ['What is the difference between a nominal and a real return?', 'Real return is adjusted for inflation — nominal is not'],
          ['What is the repo rate?', 'The rate at which the central bank lends to commercial banks, which sets the cost of borrowing'],
          ['What is the difference between an ETF and a unit trust?', 'An ETF trades on an exchange through the day; a unit trust prices once daily'],
          ['What is a TER?', 'Total Expense Ratio — what a fund costs you each year'],
          ['What triggers capital gains tax?', 'Disposing of an asset at a profit'],
          ['What is dollar-cost averaging?', 'Investing a fixed amount at regular intervals regardless of the price'],
          ['What does "liquidity" mean?', 'How fast an asset converts to cash without losing value'],
          ['What is the rule of 72?', 'Divide 72 by the annual return to estimate the years needed to double your money']
        ]
      },
      {
        name: 'a Science Nerd',
        questions: [
          ['What does the second law of thermodynamics state?', 'The entropy of an isolated system never decreases'],
          ['What does "theory" mean in science, as opposed to everyday speech?', 'A well-tested explanatory framework — not a guess'],
          ['What does CRISPR do?', 'Targeted gene editing, guided to a sequence by RNA'],
          ['What is a mole?', '6.022 × 10²³ particles — Avogadro\'s number'],
          ['What is the difference between fission and fusion?', 'Fission splits heavy nuclei; fusion joins light ones'],
          ['What is a half-life?', 'The time taken for half a quantity of a radioactive isotope to decay'],
          ['What is the job of mRNA?', 'Carrying the instruction from DNA to the ribosome so protein can be built'],
          ['How does the uncertainty principle differ from the observer effect?', 'Observer effect: measuring disturbs the system. Uncertainty: a hard limit on knowing both properties at once']
        ]
      }
    ]
  },
  {
    section: 'Wildcard & High-Concept',
    categories: [
      {
        name: 'an AI',
        questions: [
          ['What is a token, to a language model?', 'A chunk of text, roughly a word-piece — the unit it actually predicts'],
          ['What is a context window?', 'How much text the model can take into account at once'],
          ['What does "temperature" control?', 'How much randomness is allowed when sampling the next token'],
          ['What is RAG?', 'Retrieval-augmented generation — fetching documents to ground the answer'],
          ['What is the difference between fine-tuning and prompting?', 'Fine-tuning changes the weights; prompting only changes the input'],
          ['What is an embedding?', 'A numeric vector representing meaning, so similar things sit close together'],
          ['What is a hallucination?', 'Confident output that is not grounded in anything real'],
          ['What is the alignment problem?', "Getting a system's objectives to actually match human intent"]
        ]
      },
      {
        name: 'a Lie Detector',
        questions: [
          ['What does a polygraph actually measure?', 'Arousal — heart rate, respiration and skin conductance. Not lying'],
          ['Why are polygraph results generally inadmissible?', 'They measure stress rather than deception, and produce too many false positives'],
          ['What is the control question technique?', 'Comparing responses to the relevant questions against deliberately troubling control questions'],
          ['What is the biggest myth about liars and eye contact?', 'That liars look away — many deliberately hold more eye contact than usual'],
          ['What is a micro-expression?', 'An involuntary facial expression lasting a fraction of a second'],
          ['What is statement analysis?', 'Examining the exact wording of an account for evasion and distancing'],
          ['What are polygraph "countermeasures"?', 'Deliberate physical or mental acts used to distort the readings'],
          ['How does confirmation bias corrupt an interrogation?', 'Everything the suspect does gets read as confirming the guilt already assumed']
        ]
      },
      {
        name: 'Fluent in Slang',
        questions: [
          ['What does "delulu" mean?', 'Delusional — usually self-aware and said as a joke'],
          ['What does "ate" mean?', 'Performed flawlessly'],
          ['What does "clocked" mean?', 'Noticed, or called out'],
          ['What does "cheugy" describe?', 'Trying too hard with trends that have already passed'],
          ['What does "opp" mean?', 'An enemy or rival'],
          ['What does "glazing" mean?', 'Praising someone far too much'],
          ['What does "the ick" mean?', 'A sudden, irrational turn-off toward someone'],
          ['What does "iykyk" stand for?', 'If you know, you know']
        ]
      },
      {
        name: 'Someone Who Actually Watches the News',
        questions: [
          ['Who sets the repo rate in South Africa?', "The Reserve Bank's Monetary Policy Committee"],
          ['What is the difference between a recession and a depression?', 'A recession is two quarters of contraction; a depression is far deeper and longer, with no fixed definition'],
          ['What is quantitative easing?', 'A central bank buying assets to push money into the economy'],
          ['What does the IPCC do?', 'Assesses and reports the scientific consensus on climate change'],
          ['What is the difference between a ceasefire and an armistice?', 'A ceasefire pauses the fighting; an armistice formally ends it'],
          ['What is a vote of no confidence?', 'A parliamentary motion to remove a sitting leader'],
          ['What is the UN Security Council veto?', 'Any one of the five permanent members can block a resolution outright'],
          ['What is a "caretaker" or interim government?', 'One holding office temporarily, expected not to make major decisions']
        ]
      },
      {
        name: 'an Adult (Basic Life Admin)',
        questions: [
          ['What is an excess on an insurance claim?', 'The portion you pay yourself before cover kicks in'],
          ['What is the difference between a medical aid and a hospital plan?', 'A hospital plan only covers in-hospital costs — day-to-day is on you'],
          ['What is the difference between a debit order and a stop order?', 'A debit order is pulled by the provider; a stop order is pushed by your own bank'],
          ['What is prescribed debt in South Africa?', 'Debt that has become too old to be legally enforced — three years for most'],
          ['What is UIF for?', 'Income support if you lose your job, or during maternity leave'],
          ['What actually goes into a credit score?', 'Payment history, how much credit you use, account age and recent enquiries'],
          ['What happens if you fall behind on a bond?', 'Arrears and penalties, a listing against your credit record, and eventually repossession'],
          ['What is the difference between gross and net pay?', 'Net is what lands in your account after tax and deductions']
        ]
      }
    ]
  },
  {
    section: 'Football Fandom',
    categories: [
      {
        name: 'a Football Fan',
        questions: [
          ['How far back must the wall be at a free kick?', '9.15 metres — ten yards'],
          ['From which three restarts can you never be offside?', 'A throw-in, a goal kick and a corner'],
          ['What is the six-second rule?', 'A goalkeeper may not control the ball in their hands for longer than six seconds'],
          ['What does a back-pass handled by the keeper concede?', 'An indirect free kick inside the penalty area'],
          ['What is the difference between a direct and an indirect free kick?', 'An indirect one must touch another player before a goal can count'],
          ['How many substitutes are allowed in most competitions now, and across how many stoppages?', 'Five, in three windows'],
          ['If a penalty is saved and rebounds to the taker, can they score?', 'Yes in open play — but not in a shootout, where they get one attempt'],
          ['Who restarts play after a dropped ball now?', 'One team only — usually whoever last touched it, with opponents four metres away']
        ]
      },
      {
        name: 'a World Cup Historian',
        questions: [
          ['Which country has appeared at every single World Cup?', 'Brazil'],
          ['What was the Maracanazo?', 'Uruguay beating hosts Brazil in the deciding match of the 1950 World Cup'],
          ['Who is the only man to score a hat-trick in a World Cup final?', 'Geoff Hurst, in 1966'],
          ['Why were there no World Cups in 1942 and 1946?', 'The Second World War'],
          ['Which country stepped in to host the 1986 World Cup after Colombia withdrew?', 'Mexico'],
          ['Who is the youngest scorer in a World Cup final?', 'Pelé, aged 17 in 1958'],
          ['Which country has lost the most World Cup finals?', 'Germany, with four'],
          ['Who did Uruguay beat in the first final, in 1930?', 'Argentina']
        ]
      },
      {
        name: 'a Champions League Obsessive',
        questions: [
          ['What happened to the away goals rule?', 'UEFA abolished it from the 2021-22 season'],
          ['How many clubs are in the league phase under the format introduced in 2024-25?', '36'],
          ['What happens to the teams finishing 9th to 24th in the league phase?', 'They go into a two-legged knockout playoff round'],
          ['Which Dutch club won three European Cups in a row in the early 1970s?', 'Ajax'],
          ['Who has scored the most Champions League goals?', 'Cristiano Ronaldo'],
          ['Which manager has won it a record five times?', 'Carlo Ancelotti'],
          ['What was the half-time score in the 2005 Istanbul final?', 'AC Milan led Liverpool 3-0'],
          ['Which club has won the most European Cups and Champions Leagues?', 'Real Madrid']
        ]
      },
      {
        name: 'a Euros Fanatic',
        questions: [
          ['Which country has won the most European Championships?', 'Spain, with four'],
          ['Which final was decided by a golden goal?', 'Euro 1996 — Germany beat the Czech Republic'],
          ['Which country won Euro 2004 as enormous outsiders?', 'Greece'],
          ['Who scored the winning goal in the Euro 2016 final?', 'Eder'],
          ['Who was Henri Delaunay?', "UEFA's first general secretary, who proposed the tournament"],
          ['What was different about Euro 2020?', 'It had no single host — it was played across eleven cities, and in 2021'],
          ['How many teams contested Euro 2024?', '24'],
          ['Which country won the very first European Championship, in 1960?', 'The Soviet Union']
        ]
      },
      {
        name: 'a Transfer Window Addict',
        questions: [
          ['What is a Bosman transfer?', 'A free move at the end of a contract, after the 1995 Bosman ruling'],
          ['What is a release clause?', 'A pre-agreed fee the selling club must accept if it is triggered'],
          ['What is the world-record transfer fee, and for whom?', 'Neymar to PSG, €222 million in 2017'],
          ['What does it mean to amortise a transfer fee?', 'Spreading it across the length of the contract in the accounts'],
          ['What is a sell-on clause?', 'The selling club takes a share of any future profit on that player'],
          ['What is third-party ownership, and what happened to it?', "Outside investors holding a share of a player's economic rights — FIFA banned it in 2015"],
          ['Which club did Monaco sign Radamel Falcao from in 2013?', 'Atlético Madrid'],
          ['What is a "player-plus-cash" deal usually designed to do?', 'Inflate the book value of both players and ease Financial Fair Play pressure']
        ]
      },
      {
        name: "a Ballon d'Or Buff",
        questions: [
          ['Who is the only goalkeeper ever to win it?', 'Lev Yashin, in 1963'],
          ['Who is the most recent Brazilian winner?', 'Kaká, in 2007'],
          ['Who was the first African winner?', 'George Weah, in 1995'],
          ['Who was eligible to win it before 1995?', 'Only European players'],
          ['What happened to the award between 2010 and 2015?', "It merged with FIFA's award as the FIFA Ballon d'Or"],
          ['Who has won the most?', 'Lionel Messi'],
          ['Which publication runs it?', 'France Football'],
          ['Who won it in 2014, the year Germany won the World Cup?', 'Cristiano Ronaldo']
        ]
      },
      {
        name: 'an El Clásico Fanatic',
        questions: [
          ['Why was the Luís Figo transfer so incendiary?', 'He left Barcelona for Real Madrid in 2000 after being a fan favourite'],
          ['What was thrown at Figo from the Camp Nou stands on his return?', "A pig's head"],
          ['What was the "Manita"?', "Barcelona's 5-0 win over Real Madrid in 2010 — the little hand, five fingers"],
          ['Who has scored the most Clásico goals?', 'Lionel Messi'],
          ["What is Barcelona's youth academy called?", 'La Masia'],
          ["What is Real Madrid's academy called?", 'La Fábrica'],
          ['What does "Més que un club" mean?', '"More than a club" — Barcelona\'s motto'],
          ['How many Clásicos were played in 18 days in 2011?', 'Four, across three different competitions']
        ]
      },
      {
        name: 'a Golden Boot Chaser',
        questions: [
          ['Who holds the record for goals at a single World Cup?', 'Just Fontaine, with 13 in 1958'],
          ['Who is the all-time top scorer at World Cups?', 'Miroslav Klose, with 16'],
          ['How is the European Golden Shoe weighted?', 'Goals are multiplied by a coefficient reflecting the strength of the league'],
          ['Who scored 91 goals in a single calendar year?', 'Lionel Messi, in 2012'],
          ['What is the Premier League single-season goal record?', '36, by Erling Haaland in 2022-23'],
          ['Who is the all-time Premier League top scorer?', 'Alan Shearer, with 260'],
          ['What is the difference between the Golden Ball and the Golden Boot?', 'The Ball goes to the best player; the Boot to the top scorer'],
          ['Who won the Golden Boot at the 2022 World Cup?', 'Kylian Mbappé']
        ]
      },
      {
        name: 'a Tactics Nerd',
        questions: [
          ['What is a "false 9"?', 'A centre-forward who drops deep, dragging centre-backs out of position'],
          ['What is gegenpressing?', 'Counter-pressing — swarming to win the ball back in the seconds after losing it'],
          ['What is a "regista"?', 'A deep-lying playmaker who sets the tempo from in front of the defence'],
          ['What is an inverted fullback?', 'A fullback who steps into central midfield when the team has the ball'],
          ['What is "rest defence"?', 'How a team positions itself to stop the counter-attack while still attacking'],
          ['What is the "half-space"?', 'The vertical channel between the centre of the pitch and the wing'],
          ['What is a "box midfield"?', 'Two deep and two advanced central midfielders forming a square'],
          ['What does "overload to isolate" mean?', 'Packing one side of the pitch to create a one-v-one on the far side']
        ]
      },
      {
        name: 'a Football Manager (Game) Player',
        questions: [
          ['What is the difference between current ability and potential ability?', 'CA is how good a player is now; PA is the ceiling they can reach'],
          ['What is a "regen"?', 'A newly generated player, created once the real-world database is exhausted'],
          ['What does PPM stand for?', 'Player Preferred Moves'],
          ['Which hidden attribute most influences how a young player develops?', 'Determination'],
          ['What does the tactical familiarity bar show?', 'How well the squad has drilled the tactic you are asking them to play'],
          ['What is a "wonderkid"?', 'A young player flagged with exceptionally high potential ability'],
          ['Which studio develops Football Manager?', 'Sports Interactive'],
          ['What was the series called before 2004?', 'Championship Manager']
        ]
      },
      {
        name: "a Women's Football Fan",
        questions: [
          ["Who did Spain beat in the 2023 Women's World Cup final?", 'England'],
          ["Which country has won the most Women's World Cups?", 'The United States, with four'],
          ["Who is the all-time leading scorer at Women's World Cups?", 'Marta'],
          ["Which club has won the most Women's Champions Leagues?", 'Lyon'],
          ['What was the 2019 USWNT legal action about?', 'Suing US Soccer over unequal pay and conditions compared with the men'],
          ['Which Norwegian boycotted a World Cup over her federation\'s treatment of women\'s football?', 'Ada Hegerberg'],
          ["Which country won the 2022 Women's Euros, and where?", 'England, on home soil'],
          ['What does NWSL stand for?', "The National Women's Soccer League"]
        ]
      },
      {
        name: 'an African Football Fan',
        questions: [
          ['Which country has won the most AFCON titles?', 'Egypt, with seven'],
          ['Which country won three AFCONs in a row?', 'Egypt, in 2006, 2008 and 2010'],
          ['Which African side was the first to reach a World Cup quarter-final?', 'Cameroon, in 1990'],
          ['Which African nation reached the World Cup semi-finals in 2022?', 'Morocco'],
          ['Which South African club won the CAF Champions League in 2016?', 'Mamelodi Sundowns'],
          ['Which country won AFCON on home soil in 1996?', 'South Africa'],
          ['What is the Soweto Derby?', 'Kaizer Chiefs against Orlando Pirates'],
          ['Which Liberian went on to become his country\'s president?', 'George Weah']
        ]
      },
      {
        name: 'a Football Kit Nerd',
        questions: [
          ['What does a star above a crest usually mean?', 'A World Cup win — or a set number of league titles, depending on the country'],
          ['How many stars sit above Brazil\'s crest?', 'Five'],
          ['Why did the 2017 Juventus crest redesign cause uproar?', 'It dropped the traditional shield for a minimal "J"'],
          ['What was unusual about Cruyff\'s Netherlands shirt at the 1974 World Cup?', "It had two stripes, not Adidas' three, because of his rival boot deal"],
          ['Why must goalkeepers wear a different colour?', 'The Laws require them to be distinguishable from both teams and the officials'],
          ['What does a gold badge on a Premier League sleeve signify?', 'The reigning champions'],
          ['What is a "clash kit" for?', 'Avoiding a colour clash with the opposition'],
          ['What is a third kit?', "An alternative strip beyond a club's home and away kits"]
        ]
      },
      {
        name: 'a VAR & Referee Rules Nerd',
        questions: [
          ['Which four decisions can VAR review?', 'Goals, penalties, direct red cards and mistaken identity'],
          ['What threshold must be met before VAR intervenes?', 'A clear and obvious error'],
          ['What is the difference between an on-field review and a factual check?', 'A review sends the referee to the monitor; a factual call like offside is decided upstairs'],
          ['What is semi-automated offside?', 'Limb-tracking that constructs the offside line automatically'],
          ['When does handball become an offence automatically?', 'When the arm is in an unnaturally enlarged position, or the contact is deliberate'],
          ['What is "advantage"?', 'Letting play continue because stopping it would reward the team that fouled'],
          ['What restart follows a goalkeeper holding the ball too long?', 'An indirect free kick'],
          ['Why can a referee not rescind a second yellow card via VAR?', 'VAR only reviews direct red cards, not two-yellow dismissals']
        ]
      }
    ]
  },
  {
    section: 'Sports Fandom',
    categories: [
      {
        name: 'a Tennis Fan',
        questions: [
          ['How does a standard tiebreak work?', 'First to seven points at 6-6, and you must win by two'],
          ['What is the final-set format at Wimbledon now?', 'A 10-point tiebreak at six games all'],
          ['What is a "let" on serve?', 'The serve clips the net but lands in — it is replayed, with no penalty'],
          ['What is a "bagel"?', 'Winning a set 6-0'],
          ['What happens if you foot-fault on a second serve?', 'It is a double fault — you lose the point'],
          ['What is "deuce"?', 'Forty all — and you must then win two points in a row'],
          ['Who has won the most Grand Slam singles titles in the men\'s game?', 'Novak Djokovic'],
          ['What is a "break back point"?', 'A chance to recover a break of serve you have just lost']
        ]
      },
      {
        name: 'a Grand Slam Historian',
        questions: [
          ['What is a Calendar Grand Slam?', 'Winning all four majors within the same calendar year'],
          ['Who was the last man to do it?', 'Rod Laver, in 1969'],
          ['What is a Golden Slam?', 'All four majors plus Olympic gold in a single year'],
          ['Who is the only player to achieve a Golden Slam?', 'Steffi Graf, in 1988'],
          ['Who holds the Open Era record for women\'s singles majors?', 'Serena Williams, with 23'],
          ['Who holds the all-time women\'s record?', 'Margaret Court, with 24'],
          ['What surface did the Australian Open switch to in 1988?', 'Hard court, from grass'],
          ['Which major was played on grass until 1974?', 'The US Open']
        ]
      },
      {
        name: 'a Wimbledon Regular',
        questions: [
          ['What is the one recent exception to the all-white rule?', 'Women have been allowed dark undershorts since 2023'],
          ['What happened to Middle Sunday?', 'The traditional rest day ended — it has been a full play day since 2022'],
          ['What is Henman Hill officially called?', 'Aorangi Terrace'],
          ['Which grass is Centre Court sown with?', '100% perennial ryegrass'],
          ['Which two courts have retractable roofs?', 'Centre Court and No.1 Court'],
          ['What does the champion actually take home?', 'A replica — the original trophy stays at the All England Club'],
          ['What is "The Queue"?', 'The formal overnight queueing system, with numbered queue cards'],
          ['Why is the tournament played in whites at all?', 'A Victorian convention to hide sweat stains, never since dropped']
        ]
      },
      {
        name: 'a Tennis Rules Nerd',
        questions: [
          ['What happens if the ball strikes you, even outside the lines?', 'You lose the point'],
          ['Can you reach over the net to play a ball?', 'Only if the ball has already bounced back over to the other side on its own'],
          ['What is a "hindrance"?', 'Distracting your opponent — it can cost you the point'],
          ['How long is the shot clock between points?', '25 seconds'],
          ['What is a foot fault?', 'Touching the baseline or inside the court before striking the serve'],
          ['If a serve hits the receiver before bouncing, who wins the point?', 'The server'],
          ['How many challenges does a player traditionally get per set?', 'Three, plus an extra one in a tiebreak'],
          ['What is the penalty progression for a code violation?', 'Warning, then point penalty, then game penalty, then default']
        ]
      },
      {
        name: 'a Tennis Tour Nerd',
        questions: [
          ['What are the ATP tiers below the Grand Slams?', 'Masters 1000, then 500, then 250, then Challengers'],
          ['How many players qualify for the year-end Finals?', 'Eight'],
          ['How are ranking points calculated?', 'A rolling 52-week total from a set number of best results'],
          ['What does a protected ranking do?', 'Lets a player returning from long-term injury enter events on their old ranking'],
          ['What is a "lucky loser"?', 'A player who lost in qualifying but gets in when someone withdraws'],
          ['What is a wildcard?', 'A tournament-granted entry for a player without direct qualification'],
          ['What is the Davis Cup?', "The men's international team competition"],
          ['What is the Billie Jean King Cup?', "The women's equivalent of the Davis Cup"]
        ]
      },
      {
        name: 'a Cricket Fan',
        questions: [
          ['How many ways can a batter be dismissed?', 'Ten'],
          ['What three things must be true for an LBW?', 'It pitched in line or outside off, struck the pad in line, and would have gone on to hit the stumps'],
          ['What is the difference between a no-ball and a wide?', 'A no-ball is an illegal delivery; a wide is simply out of the batter\'s reach'],
          ['How can you be out on a free hit?', 'Only run out — you cannot be bowled or caught'],
          ['What is the follow-on margin in a Test?', 'A first-innings deficit of 200 runs'],
          ['What is Duckworth-Lewis-Stern for?', 'Resetting targets in rain-affected limited-overs matches'],
          ['What is the difference between a googly and a doosra?', "A googly is a leg-spinner's wrong'un; a doosra is an off-spinner's"],
          ['What is a maiden over?', 'Six balls from which no runs are scored']
        ]
      },
      {
        name: 'a Cricket World Cup Historian',
        questions: [
          ['How was the 2019 final actually decided?', 'A tied Super Over — England won on boundary count'],
          ['What has changed about that rule since?', 'Super Overs are now repeated until there is a winner'],
          ['Which country has won the most Cricket World Cups?', 'Australia'],
          ['Which country won the first, in 1975?', 'The West Indies'],
          ['What was historic about India\'s 2011 win?', 'They were the first side to win a World Cup final on home soil'],
          ['Who won the 2023 World Cup, and where?', 'Australia, in India'],
          ['Which side broke the West Indies\' grip on the trophy in 1983?', 'India'],
          ['How often is the tournament held?', 'Every four years']
        ]
      },
      {
        name: 'a Cricket Terminology Nerd',
        questions: [
          ['What is the "corridor of uncertainty"?', 'The line just outside off stump where the batter cannot decide whether to play or leave'],
          ['What is reverse swing?', 'Late swing the opposite way, from an old ball bowled at pace'],
          ['What is a yorker?', "A full delivery aimed at the base of the stumps or the batter's toes"],
          ['What is "silly point"?', 'A close catching position very near the bat on the off side'],
          ['What is a golden duck?', 'Out first ball without scoring'],
          ['What is a nightwatchman?', 'A lower-order batter sent in late in the day to shield a specialist'],
          ['What is a declaration?', 'A captain voluntarily closing their own innings'],
          ['What is "the nurdle"?', 'Gently working the ball into a gap for a single']
        ]
      },
      {
        name: 'a Test Cricket Purist',
        questions: [
          ['How many overs must be bowled in a full day?', '90'],
          ['After how many overs is a new ball available?', '80'],
          ['What is the highest individual Test score?', '400 not out, by Brian Lara'],
          ['Who has taken the most Test wickets?', 'Muttiah Muralitharan, with 800'],
          ['What is the World Test Championship?', 'A two-year league cycle that culminates in a one-off final'],
          ['What does the Ashes urn supposedly contain?', 'The ashes of a burnt bail'],
          ['What is a "timeless Test"?', 'A Test played to a finish with no day limit — the last was in 1939'],
          ['What is the follow-on threshold?', 'A first-innings deficit of 200 runs']
        ]
      },
      {
        name: 'an IPL / T20 Nerd',
        questions: [
          ['How many fielders may be outside the circle during the T20 Powerplay?', 'Two'],
          ['And after the Powerplay?', 'Five'],
          ['How long is the T20 Powerplay?', 'Six overs'],
          ['What is the IPL impact player rule?', 'A substitute who can be brought on to bat or bowl mid-match'],
          ['What is the maximum any one bowler may bowl in a T20?', 'Four overs'],
          ['What is a Super Over?', 'A single over each, used to break a tie'],
          ['What is "the death"?', 'The closing overs of an innings, where scoring peaks'],
          ['What does a batting strike rate measure in T20?', 'Runs scored per 100 balls faced']
        ]
      },
      {
        name: 'a Rugby Fan',
        questions: [
          ['How many points is a try, conversion, penalty and drop goal?', 'Five, two, three and three'],
          ['What must a tackler do immediately after the tackle?', 'Release the player and roll away'],
          ['Where is the offside line at a ruck?', 'The hindmost foot of the last player bound in'],
          ['What is a "jackal"?', 'A player contesting for the ball over a tackled opponent'],
          ['What is the difference between a ruck and a maul?', 'In a maul the ball carrier is still on their feet; a ruck is contested on the ground'],
          ['What is the difference between a knock-on and a forward pass?', 'A knock-on goes forward off the hand or arm; a forward pass is thrown forward'],
          ['What is the 20-minute red card?', 'A sent-off player can be replaced after 20 minutes, used in some competitions'],
          ['Why kick for the corner instead of at goal?', 'To set up a driving maul from the lineout and go for seven points']
        ]
      },
      {
        name: 'a Rugby World Cup Historian',
        questions: [
          ['Which country has won the most Rugby World Cups?', 'South Africa, with four'],
          ['In which years did the Springboks win it?', '1995, 2007, 2019 and 2023'],
          ['What was extraordinary about their 2023 knockout run?', 'They won all three knockout matches by a single point'],
          ['Who captained the 1995 side?', 'Francois Pienaar'],
          ['Who became the first black Springbok captain to lift it?', 'Siya Kolisi, in 2019'],
          ['Which country won the first tournament, in 1987?', 'New Zealand'],
          ['Which northern hemisphere side has won it?', 'England, in 2003'],
          ['What is the trophy called?', 'The Webb Ellis Cup']
        ]
      },
      {
        name: 'a Six Nations Follower',
        questions: [
          ['What is a Grand Slam?', 'Winning all five of your matches in a single championship'],
          ['What is the Triple Crown?', 'One home nation beating the other three'],
          ['What is the wooden spoon?', 'Finishing last in the table'],
          ['Which trophy do England and Scotland contest?', 'The Calcutta Cup'],
          ['When did Italy join, making it six?', '2000'],
          ['How do bonus points work?', 'One for four tries, one for losing by seven or fewer, and three extra for a Grand Slam'],
          ['Which tournament is the southern hemisphere equivalent?', 'The Rugby Championship'],
          ['How often do the British & Irish Lions tour?', 'Every four years']
        ]
      },
      {
        name: 'a Rugby Terminology Nerd',
        questions: [
          ['What is a "pod" in attacking shape?', 'A small group of forwards set up together as a carrying unit'],
          ['What is a "garryowen"?', 'A high up-and-under kick, chased to contest in the air'],
          ['What is a "grubber"?', 'A kick rolled along the ground behind the defence'],
          ['What is the difference between the blindside and the openside?', 'The blindside is the narrow side of the pitch; the openside is the wide one'],
          ['What number does the openside flanker usually wear?', 'Seven'],
          ['What is a "crash ball"?', 'A hard, direct carry straight into contact'],
          ['What are scrum penalties most often given for?', 'Collapsing, boring in, or not binding properly'],
          ['What is a crooked feed?', 'Putting the ball into the scrum off-centre, favouring your own hooker']
        ]
      },
      {
        name: 'an Athletics Fan',
        questions: [
          ['What is the penalty for a false start now?', 'Immediate disqualification — there is no warning'],
          ['Why are starting blocks staggered in the outer lanes?', 'The outer lanes run a longer curve, so the stagger equalises the distance'],
          ['What is the maximum legal tailwind for a sprint record?', '2.0 metres per second'],
          ['What is the men\'s 100m world record?', '9.58 seconds, by Usain Bolt'],
          ['How is a combined event like the decathlon actually won?', 'On points scored across every event, not on how many you win'],
          ['How many events are in the decathlon and the heptathlon?', 'Ten over two days, and seven'],
          ['How long is a standard outdoor track, measured in lane one?', '400 metres'],
          ['What is the difference between a personal best and a season\'s best?', 'A lifetime best, versus the fastest you have run this season']
        ]
      },
      {
        name: 'an Olympics Athletics Historian',
        questions: [
          ['Who holds both the men\'s 100m and 200m world records?', 'Usain Bolt'],
          ['Who holds the women\'s 100m and 200m records, set back in 1988?', 'Florence Griffith-Joyner'],
          ['What happened to Ben Johnson in 1988?', 'He was stripped of 100m gold after a failed drug test'],
          ['Who won four golds at the 1936 Berlin Olympics?', 'Jesse Owens'],
          ['What was the 1968 Mexico City medal-stand protest?', 'Tommie Smith and John Carlos raising black-gloved fists'],
          ['Who won the 5000m and 10000m double at two consecutive Olympics?', 'Mo Farah'],
          ['Who first ran a marathon under two hours, and why does it not stand as a record?', 'Eliud Kipchoge — it was a staged event with rotating pacemakers, not a legal race'],
          ['Where were the 2024 Olympics held?', 'Paris']
        ]
      },
      {
        name: 'a Field Events Nerd',
        questions: [
          ['How many attempts do finalists get in the long jump?', 'Six'],
          ['What makes a long jump a foul?', 'Taking off beyond the front edge of the board'],
          ['What is the triple jump sequence?', 'Hop, step, jump — the same foot, then the other, then both'],
          ['What is the Fosbury Flop?', 'Clearing the high jump bar backwards, head first'],
          ['What does a men\'s senior shot weigh?', '7.26 kilograms'],
          ['What happens if you leave the throwing circle from the front?', 'It is a foul'],
          ['What is the "box" in pole vault?', 'The sunken slot at the end of the runway that the pole is planted into'],
          ['How is a shot put measured?', 'From the inner edge of the stop board to the nearest mark made by the shot']
        ]
      },
      {
        name: 'a Distance Running Nerd',
        questions: [
          ['Why is the marathon 42.195 kilometres exactly?', 'The 1908 London course was lengthened so it finished in front of the royal box'],
          ['What is a negative split?', 'Running the second half of the race faster than the first'],
          ['How far is the steeplechase, and what does it include?', '3000 metres, with 28 barriers and seven water jumps'],
          ['What is the difference between VO2 max and lactate threshold?', 'VO2 max is the ceiling on oxygen use; threshold is the pace you can hold before lactate accumulates'],
          ['What is a tempo run?', 'A sustained effort at roughly threshold pace'],
          ['Who ran 2:00:35 in Chicago in 2023?', 'Kelvin Kiptum'],
          ['What is a pacemaker, or rabbit?', 'A runner setting the early pace who usually drops out before the finish'],
          ['How many laps of a track is 10,000m?', '25']
        ]
      },
      {
        name: 'a Golf Fan',
        questions: [
          ['How many clubs may you carry?', 'Fourteen'],
          ['What is the penalty for a lost ball?', 'Stroke and distance — one shot, and you replay from where you hit'],
          ['What is a "shank"?', 'Striking the ball off the hosel, so it fires sideways'],
          ['What is an albatross?', 'Three under par on a single hole'],
          ['What is "the honour"?', 'The right to tee off first, earned by the best score on the previous hole'],
          ['What is a provisional ball?', 'A second ball played in case the first turns out to be lost or out of bounds'],
          ['What is "the turn"?', 'Moving from the ninth hole to the tenth'],
          ['How long may you search for a ball?', 'Three minutes']
        ]
      },
      {
        name: 'a Major Championship Historian',
        questions: [
          ['Who has won the most men\'s majors?', 'Jack Nicklaus, with 18'],
          ['What was the "Tiger Slam"?', 'Holding all four majors at once across 2000 and 2001 — but not within one calendar year'],
          ['Which is the only major played at the same course every year?', 'The Masters, at Augusta National'],
          ['Which is the oldest major?', 'The Open Championship, first played in 1860'],
          ['What does The Open winner receive?', 'The Claret Jug'],
          ['What privilege does a Masters champion get besides the jacket?', 'Choosing the menu at the following year\'s Champions Dinner'],
          ['How many holes is a major?', '72 — and each major breaks a tie differently'],
          ['Who was the youngest player to complete the career Grand Slam?', 'Tiger Woods']
        ]
      },
      {
        name: 'a Ryder Cup Follower',
        questions: [
          ['How many points are needed to win the Ryder Cup?', '14½'],
          ['What happens if it finishes 14-14?', 'The holders retain the trophy'],
          ['What is the difference between foursomes and fourballs?', 'Foursomes is alternate shot with a single ball; in fourballs each player plays their own'],
          ['What are the three formats used across the three days?', 'Foursomes, fourballs and singles'],
          ['When did the Great Britain side become Europe?', '1979'],
          ['What was the "War on the Shore"?', 'The notoriously acrimonious 1991 contest at Kiawah Island'],
          ['What was the "Miracle at Medinah"?', 'Europe overturning a 10-6 final-day deficit in 2012'],
          ['Are the players paid to appear?', 'No — they play unpaid, with the money going to charity']
        ]
      },
      {
        name: 'a Golf Rules & Terms Nerd',
        questions: [
          ['What are your options for an unplayable lie?', 'One penalty stroke, with three relief choices'],
          ['What is the penalty for grounding your club in a bunker?', 'Two strokes in stroke play'],
          ['What is a "gimme"?', 'A short putt conceded by your opponent — only legal in match play'],
          ['What is Stableford scoring?', 'Points awarded per hole against a target score, rather than counting total strokes'],
          ['What is the difference between a penalty area and a bunker?', 'A penalty area is water or marked ground, with different relief options and no ban on grounding the club'],
          ['What is a stimpmeter for?', 'Measuring the speed of a green'],
          ['What is "casual water" now called?', 'Temporary water'],
          ['What is a mulligan?', 'An informal do-over that appears nowhere in the rules']
        ]
      },
      {
        name: 'a Basketball Fan',
        questions: [
          ['How long is the NBA shot clock?', '24 seconds'],
          ['What does it reset to after an offensive rebound?', '14 seconds'],
          ['How long is an NBA quarter?', '12 minutes'],
          ['How far is the NBA three-point line at the top of the arc?', '23 feet 9 inches'],
          ['What is the restricted area arc for?', 'Defenders standing inside it cannot draw a charging foul'],
          ['What is an "and-one"?', 'Being fouled while scoring, and getting a free throw on top'],
          ['What is a triple-double?', 'Double figures in three statistical categories in the same game'],
          ['What is "the paint"?', 'The key — the rectangle directly under the basket']
        ]
      },
      {
        name: 'an NBA Historian',
        questions: [
          ['Who scored 100 points in a single game?', 'Wilt Chamberlain, in 1962'],
          ['Who holds the all-time regular-season scoring record?', 'LeBron James'],
          ['Which team has won the most championships?', 'The Boston Celtics'],
          ['What was the "Dream Team"?', 'The 1992 US Olympic side — the first to include NBA professionals'],
          ['What was the "Malice at the Palace"?', 'The 2004 brawl between Pacers players and Pistons fans'],
          ['Which franchise drafted Kobe Bryant before trading him away?', 'The Charlotte Hornets'],
          ['Who is the Finals MVP award named after?', 'Bill Russell'],
          ['What is the championship trophy called?', "The Larry O'Brien Trophy"]
        ]
      },
      {
        name: 'a Basketball Rules Nerd',
        questions: [
          ['What is goaltending?', 'Interfering with a shot on its downward flight, or while it is on the rim'],
          ['What is the difference between a charge and a block?', 'A charge is the attacker running into a defender who was already set; a block is the defender not being set'],
          ['How many fouls before an NBA player fouls out?', 'Six'],
          ['What is "the bonus"?', 'Once a team passes its foul limit for the quarter, every further foul gives free throws'],
          ['How long do you have to advance the ball past halfway in the NBA?', 'Eight seconds'],
          ['What is a backcourt violation?', 'Taking the ball back over halfway once you have crossed it'],
          ['What is a three-second violation?', 'An attacking player standing in the paint for more than three seconds'],
          ['What is a flagrant foul?', 'Unnecessary or excessive contact, punished more harshly than a common foul']
        ]
      },
      {
        name: 'a March Madness Nerd',
        questions: [
          ['How many teams are in the men\'s bracket?', '68'],
          ['What are the "First Four"?', 'The play-in games that cut the field from 68 to 64'],
          ['How many times has a 16 seed beaten a 1 seed in the men\'s tournament?', 'Twice — UMBC in 2018 and Fairleigh Dickinson in 2023'],
          ['What is a "Cinderella"?', 'A low seed making a surprising deep run'],
          ['What is "bracketology"?', 'Predicting the field and the seeding before Selection Sunday'],
          ['What is "one-and-done"?', 'Leaving for the NBA after a single college season'],
          ['What is the Final Four?', 'The last four teams left standing'],
          ['Which body governs US college sport?', 'The NCAA']
        ]
      },
      {
        name: 'a Boxing Fan',
        questions: [
          ['What is the 10-point must system?', 'The round winner must be given 10, the loser 9 or fewer'],
          ['What does a 10-8 round usually signal?', 'A knockdown, or total one-sided dominance'],
          ['What is the difference between a TKO and a KO?', 'A TKO is stopped by the referee, corner or doctor; a KO is a count-out'],
          ['Which are the four major sanctioning bodies?', 'The WBA, WBC, IBF and WBO'],
          ['What is the difference between a unified and an undisputed champion?', 'Unified holds two or more belts; undisputed holds all four'],
          ['What is a catchweight?', 'An agreed weight that sits outside the standard divisions'],
          ['What is a southpaw?', 'A fighter in the reversed stance, leading with the right hand and foot'],
          ['What is a split decision?', 'A win where the three judges do not all have the same fighter ahead']
        ]
      },
      {
        name: 'a Boxing Historian',
        questions: [
          ['What was the Rumble in the Jungle?', 'Ali beating Foreman in Zaire in 1974'],
          ['What was the Thrilla in Manila?', 'The brutal third Ali-Frazier fight, in 1975'],
          ['What was "rope-a-dope"?', 'Ali absorbing punches on the ropes to drain Foreman before attacking'],
          ['Who retired 49-0?', 'Rocky Marciano'],
          ['Who retired 50-0, one past that mark?', 'Floyd Mayweather Jr'],
          ['What happened in the 1997 Tyson-Holyfield rematch?', 'Tyson bit Holyfield\'s ear and was disqualified'],
          ['In how many weight divisions did Manny Pacquiao win world titles?', 'Eight'],
          ['Who was the youngest heavyweight champion?', 'Mike Tyson, at 20']
        ]
      },
      {
        name: 'an MMA Fan',
        questions: [
          ['How many rounds is a UFC title fight?', 'Five'],
          ['Name three strikes banned under the unified rules.', 'Eye pokes, groin strikes, headbutts and strikes to the back of the head'],
          ['What is a rear-naked choke?', 'A choke applied from behind, with the arm around the neck'],
          ['What is "ground and pound"?', 'Striking from a dominant position on the ground'],
          ['What is sprawling?', 'Throwing your legs back to defend a takedown attempt'],
          ['What is a guillotine?', 'A front headlock choke'],
          ['Who was the first simultaneous two-division UFC champion?', 'Conor McGregor'],
          ['How many rounds is a non-title UFC fight?', 'Three']
        ]
      },
      {
        name: 'a Formula 1 Fan',
        questions: [
          ['When may a driver use DRS?', 'Only within one second of the car ahead, and only in a designated DRS zone'],
          ['What is parc fermé?', 'The period from qualifying to the race when car setup cannot be changed'],
          ['How many points does a race win score?', '25'],
          ['What happened to the fastest-lap bonus point?', 'Scrapped from 2025 — teams were gaming it with late pit stops from outside the top ten'],
          ['What is an "undercut"?', 'Pitting earlier than a rival to gain time on fresh tyres'],
          ['What does a blue flag mean?', 'A faster car is lapping you — let it through'],
          ['Which two drivers share the record of seven world titles?', 'Michael Schumacher and Lewis Hamilton'],
          ['What does "box" mean on team radio?', 'Come into the pit lane this lap']
        ]
      },
      {
        name: 'a Cycling Fan',
        questions: [
          ['What do the yellow, green and polka-dot jerseys signify at the Tour?', 'Overall leader, points leader, and King of the Mountains'],
          ['What is the white jersey for?', 'The best young rider'],
          ['What are the three Grand Tours?', "The Tour de France, the Giro d'Italia and the Vuelta a España"],
          ['What is an "echelon"?', 'A diagonal formation riders form to shelter from a crosswind'],
          ['What is a domestique?', 'A rider whose entire job is to serve the team leader'],
          ['What is the "lanterne rouge"?', 'The rider placed last overall'],
          ['What is the broom wagon?', 'The vehicle following the race to pick up riders who abandon'],
          ['What does it mean to "bonk"?', 'To hit the wall from glycogen depletion']
        ]
      },
      {
        name: 'a Swimming Fan',
        questions: [
          ['What is the stroke order in an individual medley?', 'Butterfly, backstroke, breaststroke, freestyle'],
          ['And in a medley relay?', 'Backstroke, breaststroke, butterfly, freestyle'],
          ['How far may you swim underwater off a wall?', '15 metres'],
          ['What is the false start rule?', 'One false start and you are disqualified — there is no warning'],
          ['How many Olympic golds did Michael Phelps win?', '23'],
          ['Which South African beat Phelps to 200m butterfly gold at London 2012?', 'Chad le Clos'],
          ['Why did so many 2009 world records stand for so long?', 'Polyurethane bodysuits were banned from 2010'],
          ['How long is an Olympic pool?', '50 metres']
        ]
      },
      {
        name: 'a Snooker & Darts Fan',
        questions: [
          ['How do you make a 147?', 'Fifteen reds each followed by a black, then all six colours in order'],
          ['What are the colours worth, in ascending order?', 'Yellow 2, green 3, brown 4, blue 5, pink 6, black 7'],
          ['What is a "free ball"?', 'After a foul snooker, you may nominate any ball as the one on'],
          ['What is a snooker?', 'Leaving your opponent unable to hit the ball on directly'],
          ['What is the highest possible checkout in darts?', '170 — treble 20, treble 20, bullseye'],
          ['What must you finish on in darts?', 'A double, or the bullseye'],
          ['What is a nine-darter?', 'A leg of 501 finished in the minimum nine darts'],
          ['Where is the World Snooker Championship held?', 'The Crucible Theatre in Sheffield']
        ]
      },
      {
        name: 'a Netball Fan',
        questions: [
          ['How long do you have to pass or shoot?', 'Three seconds'],
          ['What is the footwork rule?', 'You may not move your landing foot once you have the ball'],
          ['What is obstruction?', 'Defending closer than three feet — 0.9 metres — from the player with the ball'],
          ['Which two positions may shoot?', 'Goal Shooter and Goal Attack'],
          ['Which position is allowed in every third of the court?', 'Centre'],
          ['How many players per team are on court?', 'Seven'],
          ['How many quarters, and how long is each?', 'Four, of 15 minutes'],
          ['What is South Africa\'s national team called?', 'The Proteas']
        ]
      },
      {
        name: 'a Baseball Fan',
        questions: [
          ['What is the infield fly rule for?', 'Stopping a cheap double play — the batter is automatically out on a catchable infield pop-up with runners on'],
          ['What is an ERA?', 'Earned Run Average — earned runs allowed per nine innings'],
          ['What is a balk?', 'An illegal pitcher movement with runners on base, which advances them'],
          ['What is the difference between a no-hitter and a perfect game?', 'A perfect game allows no baserunners at all — not even a walk'],
          ['What is the designated hitter?', 'A player who bats in place of the pitcher without fielding'],
          ['What does batting average measure?', 'Hits divided by at-bats'],
          ['What is a grand slam?', 'A home run with the bases loaded, scoring four runs'],
          ['Who broke the colour barrier in 1947?', 'Jackie Robinson']
        ]
      }
    ]
  },
  {
    section: 'South African Knowledge Checks',
    categories: [
      {
        name: 'a Bokke Supporter',
        questions: [
          ['How many Rugby World Cups have the Springboks won?', 'Four'],
          ['In which years did South Africa win the Rugby World Cup?', '1995, 2007, 2019, and 2023'],
          ['Who captained the Springboks to the 1995 World Cup title?', 'Francois Pienaar'],
          ['Who became the first Black Springbok captain to lift the World Cup, in 2019?', 'Siya Kolisi'],
          ['Which president famously wore a Springbok jersey at the 1995 final?', 'Nelson Mandela'],
          ['What are the Springboks\' traditional jersey colours?', 'Green and gold'],
          ['Who was Springbok head coach for the 2019 World Cup win?', 'Rassie Erasmus'],
          ['Which team did South Africa beat in the 2019 World Cup final?', 'England']
        ]
      },
      {
        name: 'a Braai Master',
        questions: [
          ['What\'s "boerewors"?', 'A traditional spiced South African sausage, usually cooked in a coil'],
          ['Which public holiday doubles as National Braai Day?', 'Heritage Day, on 24 September'],
          ['What\'s "pap"?', 'A stiff maize-meal porridge, the classic braai side'],
          ['What\'s "chakalaka"?', 'A spicy vegetable relish served with pap or bread'],
          ['What\'s a "potjie"?', 'A three-legged cast-iron pot used to slow-cook stew over coals'],
          ['What\'s a "sosatie"?', 'Marinated meat skewers, often with apricot and curry flavours'],
          ['What\'s a "braai broodjie"?', 'A toasted sandwich grilled over the coals — usually cheese, tomato and onion'],
          ['Why do braai purists insist on wood over briquettes?', 'Wood burns down to coals with more smoke flavour']
        ]
      },
      {
        name: 'a Joburg or Cape Town Local',
        questions: [
          ['What are Johannesburg\'s common nicknames?', 'Joburg, Jozi, or eGoli'],
          ['What does "eGoli" mean?', '"Place of gold"'],
          ['What\'s Cape Town\'s well-known nickname?', 'The Mother City'],
          ['What\'s Johannesburg\'s main international airport called?', 'OR Tambo International'],
          ['What\'s the strong south-easterly wind in Cape Town nicknamed?', 'The Cape Doctor'],
          ['What does "taxi" usually mean in everyday South African usage?', 'A minibus taxi'],
          ['Which Johannesburg township is the most historically famous?', 'Soweto'],
          ['Which island off Cape Town held Nelson Mandela as a prisoner?', 'Robben Island']
        ]
      },
      {
        name: 'Fluent in SA Slang',
        questions: [
          ['What does "howzit" mean?', 'Hello, or how\'s it going'],
          ['What does "lekker" mean?', 'Nice, good, or enjoyable'],
          ['What does "eish" express?', 'Surprise, frustration, or sympathy'],
          ['What does "just now" mean in South Africa?', 'Sometime soon — but definitely not immediately'],
          ['What does "now now" mean?', 'Very soon — sooner than "just now"'],
          ['What\'s a "robot" in South African English?', 'A traffic light'],
          ['What does "sharp sharp" mean?', 'Okay, cool, or goodbye — an all-purpose agreement'],
          ['What\'s a "bakkie"?', 'A pickup truck']
        ]
      }
    ]
  },
  {
    section: 'Music & Entertainment',
    categories: [
      {
        name: 'a Hip-Hop Head',
        questions: [
          ['Which city is widely credited as the birthplace of hip-hop?', 'New York City — specifically the Bronx'],
          ['What are the four traditional elements of hip-hop?', 'MCing, DJing, breakdancing, and graffiti'],
          ['What does "MC" stand for?', 'Master of Ceremonies'],
          ['What\'s a "freestyle"?', 'Improvised rapping, often completely unwritten'],
          ['What\'s a "diss track"?', 'A song attacking a rival artist'],
          ['Which rapper released "The Marshall Mathers LP"?', 'Eminem'],
          ['What\'s "a bar" in rap terms?', 'A single line or measure of lyrics'],
          ['Which two regions defined hip-hop\'s biggest 1990s rivalry?', 'The East Coast and the West Coast']
        ]
      },
      {
        name: 'an Amapiano Fan',
        questions: [
          ['Which country did amapiano originate in?', 'South Africa'],
          ['What does "amapiano" mean in isiZulu?', '"The pianos"'],
          ['What\'s the deep, signature bass sound of amapiano called?', 'The log drum'],
          ['Which two genres is amapiano most directly descended from?', 'Kwaito and deep house'],
          ['In which decade did amapiano break out globally?', 'The 2020s'],
          ['Which South African province is amapiano\'s heartland?', 'Gauteng'],
          ['Which instrument\'s melodies give the genre its name?', 'The piano'],
          ['What\'s "private school" amapiano?', 'A jazzier, more melodic strand of the genre']
        ]
      },
      {
        name: 'a K-Pop Stan',
        questions: [
          ['What does "K-pop" stand for?', 'Korean pop'],
          ['Which K-pop group became the first to top the US Billboard 200?', 'BTS'],
          ['What\'s a "bias" in K-pop fandom?', 'Your favourite member of a group'],
          ['What\'s a "comeback"?', 'A group\'s new release and its promotional cycle'],
          ['What is BTS\'s fandom officially called?', 'ARMY'],
          ['Which girl group broke through globally with "Ddu-Du Ddu-Du"?', 'BLACKPINK'],
          ['What\'s a "lightstick"?', 'An official illuminated fan accessory waved at concerts'],
          ['What\'s a "maknae"?', 'The youngest member of a group']
        ]
      },
      {
        name: 'a Reality TV Addict',
        questions: [
          ['What\'s a "confessional" in reality TV?', 'A to-camera interview where a cast member comments on events'],
          ['Which show sends singles to a villa to couple up?', 'Love Island'],
          ['Which show is the "rose ceremony" from?', 'The Bachelor'],
          ['Which competition show features drag queens competing for a crown?', 'RuPaul\'s Drag Race'],
          ['What does a "reunion" episode usually involve?', 'The cast revisiting the season\'s conflicts face to face'],
          ['Which family\'s show ran for 20 seasons on E!?', 'The Kardashians — Keeping Up with the Kardashians'],
          ['What\'s "manufactured" or producer-driven drama?', 'Conflict encouraged or engineered by the production team'],
          ['Which survival show strands contestants competing through tribal councils?', 'Survivor']
        ]
      },
      {
        name: 'a Film Buff',
        questions: [
          ['What are the Academy Awards more commonly called?', 'The Oscars'],
          ['Which film became the first non-English language winner of Best Picture, in 2020?', 'Parasite'],
          ['What\'s a "director\'s cut"?', 'A version of a film edited to the director\'s preference rather than the studio\'s'],
          ['Who directed "Jaws", "E.T." and "Jurassic Park"?', 'Steven Spielberg'],
          ['What\'s the "fourth wall"?', 'The invisible barrier between the story and the audience'],
          ['What\'s a "MacGuffin"?', 'An object that drives the plot but barely matters in itself'],
          ['Which franchise opens with "A long time ago in a galaxy far, far away"?', 'Star Wars'],
          ['What are "practical effects"?', 'Effects achieved physically on set rather than digitally']
        ]
      }
    ]
  },
  {
    section: 'Tech & Internet',
    categories: [
      {
        name: 'a Crypto Bro',
        questions: [
          ['What was the first cryptocurrency?', 'Bitcoin'],
          ['What name does Bitcoin\'s pseudonymous creator go by?', 'Satoshi Nakamoto'],
          ['What does "HODL" mean?', 'Hold on for dear life — refusing to sell'],
          ['What\'s a "blockchain"?', 'A distributed, append-only ledger of transactions'],
          ['What\'s "DeFi" short for?', 'Decentralised finance'],
          ['What\'s an "NFT"?', 'A non-fungible token — a unique on-chain record of ownership'],
          ['What\'s a crypto "wallet"?', 'Software or hardware holding the keys to your coins'],
          ['What\'s "mining" in Bitcoin terms?', 'Using computing power to validate transactions and earn new coins']
        ]
      },
      {
        name: 'a Startup Founder',
        questions: [
          ['What\'s an "MVP" in startup terms?', 'Minimum Viable Product'],
          ['What\'s a "seed round"?', 'An early funding round, before Series A'],
          ['What\'s "runway"?', 'How long a company can operate before it runs out of money'],
          ['What\'s a "pivot"?', 'Changing a startup\'s core direction or product'],
          ['What\'s "product-market fit"?', 'When a product genuinely satisfies strong market demand'],
          ['What\'s "churn"?', 'The rate at which customers stop using the product'],
          ['What\'s a "term sheet"?', 'A non-binding outline of proposed investment terms'],
          ['What\'s "burn rate"?', 'How fast a company spends its cash each month']
        ]
      },
      {
        name: 'Terminally Online',
        questions: [
          ['What\'s "doomscrolling"?', 'Compulsively reading bad news online'],
          ['What does "touch grass" mean?', 'Go outside — get off the internet'],
          ['What\'s a "ratio" on social media?', 'When replies vastly outnumber likes, signalling a bad take'],
          ['What\'s "subtweeting"?', 'Referring to someone without naming or tagging them'],
          ['What\'s "engagement bait"?', 'Content designed purely to provoke replies and shares'],
          ['What do people mean by "the algorithm"?', 'The recommendation system deciding what you see'],
          ['What\'s a "parasocial" relationship?', 'A one-sided bond a viewer feels with a creator who doesn\'t know them'],
          ['What\'s "lurking"?', 'Reading a community without ever posting']
        ]
      },
      {
        name: 'a Cybersecurity Nerd',
        questions: [
          ['What\'s "phishing"?', 'Tricking someone into handing over credentials with a fake message'],
          ['What does "2FA" stand for?', 'Two-factor authentication'],
          ['What\'s "ransomware"?', 'Malware that encrypts your files and demands payment to release them'],
          ['What\'s a "zero-day"?', 'A vulnerability unknown to the vendor, with no patch available yet'],
          ['What\'s "social engineering"?', 'Manipulating people rather than systems to gain access'],
          ['What does "VPN" stand for?', 'Virtual Private Network'],
          ['What\'s a "firewall"?', 'A system that controls network traffic according to rules'],
          ['What does "encryption at rest" mean?', 'Keeping stored data encrypted, not just data in transit']
        ]
      }
    ]
  },
  {
    section: 'Money & Business',
    categories: [
      {
        name: 'a Stock Market Trader',
        questions: [
          ['What\'s a "bull market"?', 'A sustained period of rising prices'],
          ['What\'s a "bear market"?', 'A sustained fall, usually 20% or more off the high'],
          ['What\'s a "dividend"?', 'A share of company profits paid out to shareholders'],
          ['What does "IPO" stand for?', 'Initial Public Offering'],
          ['What\'s the "JSE"?', 'The Johannesburg Stock Exchange'],
          ['What\'s a "portfolio"?', 'The full collection of investments someone holds'],
          ['What\'s "the S&P 500"?', 'An index tracking 500 large US listed companies'],
          ['What\'s "short selling"?', 'Betting a price will fall, by selling borrowed shares first']
        ]
      },
      {
        name: 'an Entrepreneur',
        questions: [
          ['What\'s "cash flow"?', 'The money actually moving in and out of a business'],
          ['What\'s a "profit margin"?', 'Profit expressed as a percentage of revenue'],
          ['What\'s "overhead"?', 'Ongoing operating costs not tied directly to making a product'],
          ['What\'s the difference between "B2B" and "B2C"?', 'Business-to-business versus business-to-consumer'],
          ['What does "scaling" a business mean?', 'Growing revenue faster than costs'],
          ['What\'s a "value proposition"?', 'The clear reason a customer should choose your product'],
          ['What\'s "bootstrapping"?', 'Funding a business from revenue and personal money rather than investors'],
          ['What\'s "ROI" short for?', 'Return on Investment']
        ]
      },
      {
        name: 'a Real Estate Investor',
        questions: [
          ['What\'s "rental yield"?', 'Annual rent as a percentage of the property\'s value'],
          ['What\'s a "bond" in South African property terms?', 'A home loan — a mortgage'],
          ['What\'s "capital appreciation"?', 'The increase in a property\'s value over time'],
          ['What are "levies" in a sectional title scheme?', 'Monthly fees covering shared maintenance and services'],
          ['What\'s "transfer duty"?', 'A government tax paid when a property changes ownership'],
          ['What\'s "LTV" short for?', 'Loan-to-Value ratio'],
          ['What does "positive cash flow" mean on a rental?', 'The rent exceeds the bond repayment and running costs'],
          ['What\'s "location, location, location" shorthand for?', 'The idea that position drives property value above all else']
        ]
      }
    ]
  },
  {
    section: 'Acronyms',
    categories: [
      {
        name: 'Fluent in Texting Acronyms',
        questions: [
          ['What does "IRL" stand for?', 'In Real Life'],
          ['What does "WDYM" stand for?', 'What Do You Mean'],
          ['What does "TBH" stand for?', 'To Be Honest'],
          ['What does "IMO" stand for?', 'In My Opinion'],
          ['What does "BRB" stand for?', 'Be Right Back'],
          ['What does "IDK" stand for?', "I Don't Know"],
          ['What does "NVM" stand for?', 'Never Mind'],
          ['What does "TTYL" stand for?', 'Talk To You Later']
        ]
      },
      {
        name: 'Fluent in Internet Acronyms',
        questions: [
          ['What does "GOAT" stand for?', 'Greatest Of All Time'],
          ['What does "YOLO" stand for?', 'You Only Live Once'],
          ['What does "TMI" stand for?', 'Too Much Information'],
          ['What does "SMH" stand for?', 'Shaking My Head'],
          ['What does "IYKYK" stand for?', 'If You Know, You Know'],
          ['What does "NGL" stand for?', 'Not Gonna Lie'],
          ['What does "ICYMI" stand for?', 'In Case You Missed It'],
          ['What does "FR" stand for?', 'For Real']
        ]
      },
      {
        name: 'Fluent in Social Media Acronyms',
        questions: [
          ['What does "DM" stand for?', 'Direct Message'],
          ['What does "TL;DR" stand for?', "Too Long; Didn't Read"],
          ['What does "AMA" stand for?', 'Ask Me Anything'],
          ['What does "PFP" stand for?', 'Profile Picture'],
          ['What does "FYP" stand for on TikTok?', 'For You Page'],
          ['What does "GRWM" stand for?', 'Get Ready With Me'],
          ['What does "POV" stand for?', 'Point Of View'],
          ['What does "OOTD" stand for?', 'Outfit Of The Day']
        ]
      },
      {
        name: 'Fluent in Old-School Internet Acronyms',
        questions: [
          ['What does "LOL" stand for?', 'Laugh Out Loud'],
          ['What does "ROFL" stand for?', 'Rolling On the Floor Laughing'],
          ['What does "BFF" stand for?', 'Best Friends Forever'],
          ['What does "OMG" stand for?', 'Oh My God'],
          ['What did "ASL" mean in an old chatroom?', 'Age, Sex, Location'],
          ['What does "IMHO" stand for?', 'In My Humble Opinion'],
          ['What does "FTW" stand for?', 'For The Win'],
          ['What does "JK" stand for?', 'Just Kidding']
        ]
      },
      {
        name: 'Fluent in Work Acronyms',
        questions: [
          ['What does "EOD" stand for?', 'End Of Day'],
          ['What does "OOO" stand for?', 'Out Of Office'],
          ['What does "ASAP" stand for?', 'As Soon As Possible'],
          ['What does "FYI" stand for?', 'For Your Information'],
          ['What does "WFH" stand for?', 'Working From Home'],
          ['What does "EOW" stand for?', 'End Of Week'],
          ['What does "COB" stand for?', 'Close Of Business'],
          ['What does "PTO" stand for?', 'Paid Time Off']
        ]
      },
      {
        name: 'Fluent in Business Acronyms',
        questions: [
          ['What does "CEO" stand for?', 'Chief Executive Officer'],
          ['What does "CFO" stand for?', 'Chief Financial Officer'],
          ['What does "VAT" stand for?', 'Value Added Tax'],
          ['What does "SME" stand for in business?', 'Small and Medium Enterprise'],
          ['What does "P&L" stand for?', 'Profit and Loss'],
          ['What does "CV" stand for?', 'Curriculum Vitae'],
          ['What does "HR" stand for?', 'Human Resources'],
          ['What does "PAYE" stand for?', 'Pay As You Earn']
        ]
      },
      {
        name: 'Fluent in Tech Acronyms',
        questions: [
          ['What does "URL" stand for?', 'Uniform Resource Locator'],
          ['What does "RAM" stand for?', 'Random Access Memory'],
          ['What does "CPU" stand for?', 'Central Processing Unit'],
          ['What does "USB" stand for?', 'Universal Serial Bus'],
          ['What does "PDF" stand for?', 'Portable Document Format'],
          ['What does "GPS" stand for?', 'Global Positioning System'],
          ['What does "OS" stand for?', 'Operating System'],
          ['What does "SSD" stand for?', 'Solid State Drive']
        ]
      },
      {
        name: 'Fluent in Web Acronyms',
        questions: [
          ['What does "HTML" stand for?', 'HyperText Markup Language'],
          ['What does "HTTP" stand for?', 'HyperText Transfer Protocol'],
          ['What does "DNS" stand for?', 'Domain Name System'],
          ['What does "ISP" stand for?', 'Internet Service Provider'],
          ['What does "WWW" stand for?', 'World Wide Web'],
          ['What does "SEO" stand for?', 'Search Engine Optimisation'],
          ['What does "FTP" stand for?', 'File Transfer Protocol'],
          ['What does "IP" stand for in "IP address"?', 'Internet Protocol']
        ]
      },
      {
        name: 'Fluent in Medical Acronyms',
        questions: [
          ['What does "ICU" stand for?', 'Intensive Care Unit'],
          ['What does "CPR" stand for?', 'Cardiopulmonary Resuscitation'],
          ['What does "IV" stand for?', 'Intravenous'],
          ['What does "MRI" stand for?', 'Magnetic Resonance Imaging'],
          ['What does "ECG" stand for?', 'Electrocardiogram'],
          ['What does "CT" stand for in "CT scan"?', 'Computed Tomography'],
          ['What does "BMI" stand for?', 'Body Mass Index'],
          ['What does "DNR" stand for?', 'Do Not Resuscitate']
        ]
      },
      {
        name: 'Fluent in Pharmacy Acronyms',
        questions: [
          ['What does "Rx" stand for on a prescription?', 'The Latin "recipe" — meaning "take"'],
          ['What does "PRN" mean on a prescription?', 'Pro re nata — as needed'],
          ['What does "BD" mean on a prescription?', 'Twice daily'],
          ['What does "TDS" mean on a prescription?', 'Three times daily'],
          ['What does "NOCTE" mean on a prescription?', 'At night'],
          ['What does "STAT" mean on a prescription?', 'Immediately'],
          ['What does "ADR" stand for?', 'Adverse Drug Reaction'],
          ['What does "API" stand for in pharmaceutical manufacturing?', 'Active Pharmaceutical Ingredient']
        ]
      },
      {
        name: 'Fluent in South African Acronyms',
        questions: [
          ['What does "SARS" stand for in South Africa?', 'The South African Revenue Service'],
          ['What does "SASSA" stand for?', 'The South African Social Security Agency'],
          ['What does "SABC" stand for?', 'The South African Broadcasting Corporation'],
          ['What does "SAPS" stand for?', 'The South African Police Service'],
          ['What does "UIF" stand for?', 'The Unemployment Insurance Fund'],
          ['What does "NHI" stand for?', 'National Health Insurance'],
          ['What does "RDP" stand for?', 'The Reconstruction and Development Programme'],
          ['What does "SANDF" stand for?', 'The South African National Defence Force']
        ]
      },
      {
        name: 'Fluent in Gaming Acronyms',
        questions: [
          ['What does "RPG" stand for?', 'Role-Playing Game'],
          ['What does "DLC" stand for?', 'Downloadable Content'],
          ['What does "XP" stand for?', 'Experience Points'],
          ['What does "HP" stand for in a game?', 'Hit Points (health)'],
          ['What does "PvP" stand for?', 'Player versus Player'],
          ['What does "MMORPG" stand for?', 'Massively Multiplayer Online Role-Playing Game'],
          ['What does "GOTY" stand for?', 'Game Of The Year'],
          ['What does "AFK" stand for?', 'Away From Keyboard']
        ]
      },
      {
        name: 'Fluent in Relationship Acronyms',
        questions: [
          ['What does "DTR" stand for?', 'Define The Relationship'],
          ['What does "LDR" stand for?', 'Long Distance Relationship'],
          ['What does "PDA" stand for?', 'Public Display of Affection'],
          ['What does "LTR" stand for?', 'Long Term Relationship'],
          ['What does "SO" stand for?', 'Significant Other'],
          ['What is "bae" commonly said to stand for?', 'Before Anyone Else'],
          ['What does "DINK" stand for?', 'Dual Income, No Kids'],
          ['What does "MIL" stand for?', 'Mother-In-Law']
        ]
      }
    ]
  },
  {
    /**
     * Opinion rounds, not knowledge rounds. The category name is the whole
     * prompt ("Better Than Xabi Alonso?"), each question is just a name, and
     * the answer slot carries that player's receipts — so the beat on camera
     * is gut reaction first, then the honours that either back you up or make
     * you climb down. Right / Close / Wrong read as yes / debatable / no when
     * you mark the recap, and colour the download the same way.
     */
    section: 'Hot Takes',
    categories: [
      {
        name: 'Better Than Xabi Alonso?',
        questions: [
          ['Luka Modrić', "A Ballon d'Or, six Champions Leagues and a World Cup final"],
          ['Andrés Iniesta', 'Scored the World Cup winning goal, plus four Champions Leagues and two Euros'],
          ['Steven Gerrard', 'Istanbul, an FA Cup and a UEFA Cup — and never a league title'],
          ['Paul Scholes', "Eleven league titles and two Champions Leagues — and never a Ballon d'Or"],
          ['Toni Kroos', "Six Champions Leagues and a World Cup — and never a Ballon d'Or either"],
          ['Claude Makélélé', 'A Champions League, titles in three countries, and a position named after him'],
          ["N'Golo Kanté", 'A World Cup, a Champions League, and back-to-back league titles with different clubs'],
          ['Kevin De Bruyne', 'A Treble, and a share of the Premier League single-season assist record']
        ]
      },
      {
        name: 'Better Than Didier Drogba?',
        questions: [
          ['Samuel Eto\'o', 'Three Champions Leagues, four African Player of the Year awards, two trebles'],
          ['Thierry Henry', 'An Invincible season, four Golden Boots, a World Cup and a Champions League'],
          ['Sergio Agüero', "Manchester City's all-time top scorer — and the most famous goal in Premier League history"],
          ['Robert Lewandowski', "Broke the Bundesliga season record, a Treble, and five goals in nine minutes"],
          ['Wayne Rooney', "Manchester United's all-time top scorer, five league titles and a Champions League"],
          ['Luis Suárez', 'Two European Golden Shoes, a Champions League and a treble at Barcelona'],
          ['Zlatan Ibrahimović', 'League titles in four different countries and over 500 career goals'],
          ['Mohamed Salah', 'A Champions League, Premier League titles and a shelf of Golden Boots']
        ]
      },
      {
        name: 'Better Than Iker Casillas?',
        questions: [
          ['Gianluigi Buffon', 'A World Cup and a decade of Serie A titles — and never a Champions League'],
          ['Manuel Neuer', 'A World Cup, two Champions Leagues, and he reinvented what a keeper does'],
          ['Lev Yashin', "The only goalkeeper ever to win the Ballon d'Or"],
          ['Oliver Kahn', 'The only goalkeeper to win the World Cup Golden Ball'],
          ['Peter Schmeichel', "Denmark's Euro 92 shock, and the goal at the other end of the 1999 Treble"],
          ['Edwin van der Sar', 'Champions Leagues with two different clubs, and a record unbeaten run'],
          ['Petr Čech', 'More Premier League clean sheets than anyone in history'],
          ['Thibaut Courtois', 'A Champions League final so good the losing fans applauded him off']
        ]
      }
    ]
  }
];

/**
 * Categories whose name *is* the title card, so `main.js` must not wrap them
 * in "Can You Pass as …". Derived from the section rather than listed by hand,
 * so a new Hot Take needs no second edit.
 */
export const STANDALONE_TITLES = new Set(
  SECTIONS.filter((s) => s.section === 'Hot Takes').flatMap((s) => s.categories.map((c) => c.name))
);

/** Flat name → [question, answer][] lookup, built from SECTIONS. */
export const CATEGORY_BANK = SECTIONS.reduce((bank, { categories }) => {
  for (const { name, questions } of categories) bank[name] = questions;
  return bank;
}, {});

export const CATEGORY_NAMES = Object.keys(CATEGORY_BANK);
