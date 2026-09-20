/**
 * "Can You Pass As..." — 128 identity-check trivia categories, grouped into
 * 15 sections, 8 questions each (1024 total). Sourced from the uploaded
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
          ["What's the name of Manchester City's home stadium?", 'The Etihad Stadium'],
          ['How many goals are in a "brace"?', 'Two'],
          ['What does the position "CDM" stand for?', 'Central Defensive Midfielder'],
          ['In which country would you find the club AZ Alkmaar?', 'The Netherlands'],
          ["Which club did Cristiano Ronaldo start his senior career at?", 'Sporting CP, in Portugal'],
          ['Who is the all-time top goalscorer for the Spanish national team?', 'David Villa'],
          ['Which club did the Bosnian striker Edin Džeko famously play for in the Premier League?', 'Manchester City'],
          ['Which country did Emmanuel Adebayor represent internationally?', 'Togo']
        ]
      },
      {
        name: 'a World Cup Historian',
        questions: [
          ['Which country won the World Cup in 2006?', 'Italy'],
          ['Which team did France beat in the 2018 World Cup final?', 'Croatia, 4-2'],
          ['Which country hosted and won the very first World Cup in 1930?', 'Uruguay'],
          ['Which country has won the most World Cups?', 'Brazil, with five'],
          ["Who scored the infamous \"Hand of God\" goal at the 1986 World Cup?", 'Diego Maradona'],
          ['Which country did West Germany beat in the 1990 World Cup final?', 'Argentina'],
          ['Which country hosted the 2014 World Cup?', 'Brazil'],
          ['Which two countries co-hosted the 2002 World Cup?', 'South Korea and Japan']
        ]
      },
      {
        name: 'a Champions League Obsessive',
        questions: [
          ['Who are the most recent Italian side to win the Champions League title?', 'Inter Milan, in 2010'],
          ['Which goalkeeper did Declan Rice score two free-kick goals against in a 2025 Champions League quarterfinal?', 'Thibaut Courtois'],
          ['Which club has won the most European Cup/Champions League titles?', 'Real Madrid'],
          ['What competition did the Champions League replace in 1992?', 'The European Cup'],
          ['Which English club won the 2019 Champions League in an all-English final against Tottenham?', 'Liverpool'],
          ['What is the Champions League trophy commonly nicknamed?', '"Ol\' Big Ears"'],
          ['Which club did Liverpool beat on penalties in the 2005 "Miracle of Istanbul" final?', 'AC Milan'],
          ['What colour are the famous Champions League anthem branding and starball?', 'Blue and white/silver']
        ]
      },
      {
        name: 'a Euros Fanatic',
        questions: [
          ['Which country did Portugal beat 1-0 in the 2016 Euros final?', 'France'],
          ['Which country won Euro 2020 (played in 2021)?', 'Italy'],
          ['Which country hosted Euro 2024?', 'Germany'],
          ['Which country won Euro 2024?', 'Spain'],
          ['What is the trophy for winning the European Championship called?', 'The Henri Delaunay Trophy'],
          ['How often is the European Championship held?', 'Every four years'],
          ['Which country won the very first European Championship, in 1960?', 'The Soviet Union'],
          ['What is the minimum number of teams in a Euros group-stage group?', 'Four']
        ]
      },
      {
        name: 'a Transfer Window Addict',
        questions: [
          ['In 2013, Monaco signed Radamel Falcao — but from which club?', 'Atletico Madrid'],
          ['Which club does Luka Modrić play for after his 2025 move?', 'AC Milan'],
          ['Which club sold Neymar to PSG for a world-record fee in 2017?', 'Barcelona'],
          ['Which club did Erling Haaland join from Borussia Dortmund in 2022?', 'Manchester City'],
          ['Which club did Cristiano Ronaldo rejoin in 2021, moving from Juventus?', 'Manchester United'],
          ['Which English club did James Rodríguez make 23 appearances for?', 'Everton'],
          ['Which club did Jude Bellingham join from Borussia Dortmund in 2023?', 'Real Madrid'],
          ['Which club did Kylian Mbappé join on a free transfer in 2024?', 'Real Madrid']
        ]
      },
      {
        name: 'a Ballon d\'Or Buff',
        questions: [
          ["Who is the most recent Brazilian player to win the Ballon d'Or?", 'Kaká, in 2007'],
          ['Which club was Ronaldinho playing for when he won the 2002 World Cup?', 'PSG'],
          ["Who has won the most Ballon d'Or awards?", 'Lionel Messi'],
          ['What does "Ballon d\'Or" translate to in English?', '"Golden Ball"'],
          ["Which publication originally created the Ballon d'Or award?", 'France Football'],
          ["Who won the first-ever Women's Ballon d'Or, in 2018?", 'Ada Hegerberg'],
          ["Which goalkeeper famously won the Ballon d'Or in 1963?", 'Lev Yashin'],
          ["Who won the Ballon d'Or in 2014, the same year Germany won the World Cup?", 'Cristiano Ronaldo']
        ]
      },
      {
        name: 'an El Clásico Fanatic',
        questions: [
          ['El Clásico is the fixture between which two clubs?', 'Real Madrid and Barcelona'],
          ['Who holds the record for the most El Clásico goals?', 'Lionel Messi'],
          ["What was the long-standing name of Barcelona's home stadium?", 'Camp Nou'],
          ["What is Real Madrid's home stadium called?", 'Santiago Bernabéu'],
          ["What is Real Madrid's nickname?", 'Los Blancos'],
          ["What is Barcelona's nickname?", 'Blaugrana (or Culés)'],
          ['Which club did Luis Figo controversially join in 2000, coming from Barcelona?', 'Real Madrid'],
          ['Which Frenchman won multiple Champions Leagues with Real Madrid as both player and manager?', 'Zinedine Zidane']
        ]
      },
      {
        name: 'a Golden Boot Chaser',
        questions: [
          ['What is a Golden Boot awarded for?', 'Being the top goalscorer'],
          ['Who won the World Cup Golden Boot in Qatar in 2022?', 'Kylian Mbappé'],
          ['Who is the all-time top scorer at the World Cup?', 'Miroslav Klose'],
          ['Who has won the European Golden Shoe the most times?', 'Cristiano Ronaldo'],
          ['How many goals did Erling Haaland score to set the Premier League single-season record in 2022-23?', '36'],
          ['What award goes to the World Cup\'s best young player, separate from the Golden Boot?', 'The Best Young Player Award'],
          ["In which year did Brazil's Ronaldo win the World Cup Golden Boot with 8 goals?", '2002'],
          ['What is awarded to the World Cup goalkeeper judged best in the tournament?', 'The Golden Glove']
        ]
      },
      {
        name: 'a Tactics Nerd',
        questions: [
          ['What does a "false 9" describe?', 'A forward who drops deep instead of staying central'],
          ['What is "gegenpressing"?', 'Pressing immediately to win the ball back right after losing it'],
          ['What is a "back three"?', 'A defensive line of three central defenders, as in a 3-5-2'],
          ['What is an "overlap" in attacking play?', 'A wide player running around or outside a teammate to provide width'],
          ['What does a "low block" mean defensively?', 'A team sitting deep with most players behind the ball'],
          ['What is the "offside trap"?', 'Defenders stepping up together to catch attackers offside'],
          ['What role does a "regista" play?', 'A deep-lying playmaker who dictates tempo from midfield'],
          ['What is an "inverted fullback"?', 'A fullback who tucks into central midfield when in possession']
        ]
      },
      {
        name: 'a Football Manager (Game) Player',
        questions: [
          ['What is "FM" short for in the gaming world?', 'Football Manager'],
          ['Before 2004, the Football Manager series was called what?', 'Championship Manager'],
          ['What term describes a young player with exceptional potential?', 'A "wonderkid"'],
          ['What is a "regen" in Football Manager?', 'A newly generated player once the real-world database is exhausted'],
          ['What attribute category covers passing, finishing, and tackling ability?', 'Technical attributes'],
          ['What does "PPM" stand for in the series?', 'Player Preferred Move'],
          ['Which studio develops Football Manager?', 'Sports Interactive'],
          ['What is the in-game mode where you handle transfers, tactics, and training called?', 'Career/manager mode']
        ]
      },
      {
        name: 'a Women\'s Football Fan',
        questions: [
          ['Which country won the 2023 FIFA Women\'s World Cup?', 'Spain'],
          ['Which country has won the most Women\'s World Cups?', 'The United States, with four'],
          ['What does "WSL" stand for in English women\'s football?', 'The Women\'s Super League'],
          ['Which two countries co-hosted the 2023 Women\'s World Cup?', 'Australia and New Zealand'],
          ['Which American won both the Golden Boot and Golden Ball at the 2019 Women\'s World Cup?', 'Megan Rapinoe'],
          ['What\'s the top club competition in European women\'s football?', 'The UEFA Women\'s Champions League'],
          ['Which country won the 2022 Women\'s Euros on home soil?', 'England'],
          ['What does "NWSL" stand for?', 'The National Women\'s Soccer League, in the United States']
        ]
      },
      {
        name: 'an African Football Fan',
        questions: [
          ['What does "AFCON" stand for?', 'The Africa Cup of Nations'],
          ['Which country has won the most AFCON titles?', 'Egypt, with seven'],
          ['What\'s South Africa\'s top-flight football league commonly called?', 'The PSL — the Premier Soccer League'],
          ['Which two Soweto clubs contest South Africa\'s biggest derby?', 'Kaizer Chiefs and Orlando Pirates'],
          ['What is the Kaizer Chiefs vs Orlando Pirates fixture known as?', 'The Soweto Derby'],
          ['Which African country reached the World Cup semi-finals in 2022, a first for the continent?', 'Morocco'],
          ['Which Liberian forward is the only African to win the Ballon d\'Or, in 1995?', 'George Weah'],
          ['Which South African club won the CAF Champions League in 2016?', 'Mamelodi Sundowns']
        ]
      },
      {
        name: 'a Football Kit Nerd',
        questions: [
          ['What\'s a "third kit"?', 'A club\'s alternative strip beyond its home and away kits'],
          ['Why does a team wear a "clash" or away kit?', 'To avoid a colour clash with the opposing team'],
          ['What does a star above a national team\'s crest usually signify?', 'A World Cup title won'],
          ['How many stars sit above Brazil\'s crest?', 'Five'],
          ['What colours are Juventus\'s traditional home stripes?', 'Black and white'],
          ['Which German club is famously associated with yellow and black?', 'Borussia Dortmund'],
          ['Which sportswear brand uses the "swoosh" logo?', 'Nike'],
          ['Which brand\'s three stripes are a football kit staple?', 'Adidas']
        ]
      },
      {
        name: 'a VAR & Referee Rules Nerd',
        questions: [
          ['What does "VAR" stand for?', 'Video Assistant Referee'],
          ['Which four decision types can VAR review?', 'Goals, penalties, direct red cards, and mistaken identity'],
          ['What signal does a referee make before consulting the pitchside monitor?', 'Drawing a rectangle — a "TV screen" — in the air'],
          ['What happens when a player receives two yellow cards in one match?', 'They become a red card and the player is sent off'],
          ['What\'s "advantage"?', 'Letting play continue after a foul because the fouled team benefits from doing so'],
          ['What\'s added at the end of each half to account for delays?', 'Stoppage time (added or injury time)'],
          ['What\'s the offside rule, in one line?', 'An attacker is ahead of the second-last defender when the ball is played to them'],
          ['What broadly counts as a handball offence?', 'Deliberately touching the ball with hand or arm, or doing so with an unnaturally enlarged body shape']
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
          ['What do you call a score of zero in tennis?', 'Love'],
          ['How many Grand Slam tournaments are there each year?', 'Four'],
          ['What\'s it called when a player wins a set 6-0?', 'A "bagel"'],
          ['What surface is the French Open played on?', 'Clay'],
          ['What\'s a "let" in tennis?', 'A serve that clips the net but still lands in the correct box, replayed'],
          ['Who is widely regarded as holding the record for most men\'s Grand Slam singles titles?', 'Novak Djokovic'],
          ['What\'s it called when a player wins all four Grand Slams in the same calendar year?', 'A calendar Grand Slam'],
          ['What\'s the tiebreak format played at 6-6 in most sets called?', 'A tiebreaker (or tiebreak)']
        ]
      },
      {
        name: 'a Grand Slam Historian',
        questions: [
          ['Which Grand Slam is played on grass?', 'Wimbledon'],
          ['Which city hosts the US Open?', 'New York'],
          ['Which Grand Slam is played on hard courts in Melbourne?', 'The Australian Open'],
          ['Who holds the Open Era record for most men\'s Wimbledon singles titles, with 8?', 'Roger Federer'],
          ['Who holds the Open Era record for most women\'s Grand Slam singles titles, with 23?', 'Serena Williams'],
          ['Which is the earliest of the four Grand Slams played each year?', 'The Australian Open'],
          ['Which Grand Slam is the last of the year, played in New York?', 'The US Open'],
          ['What colour are the clay courts at the French Open (Roland Garros)?', 'Red/orange']
        ]
      },
      {
        name: 'a Wimbledon Regular',
        questions: [
          ['What\'s the strict dress code colour at Wimbledon?', 'All white'],
          ['What\'s traditionally served with strawberries at Wimbledon?', 'Cream'],
          ['What\'s the name of Wimbledon\'s main show court?', 'Centre Court'],
          ['What\'s Wimbledon\'s VIP seating area known as?', 'The Royal Box'],
          ['What\'s the grass-court Grand Slam officially called?', 'The Championships, Wimbledon'],
          ['In which part of London is the All England Club located?', 'Wimbledon'],
          ['What ball brand has long supplied Wimbledon?', 'Slazenger'],
          ['Which Grand Slam added a retractable roof over its main court to fight rain delays?', 'Wimbledon, over Centre Court']
        ]
      },
      {
        name: 'a Tennis Rules Nerd',
        questions: [
          ['What\'s a "double fault"?', 'Missing both first and second serve attempts, losing the point'],
          ['What\'s "deuce"?', 'A tied score of 40-40 in a game'],
          ['How many points are needed to win a standard game, without deuce?', 'Four'],
          ['What\'s an "ace"?', 'A serve the opponent can\'t touch, winning the point outright'],
          ['What\'s it called when players switch ends of the court?', 'A changeover'],
          ['What\'s a "rally"?', 'A sequence of shots exchanged before the point ends'],
          ['What\'s generally banned mid-match in traditional tennis rules?', 'On-court coaching'],
          ['What\'s a "break of serve"?', 'Winning a game when your opponent was serving']
        ]
      },
      {
        name: 'a Tennis Tour Nerd',
        questions: [
          ['What does "ATP" stand for, the men\'s tour body?', 'Association of Tennis Professionals'],
          ['What does "WTA" stand for, the women\'s tour body?', 'Women\'s Tennis Association'],
          ['What are the year-end events for each tour\'s top 8 ranked players called?', 'The ATP Finals and WTA Finals'],
          ['What determines a player\'s tour ranking?', 'Points earned from tournament results'],
          ['What\'s "match point"?', 'The point that, if won, ends the match'],
          ['What\'s a "seed" in a tournament draw?', 'A top player positioned to avoid early meetings with other top players'],
          ['What\'s an "unforced error"?', 'A mistake made without pressure from the opponent\'s shot'],
          ['What technology largely replaced human line judges for close calls?', 'Electronic line-calling (e.g. Hawk-Eye)']
        ]
      },
      {
        name: 'a Cricket Fan',
        questions: [
          ['How many players are on a cricket team on the field?', 'Eleven'],
          ['What\'s it called when a bowler takes three wickets on three consecutive balls?', 'A hat-trick'],
          ['What\'s the term for scoring 100 runs in an innings?', 'A century'],
          ['How many balls make up a standard over?', 'Six'],
          ['What\'s a "duck"?', 'Being dismissed for zero runs'],
          ['What\'s the wooden structure a bowler aims at called?', 'The stumps (the wicket)'],
          ['What does an "LBW" dismissal stand for?', 'Leg Before Wicket'],
          ['What\'s the shortest major international format, played over 20 overs a side?', 'T20']
        ]
      },
      {
        name: 'a Cricket World Cup Historian',
        questions: [
          ['Which country has won the most Cricket World Cups?', 'Australia'],
          ['Which country won the first Cricket World Cup, in 1975?', 'The West Indies'],
          ['Which country hosted and won the 2011 Cricket World Cup?', 'India'],
          ['Which country won the dramatic 2019 Cricket World Cup final at Lord\'s?', 'England'],
          ['How often is the Cricket World Cup held?', 'Every four years'],
          ['Which country won the 2023 Cricket World Cup, hosted by India?', 'Australia'],
          ['What\'s the top prize in T20 international cricket called?', 'The ICC Men\'s T20 World Cup'],
          ['Which two countries contest "The Ashes"?', 'England and Australia']
        ]
      },
      {
        name: 'a Cricket Terminology Nerd',
        questions: [
          ['What\'s a "googly"?', 'A deceptive delivery that spins the opposite way to how it looks'],
          ['What\'s a "maiden over"?', 'An over in which no runs are scored'],
          ['What\'s a "boundary"?', 'A shot that reaches the edge of the field, worth 4 or 6 runs'],
          ['What\'s a "yorker"?', 'A fast, full-length delivery aimed at the batter\'s feet'],
          ['What\'s the "slip" fielding position mainly used for?', 'Catching edges near the wicketkeeper'],
          ['What\'s a "declaration"?', 'A captain voluntarily ending their team\'s innings before all wickets fall'],
          ['What\'s "sledging"?', 'Verbal needling or trash talk between players on the field'],
          ['What does "DRS" stand for?', 'Decision Review System']
        ]
      },
      {
        name: 'a Test Cricket Purist',
        questions: [
          ['How many days can a Test match traditionally last?', 'Five'],
          ['What colour ball is traditionally used in Test cricket?', 'Red'],
          ['What\'s the term for a player who bats and bowls at a high level?', 'An all-rounder'],
          ['Who holds the record for the highest individual score in a Test innings, 400 not out?', 'Brian Lara'],
          ['What\'s a "follow-on"?', 'When a team batting second is forced to bat again immediately after a big first-innings deficit'],
          ['What colour is traditionally worn in Test cricket kit?', 'White'],
          ['What\'s the oldest recognised cricket trophy, contested between England and Australia?', 'The Ashes'],
          ['What\'s a "nightwatchman"?', 'A lower-order batter sent in late in the day to protect a specialist batter']
        ]
      },
      {
        name: 'an IPL / T20 Nerd',
        questions: [
          ['What does "IPL" stand for?', 'Indian Premier League'],
          ['What\'s a "Super Over"?', 'A one-over eliminator used to break a tie'],
          ['What\'s the "Powerplay" in limited-overs cricket?', 'An early phase of overs with fielding restrictions'],
          ['What\'s a "free hit"?', 'A delivery after a no-ball where the batter can\'t be dismissed by most methods'],
          ['How many overs per side are bowled in T20 cricket?', 'Twenty'],
          ['What\'s a "death over"?', 'An over near the end of the innings, typically high-scoring and high-pressure'],
          ['What\'s an "all-rounder"?', 'A player skilled at both batting and bowling'],
          ['What does "MoM" stand for, an award given after a match?', 'Man of the Match']
        ]
      },
      {
        name: 'a Rugby Fan',
        questions: [
          ['How many players are on a rugby union team on the field?', 'Fifteen'],
          ['How many points is a try worth?', 'Five'],
          ['What\'s a "conversion"?', 'A kick after a try, worth 2 more points if successful'],
          ['What\'s a "scrum"?', 'A contested restart where forwards bind together to compete for the ball'],
          ['What\'s a "lineout"?', 'A restart where the ball is thrown in after going out of play (into touch)'],
          ['What\'s it called when a team kicks the ball between the posts for 3 points during open play?', 'A drop goal'],
          ['How many points is a penalty kick worth?', 'Three'],
          ['What colour card sends a player off for the rest of the match?', 'Red']
        ]
      },
      {
        name: 'a Rugby World Cup Historian',
        questions: [
          ['Which country has won the most Rugby World Cups?', 'South Africa'],
          ['Which country won the first Rugby World Cup, in 1987?', 'New Zealand'],
          ['Which country hosted the 2023 Rugby World Cup?', 'France'],
          ['Which country won the 2023 Rugby World Cup final?', 'South Africa'],
          ['What\'s South Africa\'s national rugby team nicknamed?', 'The Springboks'],
          ['What\'s New Zealand\'s national rugby team nicknamed?', 'The All Blacks'],
          ['How often is the Rugby World Cup held?', 'Every four years'],
          ['What trophy is awarded to the Rugby World Cup winners?', 'The Webb Ellis Cup']
        ]
      },
      {
        name: 'a Six Nations Follower',
        questions: [
          ['Which annual northern-hemisphere tournament features England, France, Ireland, Italy, Scotland, and Wales?', 'The Six Nations'],
          ['Which southern-hemisphere tournament features South Africa, New Zealand, Australia, and Argentina?', 'The Rugby Championship'],
          ['What\'s it called when a team wins every match in a single Six Nations tournament?', 'A Grand Slam'],
          ['What\'s the trophy contested between England and Scotland in the Six Nations called?', 'The Calcutta Cup'],
          ['What colour jersey does Ireland\'s national team wear?', 'Green'],
          ['What\'s the term for winning the most points/matches in a Six Nations without a Grand Slam?', 'Winning the Championship'],
          ['What\'s the name of the combined England/Ireland/Scotland/Wales team that tours the Southern Hemisphere?', 'The British & Irish Lions'],
          ['How often does a British & Irish Lions tour take place?', 'Every four years']
        ]
      },
      {
        name: 'a Rugby Terminology Nerd',
        questions: [
          ['What\'s a "maul"?', 'A phase where the ball carrier is held up by teammates in a moving pack, staying on their feet'],
          ['What\'s a "ruck"?', 'A phase where players contest the ball on the ground after a tackle'],
          ['What\'s a "knock-on"?', 'Illegally fumbling the ball forward, resulting in a scrum for the opposition'],
          ['What\'s offside broadly about in rugby?', 'Being ahead of the ball, or the back foot of a ruck/maul, when not allowed to be involved'],
          ['Which position typically wears the number 10 jersey as chief kicker and playmaker?', 'Fly-half'],
          ['What\'s a hooker\'s main job in the scrum?', 'Striking for and hooking back the ball'],
          ['What\'s a "high tackle"?', 'An illegal tackle making contact above the shoulders'],
          ['What\'s the term for the two packs of forwards binding together to contest possession?', 'The scrum']
        ]
      },
      {
        name: 'an Athletics Fan',
        questions: [
          ['What\'s the most prestigious sprint event, run over 100 metres?', 'The 100m'],
          ['Who holds the men\'s 100m and 200m world records?', 'Usain Bolt'],
          ['What does "PB" stand for?', 'Personal Best'],
          ['What event combines running, jumping, and throwing over two days for men?', 'The decathlon'],
          ['How many events make up the heptathlon, usually contested by women?', 'Seven'],
          ['What\'s a "false start" in sprinting?', 'Leaving the blocks before the starting signal'],
          ['What\'s the standard length of an outdoor athletics track?', '400 metres'],
          ['What field event involves clearing a bar using a pole?', 'Pole vault']
        ]
      },
      {
        name: 'an Olympics Athletics Historian',
        questions: [
          ['Which country does sprint legend Usain Bolt represent?', 'Jamaica'],
          ['Who holds the women\'s 100m and 200m world records, set in 1988?', 'Florence Griffith-Joyner'],
          ['Which country hosted the 2012 Summer Olympics?', 'The United Kingdom (London)'],
          ['Which country hosted the 2020 Olympics, actually held in 2021?', 'Japan (Tokyo)'],
          ['Which country hosted the 2024 Olympics?', 'France (Paris)'],
          ['What\'s the official marathon distance?', '26.2 miles (42.195 km)'],
          ['Which British distance runner dominated the 5000m and 10000m through the 2010s?', 'Mo Farah'],
          ['How often are the Summer Olympics held?', 'Every four years']
        ]
      },
      {
        name: 'a Field Events Nerd',
        questions: [
          ['What field event involves throwing a heavy metal ball for distance?', 'Shot put'],
          ['What\'s thrown in the "discus" event?', 'A weighted disc, usually with a metal rim'],
          ['What\'s the event where a weighted ball on a wire is spun and thrown called?', 'Hammer throw'],
          ['What\'s the "javelin"?', 'A spear-like implement thrown for distance'],
          ['What\'s the key difference between long jump and triple jump?', 'Triple jump adds a hop and a step before the final jump'],
          ['What\'s the modern high jump technique, going over backwards, called?', 'The Fosbury Flop'],
          ['What\'s the sprint before takeoff in a jumping event called?', 'The run-up'],
          ['What\'s measured in the long jump?', 'The distance from the takeoff board to the landing mark']
        ]
      },
      {
        name: 'a Distance Running Nerd',
        questions: [
          ['What\'s the classic "metric mile" distance?', '1500 metres'],
          ['How many laps of a standard track make up a 10,000m race?', '25'],
          ['What\'s a "pacer" or "rabbit" in distance running?', 'A runner who sets an early fast pace for others, often dropping out before the finish'],
          ['What\'s "negative splitting" in a race?', 'Running the second half faster than the first'],
          ['What\'s the steeplechase known for, besides hurdles?', 'A water jump'],
          ['Which runner set a huge marathon world record of 2:00:35 at the 2023 Chicago Marathon?', 'Kelvin Kiptum'],
          ['Which two East African nations are famously dominant in distance running?', 'Kenya and Ethiopia'],
          ['What\'s a "split" in distance running?', 'The time recorded at a set checkpoint during a race']
        ]
      },
      {
        name: 'a Golf Fan',
        questions: [
          ['What\'s it called when you finish a hole one shot under par?', 'A birdie'],
          ['What\'s an "eagle"?', 'Two shots under par on a hole'],
          ['What\'s a "bogey"?', 'One shot over par on a hole'],
          ['What\'s "par"?', 'The expected number of shots a skilled golfer should take on a hole'],
          ['How many holes make up a standard round of golf?', 'Eighteen'],
          ['What\'s a "hole-in-one"?', 'Sinking the ball with a single shot from the tee'],
          ['What\'s the area of very short grass around the hole called?', 'The green'],
          ['What\'s a "handicap" in golf?', 'A numerical measure of a player\'s ability, used to adjust scores']
        ]
      },
      {
        name: 'a Major Championship Historian',
        questions: [
          ['How many men\'s major championships are there each year?', 'Four'],
          ['Name the four men\'s majors.', 'The Masters, the PGA Championship, the U.S. Open, and The Open Championship'],
          ['Which major is always played at Augusta National?', 'The Masters'],
          ['What colour jacket does the Masters champion receive?', 'Green'],
          ['Which major is the oldest, first played in 1860?', 'The Open Championship'],
          ['Who holds the record for most men\'s major championships won, with 18?', 'Jack Nicklaus'],
          ['Which country is The Open Championship traditionally played in?', 'Scotland (the United Kingdom)'],
          ['What trophy is awarded to The Open Championship winner?', 'The Claret Jug']
        ]
      },
      {
        name: 'a Ryder Cup Follower',
        questions: [
          ['Which two sides compete in the Ryder Cup?', 'Europe and the United States'],
          ['How often is the Ryder Cup held?', 'Every two years'],
          ['What team formats, alongside singles, make up most Ryder Cup matches?', 'Fourball and foursomes'],
          ['What format is the Ryder Cup scored in?', 'Match play, with points awarded per match won'],
          ['Are Ryder Cup players professionals or amateurs?', 'Professionals'],
          ['What\'s the trophy itself called?', 'The Ryder Cup'],
          ['Which continent\'s golfers make up "Team Europe"?', 'Europe'],
          ['Who was the English businessman the cup is named after?', 'Samuel Ryder']
        ]
      },
      {
        name: 'a Golf Rules & Terms Nerd',
        questions: [
          ['What\'s a "mulligan"?', 'An informal do-over shot, not allowed under official rules'],
          ['What\'s "the fairway"?', 'The mowed area of the course between tee and green'],
          ['What\'s a "bunker"?', 'A sand hazard on the course'],
          ['What\'s "the rough"?', 'Longer grass bordering the fairway, harder to play from'],
          ['What\'s a "fourball" format?', 'A team format where each player plays their own ball and the best score counts'],
          ['What\'s "stroke play"?', 'Scoring by the total number of shots taken over a round'],
          ['What\'s "match play"?', 'A format where holes are won or lost, rather than strokes counted'],
          ['What\'s a "caddie"?', 'A person who carries a player\'s clubs and gives advice during a round']
        ]
      },
      {
        name: 'a Basketball Fan',
        questions: [
          ['How many players per team are on the court in basketball?', 'Five'],
          ['How many points is a free throw worth?', 'One'],
          ['How many points is a shot from beyond the three-point line worth?', 'Three'],
          ['What\'s a "dunk"?', 'Forcefully scoring by putting the ball directly through the hoop with the hand(s)'],
          ['What\'s a "triple-double"?', 'Reaching double digits in three statistical categories in one game'],
          ['What\'s the top professional basketball league in the US called?', 'The NBA'],
          ['What\'s a "rebound"?', 'Recovering the ball after a missed shot'],
          ['How long is an NBA game, in regulation?', '48 minutes']
        ]
      },
      {
        name: 'an NBA Historian',
        questions: [
          ['Which team has won the most NBA championships?', 'The Boston Celtics'],
          ['Who won six championships with the Chicago Bulls and is widely considered among the greatest ever?', 'Michael Jordan'],
          ['Who holds the NBA\'s all-time regular-season scoring record?', 'LeBron James'],
          ['What\'s the trophy awarded to the NBA champion called?', 'The Larry O\'Brien Trophy'],
          ['What\'s the NBA\'s regular-season MVP trophy officially called?', 'The Maurice Podoloff Trophy'],
          ['Which city\'s team is known as the Lakers?', 'Los Angeles'],
          ['What\'s the league\'s annual mid-season showcase of top players called?', 'The NBA All-Star Game'],
          ['Who is the NBA Finals MVP trophy named after?', 'Bill Russell']
        ]
      },
      {
        name: 'a Basketball Rules Nerd',
        questions: [
          ['What\'s "travelling"?', 'Taking too many steps without dribbling the ball'],
          ['What does a "shot clock" enforce?', 'A time limit for a team to attempt a shot'],
          ['What\'s "goaltending"?', 'Illegally blocking a shot on its way down toward the basket'],
          ['What\'s a "technical foul"?', 'A penalty for unsportsmanlike conduct, unrelated to physical play on the ball'],
          ['What\'s a "double dribble"?', 'Dribbling with both hands at once, or stopping and restarting a dribble'],
          ['What\'s the rectangular area near the basket commonly called?', 'The paint (or the key)'],
          ['What\'s a "pick and roll"?', 'An offensive play where a player sets a screen, then moves toward the basket for a pass'],
          ['How many personal fouls typically disqualify an NBA player from a game?', 'Six']
        ]
      },
      {
        name: 'a March Madness Nerd',
        questions: [
          ['What\'s the popular nickname for the US men\'s college basketball championship tournament?', 'March Madness'],
          ['How many teams make up the men\'s NCAA tournament bracket?', '68'],
          ['What\'s a "Cinderella" team in the tournament?', 'A lower-seeded underdog team that makes a surprising deep run'],
          ['What\'s the "Final Four"?', 'The last four teams remaining in the NCAA tournament'],
          ['What organisation governs US college sports, including basketball?', 'The NCAA'],
          ['What\'s a "bracket" in tournament terms?', 'The chart predicting or tracking the tournament\'s matchups and winners'],
          ['What\'s a "one-and-done" player?', 'A player who leaves college for the pros after just one season'],
          ['What\'s it called when a #16 seed beats a #1 seed, historically rare?', 'A major upset']
        ]
      },
      {
        name: 'a Boxing Fan',
        questions: [
          ['How long is a standard professional boxing round?', 'Three minutes'],
          ['What does "TKO" stand for?', 'Technical knockout — stopped by the referee or corner'],
          ['How many judges typically score a professional bout?', 'Three'],
          ['What scoring system are most professional rounds scored on?', 'The 10-point must system'],
          ['What\'s the heaviest professional weight class?', 'Heavyweight'],
          ['What does "the undercard" mean?', 'The supporting bouts staged before the main event'],
          ['What\'s a "southpaw"?', 'A left-handed fighter, who leads with the right hand and foot'],
          ['What\'s a "split decision"?', 'A win where the three judges don\'t all score the same fighter ahead']
        ]
      },
      {
        name: 'a Boxing Historian',
        questions: [
          ['Which boxer famously called himself "The Greatest"?', 'Muhammad Ali'],
          ['What was the 1974 Ali vs Foreman fight in Zaire called?', 'The Rumble in the Jungle'],
          ['What was the 1975 Ali vs Frazier third fight called?', 'The Thrilla in Manila'],
          ['Which heavyweight retired undefeated at 49-0 in the 1950s?', 'Rocky Marciano'],
          ['Which boxer bit Evander Holyfield\'s ear during their 1997 rematch?', 'Mike Tyson'],
          ['Which American retired 50-0, one past Marciano\'s mark?', 'Floyd Mayweather Jr.'],
          ['What tactic did Ali use against Foreman, absorbing punches on the ropes?', 'The rope-a-dope'],
          ['Which Filipino won world titles across eight different weight divisions?', 'Manny Pacquiao']
        ]
      },
      {
        name: 'an MMA Fan',
        questions: [
          ['What does "MMA" stand for?', 'Mixed Martial Arts'],
          ['What\'s the biggest MMA promotion in the world?', 'The UFC'],
          ['What shape is the UFC\'s fighting area?', 'An octagon'],
          ['How many rounds is a non-title UFC fight?', 'Three'],
          ['How many rounds is a UFC title fight?', 'Five'],
          ['What\'s a "submission"?', 'A hold or choke that forces an opponent to tap out'],
          ['Who is "GSP"?', 'Georges St-Pierre'],
          ['Which Irish fighter became the UFC\'s first simultaneous two-division champion?', 'Conor McGregor']
        ]
      },
      {
        name: 'a Formula 1 Fan',
        questions: [
          ['What does "DRS" stand for in Formula 1?', 'Drag Reduction System'],
          ['Which two championships are contested each season?', 'The Drivers\' and Constructors\' Championships'],
          ['What flag signals the end of a race?', 'The chequered flag'],
          ['What does a red flag mean?', 'The session is stopped'],
          ['Which two drivers share the record of seven world titles?', 'Michael Schumacher and Lewis Hamilton'],
          ['What\'s "pole position"?', 'First place on the starting grid, earned in qualifying'],
          ['Which glamorous race is run on public streets around a harbour?', 'The Monaco Grand Prix'],
          ['What does a "box" call on team radio mean?', 'Come into the pits']
        ]
      },
      {
        name: 'a Cycling Fan',
        questions: [
          ['What are the three Grand Tours?', 'The Tour de France, the Giro d\'Italia, and the Vuelta a España'],
          ['What colour jersey does the Tour de France leader wear?', 'Yellow — the maillot jaune'],
          ['What\'s the "peloton"?', 'The main bunch of riders in a race'],
          ['What does the polka-dot jersey signify at the Tour?', 'King of the Mountains — the best climber'],
          ['What\'s "drafting" or "slipstreaming"?', 'Riding close behind another rider to save energy'],
          ['Which British rider won the Tour de France four times in the 2010s?', 'Chris Froome'],
          ['What\'s a "domestique"?', 'A rider whose job is to support the team leader'],
          ['What\'s a "time trial"?', 'A race against the clock, with riders starting individually']
        ]
      },
      {
        name: 'a Swimming Fan',
        questions: [
          ['How long is an Olympic-size swimming pool?', '50 metres'],
          ['What are the four competitive strokes?', 'Freestyle, backstroke, breaststroke, and butterfly'],
          ['Who is the most decorated Olympian of all time?', 'Michael Phelps'],
          ['How many Olympic gold medals did Michael Phelps win?', '23'],
          ['What\'s a "medley" race?', 'A race using all four competitive strokes'],
          ['Which South African beat Michael Phelps to gold in the 200m butterfly at London 2012?', 'Chad le Clos'],
          ['What\'s a "flip turn" used for?', 'Turning quickly at the wall, mostly in freestyle and backstroke'],
          ['What happens on a false start in a swimming final?', 'The swimmer is disqualified']
        ]
      },
      {
        name: 'a Snooker & Darts Fan',
        questions: [
          ['How many red balls are on a snooker table at the start of a frame?', 'Fifteen'],
          ['What\'s the highest possible break in standard snooker?', '147'],
          ['What\'s the black ball worth in snooker?', 'Seven'],
          ['Where is the World Snooker Championship traditionally held?', 'The Crucible Theatre in Sheffield'],
          ['What\'s the highest score possible with three darts?', '180'],
          ['What must you finish on to win a standard leg of darts?', 'A double'],
          ['What\'s a "nine-darter"?', 'A perfect leg of 501 finished in nine darts'],
          ['What\'s the highest score a single dart can score?', '60 — treble twenty']
        ]
      },
      {
        name: 'a Netball Fan',
        questions: [
          ['How many players per team are on court in netball?', 'Seven'],
          ['Which two positions are allowed to shoot?', 'Goal Shooter and Goal Attack'],
          ['What does "GK" stand for as a netball position?', 'Goal Keeper'],
          ['Can you run with the ball in netball?', 'No — you must pass or shoot within three seconds'],
          ['How many quarters is a netball match played over?', 'Four'],
          ['What\'s South Africa\'s national netball team known as?', 'The Proteas'],
          ['Which country is historically the most dominant in world netball?', 'Australia'],
          ['From where must a shot be taken for it to count?', 'Inside the shooting circle']
        ]
      },
      {
        name: 'a Baseball Fan',
        questions: [
          ['How many strikes make an out?', 'Three'],
          ['How many innings are in a standard Major League game?', 'Nine'],
          ['What\'s a "home run"?', 'A hit that lets the batter round all the bases and score, usually out of the park'],
          ['What\'s the championship series of Major League Baseball called?', 'The World Series'],
          ['How many players field per team?', 'Nine'],
          ['What\'s a "grand slam" in baseball?', 'A home run with the bases loaded, scoring four runs'],
          ['What\'s the pitcher\'s raised area called?', 'The mound'],
          ['Which player broke Major League Baseball\'s colour barrier in 1947?', 'Jackie Robinson']
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
  }
];

/** Flat name → [question, answer][] lookup, built from SECTIONS. */
export const CATEGORY_BANK = SECTIONS.reduce((bank, { categories }) => {
  for (const { name, questions } of categories) bank[name] = questions;
  return bank;
}, {});

export const CATEGORY_NAMES = Object.keys(CATEGORY_BANK);
