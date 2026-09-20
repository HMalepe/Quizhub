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
          ["What's 7 x 8?", '56'],
          ["What's the largest planet in the solar system?", 'Jupiter'],
          ['What is a synonym for "happy"?', 'Joyful, glad, or content'],
          ['How many sides does a hexagon have?', 'Six'],
          ['What’s the past tense of "run"?', 'Ran'],
          ["What's the chemical formula for water?", 'H2O'],
          ['What continent is Egypt in?', 'Africa'],
          ["What's the capital of South Africa?", 'Pretoria, Cape Town, or Bloemfontein — it has three']
        ]
      },
      {
        name: '90s Kid',
        questions: [
          ['What was the virtual pet everyone carried around called?', 'Tamagotchi'],
          ['What console released the first "Pokémon" game?', 'Game Boy'],
          ['What was MSN Messenger mainly used for?', 'Instant messaging with friends'],
          ['What was a "mixtape"?', 'A custom compilation of songs, often recorded onto a cassette'],
          ['What Nickelodeon show featured babies with big imaginations?', 'Rugrats'],
          ['What dance craze had everyone doing the same arm movements in a line?', 'The Macarena'],
          ['What did you insert to play music in a Walkman?', 'A cassette tape'],
          ['What sound did you have to wait through before dial-up internet connected?', 'The dial-up modem screech']
        ]
      },
      {
        name: 'Boomer',
        questions: [
          ['What was the primary way to get news before the internet?', 'Newspapers, radio, and TV'],
          ['What decade did the Beatles become famous?', 'The 1960s'],
          ['What is a "rotary phone"?', 'A phone dialed by turning a numbered wheel'],
          ['What event is "one small step for man" associated with?', 'The 1969 Moon landing'],
          ['What was a "record player" used for?', 'Playing vinyl records'],
          ['What was the Cold War primarily between?', 'The US and the Soviet Union'],
          ['What is a "telegram"?', 'A short message sent electronically, historically via Morse code'],
          ['What did you use to look up a phone number before the internet?', 'A phone book']
        ]
      },
      {
        name: 'Gen Z',
        questions: [
          ['What does "no cap" mean?', 'No lie, for real'],
          ['What is "rizz"?', 'Charisma, especially in flirting'],
          ['What does "it’s giving..." mean?', "It's expressing or resembling a certain vibe"],
          ['What is a "finsta"?', 'A fake or second Instagram account for close friends'],
          ['What does "delulu" mean?', 'Delusional, usually said jokingly'],
          ['What platform is known for short-form vertical video?', 'TikTok'],
          ['What does "the ick" mean?', 'A sudden turn-off toward someone'],
          ['What is "brainrot"?', 'Content so absurd or repetitive it feels like it melts your brain']
        ]
      },
      {
        name: 'Millennial',
        questions: [
          ['What was "Limewire" mainly used for?', 'Downloading (often pirated) music'],
          ['What was a common "away message" used for on AIM?', 'A custom status shown when you left the computer'],
          ['What phone was famous for its slide-out keyboard?', 'The T-Mobile Sidekick'],
          ['What was "Y2K" about?', 'Fear that computers would fail at the year 2000 rollover'],
          ['What year was the first iPhone released?', '2007'],
          ['What term, coined by millennials, means doing responsible grown-up tasks?', 'Adulting'],
          ['What sitcom do millennials associate with "How you doin’"?', 'Friends'],
          ['What was MySpace known for letting you rank?', 'Your "Top 8" friends']
        ]
      },
      {
        name: '2010s Kid',
        questions: [
          ['What app was known for short, looping 6-second videos?', 'Vine'],
          ['What game made "default dances" a cultural phenomenon?', 'Fortnite'],
          ["What cause did the Ice Bucket Challenge raise awareness for?", "ALS (Lou Gehrig's disease)"],
          ['What tool became essential for group photos around this time?', 'The selfie stick'],
          ['What app popularized filters like dog ears on your face?', 'Snapchat'],
          ['What was the "Harlem Shake" meme?', 'A viral dance/video format'],
          ['What year did TikTok launch globally, merging with musical.ly?', '2018'],
          ['What show/app made "Damn Daniel" go viral?', 'A video shared on Twitter, later tied to Vine culture']
        ]
      },
      {
        name: 'Someone From the 80s',
        questions: [
          ['What is a "boombox"?', 'A large portable stereo/radio-cassette player'],
          ['What was MTV originally known for?', 'Playing music videos'],
          ["What's a Rubik's Cube?", 'A 3D twisty puzzle toy'],
          ['What movie features a time-traveling DeLorean?', 'Back to the Future'],
          ['What year was the Nintendo Entertainment System (NES) released in the US?', '1985'],
          ['What was a VHS tape used for?', 'Recording and watching movies or shows'],
          ['Who is known for the album "Thriller"?', 'Michael Jackson'],
          ['What hairstyle trend defined much of 80s fashion and rock culture?', 'Big, teased hair']
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
          ['What is "the ick"?', 'A sudden, irrational turn-off toward someone'],
          ['What does "delulu" mean, used about a crush?', 'Delusional, usually said jokingly'],
          ['What is "skin cycling"?', 'Rotating active skincare ingredients on a schedule to avoid irritation'],
          ['What is a "situationship"?', 'An undefined relationship without a clear label'],
          ['What is "girl dinner"?', 'A casual, often snack-based meal, usually eaten alone'],
          ['What is "main character energy"?', 'Acting or feeling like the protagonist of your own life'],
          ['What is "soft launching" a relationship?', 'Hinting at a new partner on social media without fully revealing them'],
          ['What is "double cleansing"?', 'Cleansing twice — oil-based then water-based — to fully remove makeup and SPF']
        ]
      },
      {
        name: 'a Man in 2026',
        questions: [
          ['What does "sigma" mean online?', 'A lone-wolf, independent, high-status male archetype'],
          ['What is "mewing"?', 'A jaw-exercise technique claimed to sharpen jawline definition'],
          ['What is a "grindset"?', 'A mindset focused on relentless hustle and self-improvement'],
          ['What is "looksmaxxing"?', 'Efforts, sometimes extreme, to maximize physical attractiveness'],
          ['What is "NPC behavior"?', 'Acting robotic or unoriginal, like a background video game character'],
          ['What supplement is most associated with gym culture for strength gains?', 'Creatine'],
          ['What does "cooked" mean, used casually?', 'Doomed or in trouble'],
          ['What is "delulu" as used ironically in self-belief content?', 'Confidently unrealistic self-belief, said jokingly']
        ]
      },
      {
        name: 'a Girl Dad',
        questions: [
          ['Who popularized the term "girl dad" in mainstream culture?', 'Kobe Bryant'],
          ['What is a "daddy-daughter dance"?', 'A formal father-daughter social event'],
          ['What hairstyle skill do many girl dads learn?', 'Braiding or doing ponytails'],
          ["What common social media trend involves daughters doing their dad's makeup?", 'Makeup/hair transformation videos'],
          ['What event type often requires a dad to sit through hours of recital music?', 'A dance recital'],
          ['What is a common "protective dad" trope about dating?', "Being overly cautious or intimidating toward a daughter's partners"],
          ['What toy category is a common gift stereotype for young daughters?', 'Dolls'],
          ['What activity is often associated with tea parties for young kids?', 'Pretend play with toy tea sets']
        ]
      },
      {
        name: "Someone's Boyfriend",
        questions: [
          ['What is considered a "green flag" in modern dating slang?', 'A positive trait signaling a healthy partner'],
          ['What is a "red flag" in dating?', 'A warning sign of problematic behavior'],
          ['What is "love bombing"?', 'Excessive early affection or gifts used to quickly win someone over'],
          ['What are the "5 love languages"?', 'Words of affirmation, touch, gifts, quality time, and acts of service'],
          ['What is a common "boyfriend duty" at a concert?', 'Holding the bag, filming for her, or getting drinks'],
          ['What does it mean to be "attentive" in a relationship?', 'Noticing and remembering small details about your partner'],
          ['What is "gaslighting"?', "Manipulating someone into doubting their own perception of reality"],
          ['What is "situationship"?', 'An undefined relationship without a clear label']
        ]
      },
      {
        name: 'a Bridesmaid',
        questions: [
          ['What is a "bridal shower"?', 'A pre-wedding party celebrating the bride, usually with gifts'],
          ['What is a "maid of honor"?', "The bride's chief bridesmaid or attendant"],
          ['What is a "bachelorette party"?', 'A pre-wedding celebration for the bride with friends'],
          ['What is a "bouquet toss"?', 'The bride throws her bouquet to unmarried guests — the catcher is said to marry next'],
          ['What color should wedding guests traditionally avoid wearing?', 'White'],
          ['Who typically chooses the bridesmaid dresses?', 'The bride'],
          ['What is a "save the date"?', 'An early notice sent before the formal wedding invitation'],
          ['What is traditionally given to bridesmaids as a thank-you?', 'Bridesmaid gifts, like jewelry or robes']
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
          ["What are South Africa's three capital cities?", 'Pretoria (administrative), Cape Town (legislative), and Bloemfontein (judicial)'],
          ['How many official languages does South Africa have?', '12, including South African Sign Language'],
          ["What's the South African currency called?", 'Rand'],
          ["Who was South Africa's first democratically elected president?", 'Nelson Mandela'],
          ['What is a "braai"?', 'A South African barbecue'],
          ["What's the nickname for the South African national rugby team?", 'The Springboks'],
          ['What mountain overlooks Cape Town?', 'Table Mountain'],
          ["What's biltong?", 'Dried, cured meat — a popular South African snack']
        ]
      },
      {
        name: 'American',
        questions: [
          ['How many states are in the US?', '50'],
          ['What document begins "We the People"?', 'The US Constitution'],
          ["What's celebrated on July 4th?", 'Independence Day'],
          ["What's the US currency?", 'The dollar'],
          ['What food is Thanksgiving traditionally centered around?', 'Turkey'],
          ["What's the nickname for the US flag?", 'Old Glory, or the Stars and Stripes'],
          ['Who is on the $1 bill?', 'George Washington'],
          ['What sport is the Super Bowl for?', 'American football']
        ]
      },
      {
        name: 'British',
        questions: [
          ['What’s British "tea time" traditionally?', 'An afternoon break with tea and light snacks'],
          ['What is a "chippy"?', 'A fish and chip shop'],
          ["What's the London Underground nicknamed?", 'The Tube'],
          ['What’s "Boxing Day"?', 'The day after Christmas — a public holiday'],
          ['What is a "biscuit" in British English?', 'What Americans would call a cookie'],
          ["What's the currency of the UK?", 'The pound sterling'],
          ['What word describes standing in an orderly line?', 'Queuing'],
          ['Who lives at 10 Downing Street?', 'The UK Prime Minister']
        ]
      },
      {
        name: 'Nigerian',
        questions: [
          ["What's Nigeria's most widely spoken official language?", 'English'],
          ['What is "jollof rice"?', 'A popular West African spiced rice dish'],
          ["What's Nigeria's currency?", 'The Naira'],
          ['What’s "Nollywood"?', "Nigeria's film industry"],
          ["What are Nigeria's three largest ethnic groups?", 'Hausa, Yoruba, and Igbo'],
          ['What genre has Nigerian artists like Burna Boy and Wizkid made globally popular?', 'Afrobeats'],
          ['What’s "suya"?', 'Spicy grilled meat skewers, a popular Nigerian street food'],
          ["What's Nigeria's capital city?", 'Abuja']
        ]
      },
      {
        name: 'Zulu',
        questions: [
          ['Who founded the Zulu Kingdom in the early 19th century?', 'Shaka Zulu'],
          ["What's the Zulu language called?", 'isiZulu'],
          ['What philosophy, shared across Nguni cultures, emphasizes shared humanity?', 'Ubuntu'],
          ["What's a sangoma?", 'A traditional healer and diviner'],
          ['What ceremony involves thousands of unmarried women presenting reeds to the king?', 'The Umhlanga, or Reed Dance'],
          ['What animal is a traditional symbol of wealth in Zulu culture?', 'Cattle'],
          ['What South African region is the Zulu homeland?', 'KwaZulu-Natal'],
          ['What high-kicking traditional dance is performed at weddings and celebrations?', 'Indlamu']
        ]
      },
      {
        name: 'a Tourist vs a Local',
        questions: [
          ['What do locals usually do that tourists often skip?', 'Ask locals for food recommendations instead of eating near landmarks'],
          ['What’s a "tourist trap"?', 'An overpriced attraction or restaurant that targets visitors'],
          ['What often gives away that someone is a tourist?', 'A map or phone constantly out, walking slowly, camera around the neck'],
          ['What is "haggling"?', 'Negotiating a lower price, common in markets'],
          ['What’s "jet lag"?', 'Fatigue and disorientation from crossing time zones quickly'],
          ['What should you research before visiting a new country to blend in?', 'Basic local customs and etiquette'],
          ['What transport tip do locals usually follow over single tickets?', 'Buying a local transit pass or card'],
          ['What do locals typically avoid doing during peak tourist hours at attractions?', 'Visiting at all — they go during off-peak times']
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
          ["What's the Hippocratic Oath?", 'An ethical oath doctors traditionally take'],
          ["What's a stethoscope used for?", 'Listening to heart and lung sounds'],
          ['What does "BP" stand for in a medical context?', 'Blood pressure'],
          ['What is a normal resting heart rate range for adults?', 'About 60–100 beats per minute'],
          ['What does "ER" stand for?', 'Emergency Room'],
          ['What does "GP" stand for?', 'General Practitioner'],
          ['What organ pumps blood through the body?', 'The heart'],
          ["What's an MRI used for?", 'Detailed internal imaging using magnetic fields']
        ]
      },
      {
        name: 'a Pharmacist',
        questions: [
          ['What does "OTC" stand for?', 'Over-the-counter'],
          ["What's a prescription?", 'A written order from a doctor for medication'],
          ["What's the generic name for Panado or Tylenol?", 'Paracetamol, also called acetaminophen'],
          ["What's a dispensary?", 'Where medicines are prepared and given out'],
          ['What does "NSAID" stand for?', 'Non-Steroidal Anti-Inflammatory Drug'],
          ['What should you always check before combining two medications?', 'Drug interactions'],
          ["What's the main difference between a generic and a brand-name drug?", 'Same active ingredient, usually cheaper, different brand name'],
          ['What’s a "controlled substance"?', 'A drug regulated due to potential for abuse or dependency']
        ]
      },
      {
        name: 'a Software Developer',
        questions: [
          ['What does "CSS" stand for?', 'Cascading Style Sheets'],
          ['What’s a "bug" in programming?', 'An error in code'],
          ['What’s "Git" used for?', 'Version control for code'],
          ['What does "API" stand for?', 'Application Programming Interface'],
          ['What language is primarily used for styling web pages?', 'CSS'],
          ['What’s a "function" in programming?', 'A reusable block of code that performs a task'],
          ['What’s "debugging"?', 'Finding and fixing errors in code'],
          ["What's the difference between frontend and backend?", 'Frontend is what users see and interact with; backend is server-side logic and data']
        ]
      },
      {
        name: 'a Lawyer',
        questions: [
          ['What’s "pro bono" work?', 'Legal work done for free, for the public good'],
          ['What’s a "plaintiff"?', 'The person bringing a lawsuit'],
          ['What’s a "defendant"?', 'The person being accused or sued'],
          ['What is "objection" used for in court?', 'To challenge something said or done during a trial'],
          ['What’s a "verdict"?', 'The formal decision or finding in a trial'],
          ['What legal principle means someone is presumed not guilty until proven otherwise?', 'The presumption of innocence'],
          ['What’s a "contract"?', 'A legally binding agreement between parties'],
          ['What’s "cross-examination"?', 'Questioning a witness called by the opposing side']
        ]
      },
      {
        name: 'a Chef',
        questions: [
          ['What is "mise en place"?', 'Having all ingredients prepped and organized before cooking'],
          ['What’s "deglazing"?', 'Adding liquid to a hot pan to lift browned bits for flavor'],
          ["What's the difference between braising and roasting?", 'Braising uses liquid and low heat; roasting uses dry heat in an oven'],
          ['What’s a "roux"?', 'A cooked mixture of fat and flour, used to thicken sauces'],
          ['What’s "julienne"?', 'Cutting food into thin, matchstick-sized strips'],
          ['What’s "al dente"?', 'Pasta cooked firm to the bite, not soft'],
          ['What’s "searing"?', 'Browning food quickly at high heat'],
          ['What are the five "mother sauces" in classic French cuisine?', 'Béchamel, velouté, espagnole, hollandaise, and tomato']
        ]
      },
      {
        name: 'a Teacher',
        questions: [
          ['What’s a "lesson plan"?', 'A structured outline for teaching a class'],
          ['What’s "differentiated instruction"?', 'Adapting teaching to different student needs and levels'],
          ['What’s a "rubric"?', 'A scoring guide outlining assessment criteria'],
          ['What’s "formative assessment"?', 'Ongoing checks for understanding during learning, before a final test'],
          ['What’s a "syllabus"?', "An outline of a course's content and requirements"],
          ['What is classroom management primarily about?', 'Maintaining an orderly, productive learning environment'],
          ['What does "IEP" stand for?', 'Individualized Education Plan'],
          ['What is a parent-teacher conference for?', "Discussing a student's progress with their parents"]
        ]
      },
      {
        name: 'an Athlete',
        questions: [
          ['What’s "VO2 max"?', 'A measure of the maximum oxygen the body can use during exercise'],
          ['What’s "carb loading"?', 'Eating extra carbs before an endurance event to build energy stores'],
          ['What does "DOMS" stand for?', 'Delayed Onset Muscle Soreness'],
          ['What does "PR" mean in athletics?', 'Personal Record'],
          ['What’s "interval training"?', 'Alternating high and low intensity exercise'],
          ['What’s "plyometrics"?', 'Explosive, jump-based training exercises'],
          ['What’s the purpose of a cool-down after exercise?', 'Gradually lowering heart rate and helping prevent injury'],
          ['What’s "overtraining"?', "Training beyond the body's ability to recover, causing performance decline"]
        ]
      },
      {
        name: 'a Musician',
        questions: [
          ['What’s a "time signature"?', 'It indicates how many beats are in each measure of music'],
          ['What’s "perfect pitch"?', 'The ability to identify a musical note without a reference'],
          ['What is a "key change," or modulation?', 'Shifting a song into a different musical key'],
          ['What’s "a cappella"?', 'Singing without instrumental accompaniment'],
          ['What is a "bridge" in a song?', 'A contrasting section connecting the verses and chorus'],
          ['What does "BPM" stand for?', 'Beats Per Minute'],
          ['Generally, how does a major key sound different from a minor key?', 'Major tends to sound brighter/happier; minor tends to sound darker/sadder'],
          ['What’s "freestyling" in rap?', 'Improvised, unscripted rapping']
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
          ['What’s "umami"?', 'The savory fifth basic taste'],
          ['What’s "sous vide"?', 'Cooking food sealed in a bag in a precise-temperature water bath'],
          ['What’s "farm-to-table"?', 'Sourcing ingredients directly from local farms'],
          ['What’s a "tasting menu"?', 'A curated series of small courses at a restaurant'],
          ['What’s "charcuterie"?', 'Cured meats, often served on a board with accompaniments'],
          ['What’s "fermentation"?', 'A process using bacteria or yeast to transform food, like kimchi or bread'],
          ['What’s "omakase"?', 'A Japanese dining style where the chef chooses the dishes'],
          ['What’s a "Michelin star"?', 'A prestigious rating awarded to top restaurants']
        ]
      },
      {
        name: 'a Gym Bro',
        questions: [
          ['What does "PR" stand for?', 'Personal Record'],
          ['What’s "leg day"?', 'A workout day focused on lower body muscles'],
          ['What’s "progressive overload"?', 'Gradually increasing weight or reps to build strength over time'],
          ['What are "macros"?', 'Macronutrients — protein, carbs, and fats'],
          ['What’s a "spotter"?', 'Someone who assists and safeguards during heavy lifts'],
          ['What does "DOMS" stand for?', 'Delayed Onset Muscle Soreness'],
          ['What’s the difference between "bulking" and "cutting"?', 'Bulking is eating a surplus to gain muscle; cutting is eating a deficit to lose fat'],
          ['What’s creatine commonly used for?', 'A supplement to boost strength and muscle performance']
        ]
      },
      {
        name: 'a Gamer',
        questions: [
          ['What does "FPS" stand for as a genre?', 'First-Person Shooter'],
          ['What’s "respawn"?', 'Reappearing in a game after dying'],
          ['What does "NPC" stand for?', 'Non-Playable Character'],
          ['What’s "speedrunning"?', 'Completing a game as fast as possible'],
          ['What’s "lag"?', 'A delay between input and game response, usually from a connection issue'],
          ['What’s a "loot box"?', 'A purchasable in-game item containing random rewards'],
          ['What does "MMO" stand for?', 'Massively Multiplayer Online'],
          ['What does "GG" mean?', '"Good Game" — said at the end of a match']
        ]
      },
      {
        name: 'a Swiftie',
        questions: [
          ["What's Taylor Swift's self-titled debut album year?", '2006'],
          ['What is a "Taylor’s Version" album?', 'A re-recording of one of her earlier albums, made to own her masters'],
          ['What album features the song "Anti-Hero"?', 'Midnights'],
          ["What's the nickname for Taylor Swift's fanbase?", 'Swifties'],
          ['What friendship-bracelet trend is associated with her concerts?', 'Fans trading handmade friendship bracelets'],
          ['What album featured "Love Story"?', 'Fearless'],
          ['What pastel color palette is associated with the "Lover" era?', 'Pink and blue'],
          ['What is the name of her record-breaking world tour that began in 2023?', 'The Eras Tour']
        ]
      },
      {
        name: 'a Marvel Fan',
        questions: [
          ['What does "MCU" stand for?', 'Marvel Cinematic Universe'],
          ["Who is Iron Man's alter ego?", 'Tony Stark'],
          ["What's Thor's hammer called?", 'Mjolnir'],
          ['What did Thanos collect to wipe out half of all life?', 'The Infinity Stones'],
          ['What are Marvel movies famous for including after the credits?', 'A post-credits scene teasing future films'],
          ['What company owns Marvel Studios?', 'Disney'],
          ["What's Spider-Man's civilian name?", 'Peter Parker'],
          ['Who is considered the first Avenger, chronologically in-universe?', 'Captain America, Steve Rogers']
        ]
      },
      {
        name: 'a True Crime Fan',
        questions: [
          ['What’s a "cold case"?', 'An unsolved crime with no recent leads'],
          ['What type of evidence is most commonly used to identify suspects today?', 'DNA evidence'],
          ['What technically defines a "serial killer"?', 'Someone who kills multiple victims in separate events over time'],
          ['What’s an "alibi"?', 'Evidence or testimony proving someone was elsewhere during a crime'],
          ['What’s "profiling" in a criminal investigation?', 'Analyzing behavior and evidence to infer characteristics of a suspect'],
          ['What is evidence gathered at a crime scene generally called?', 'Forensic evidence'],
          ['What media format became hugely popular for covering true crime cases in depth?', 'Podcasts'],
          ['What’s a "cold case unit"?', 'A police division dedicated to reinvestigating unsolved cases']
        ]
      },
      {
        name: 'a Wine Person',
        questions: [
          ['What’s "tannin"?', 'A compound, especially in red wine, that causes a dry, bitter sensation'],
          ['What’s "terroir"?', "The environmental factors — soil, climate — that shape a wine's character"],
          ['How does red wine production differ from white, broadly?', 'Red ferments with the grape skins; white typically does not'],
          ['What’s a "sommelier"?', 'A trained wine expert or steward'],
          ['What’s "decanting"?', 'Pouring wine into a separate vessel to let it aerate'],
          ["What does a wine's \"vintage\" refer to?", 'The year the grapes were harvested'],
          ['What creates the bubbles in traditional-method sparkling wine?', 'A second fermentation inside the bottle'],
          ['What three grapes is Champagne traditionally made from?', 'Chardonnay, Pinot Noir, and Pinot Meunier']
        ]
      },
      {
        name: 'a Car Guy',
        questions: [
          ['What does "RPM" stand for?', 'Revolutions Per Minute'],
          ['What’s a "turbocharger"?', 'A device that forces more air into the engine for more power'],
          ['What does "0-60" measure?', 'The time it takes a car to accelerate from 0 to 60 mph'],
          ['What’s "horsepower"?', "A unit measuring an engine's power"],
          ['How does a manual transmission differ from an automatic?', 'Manual requires the driver to shift gears; automatic shifts on its own'],
          ['What’s "torque"?', 'A measure of rotational force, affecting acceleration and towing power'],
          ['What’s a "hybrid" car?', 'A vehicle combining a combustion engine with an electric motor'],
          ['What does "AWD" stand for?', 'All-Wheel Drive']
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
          ['What’s "tummy time" for?', 'Helping infants build neck and shoulder strength'],
          ['What toddler phase involves frequent "no"?', 'The terrible twos'],
          ['What’s "co-sleeping"?', 'A baby sleeping in the same bed or room as parents'],
          ['What’s a "growth spurt"?', 'A period of rapid physical growth in children'],
          ['What’s "sleep training"?', 'Teaching an infant to fall and stay asleep independently'],
          ['What guidance do experts generally give about screen time for young kids?', 'Limiting it'],
          ['What’s a common first food when babies start solids?', 'Rice cereal or pureed fruits and vegetables'],
          ['What’s "potty training"?', 'Teaching a toddler to use the toilet']
        ]
      },
      {
        name: 'Married',
        questions: [
          ['What’s a "prenup"?', 'A prenuptial agreement made before marriage'],
          ['What is traditionally celebrated every year on the wedding date?', 'An anniversary'],
          ['What’s a "honeymoon"?', 'A vacation taken by newlyweds after the wedding'],
          ['What phrase from traditional vows means committing through hardship?', '"In sickness and in health"'],
          ['What’s a "joint account"?', 'A shared bank account between spouses'],
          ['What material is traditionally given for a first wedding anniversary?', 'Paper'],
          ['What phrase from traditional vows signals lifelong commitment?', '"Till death do us part"'],
          ['What’s a "vow renewal"?', 'A ceremony where a married couple reaffirms their vows']
        ]
      },
      {
        name: 'Someone in Their 20s',
        questions: [
          ['What is a "quarter-life crisis"?', 'A period of uncertainty or anxiety about life direction, often in your 20s'],
          ['What does "adulting" mean?', 'Doing responsible, grown-up tasks'],
          ['What financial milestone do many aim for in their 20s?', 'Building credit or saving for a first home'],
          ['What does "FOMO" stand for?', 'Fear Of Missing Out'],
          ['What’s a "starter apartment"?', 'A first, usually smaller or more affordable, apartment'],
          ['What is "networking" mainly used for professionally?', 'Building relationships and contacts for career opportunities'],
          ['What’s a "side hustle"?', 'Extra income-earning work outside a main job'],
          ['What is a credit score used to assess?', 'How trustworthy someone is for loans and credit']
        ]
      },
      {
        name: 'a College Student',
        questions: [
          ['What does "GPA" stand for?', 'Grade Point Average'],
          ['What’s a "syllabus" used for?', "Outlining a course's structure and requirements"],
          ['What are "office hours"?', 'Scheduled time when professors are available for student questions'],
          ['What cheap, easy meal is a classic student stereotype?', 'Ramen noodles'],
          ['What’s a "dorm"?', 'On-campus student housing'],
          ['What’s "cramming"?', 'Intense last-minute studying before an exam'],
          ['What’s a "major"?', "A student's primary field of study"],
          ['What’s "finals week"?', 'The period of final exams at the end of a term']
        ]
      },
      {
        name: 'Retired',
        questions: [
          ['What’s a "pension"?', 'Regular payments received after retirement, often from a former employer'],
          ['What is a commonly cited retirement age in many countries?', 'Around 65'],
          ['What does "downsizing" in retirement usually mean?', 'Moving to a smaller home'],
          ['What’s a "retirement fund"?', 'Savings or investments set aside for after work life'],
          ['What hobbies are commonly stereotyped with retirement?', 'Gardening, golf, or travel'],
          ['What’s an "empty nester"?', 'A parent whose children have moved out'],
          ['What’s a "bucket list"?', 'Things someone wants to do before they die'],
          ['What’s a "retirement village"?', 'A residential community designed for retirees']
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
          ['What does the Pythagorean theorem calculate?', 'The relationship between the sides of a right triangle'],
          ['What’s a "metaphor"?', 'A figure of speech that directly compares two unlike things'],
          ["What's photosynthesis?", 'The process plants use to convert light into energy'],
          ['Who wrote "Romeo and Juliet"?', 'William Shakespeare'],
          ["What's the boiling point of water at sea level, in Celsius?", '100°C'],
          ['What’s a "noun"?', 'A word for a person, place, thing, or idea'],
          ['What’s called the "powerhouse of the cell"?', 'The mitochondria'],
          ["What's the capital of France?", 'Paris']
        ]
      },
      {
        name: 'Street Smart',
        questions: [
          ["What's a common sign you're being scammed?", 'A deal that seems too good to be true, or pressure to act immediately'],
          ['What’s "situational awareness"?', 'Being conscious of your surroundings and potential risks'],
          ['What common tactic do pickpockets use?', 'Distraction, like bumping into you or asking for directions'],
          ['What is the value of negotiating a price instead of accepting the first offer?', 'You often end up paying less'],
          ['What’s a "con artist"?', 'Someone who deceives people for personal gain'],
          ['What is "reading the room"?', 'Sensing the mood and dynamics of a social situation'],
          ['What is a good habit when walking alone at night?', 'Staying aware and sticking to well-lit areas'],
          ['What’s a common rule about sharing personal information with strangers?', 'Avoid sharing sensitive details unnecessarily']
        ]
      },
      {
        name: 'a History Buff',
        questions: [
          ['What year did World War II end?', '1945'],
          ['Who was the first President of the United States?', 'George Washington'],
          ['What ancient civilization built the pyramids of Giza?', 'The ancient Egyptians'],
          ['What year did the Berlin Wall fall?', '1989'],
          ['Who was known as the "Iron Lady"?', 'Margaret Thatcher'],
          ['What empire did Julius Caesar rise to power in?', 'The Roman Republic, transitioning into the Roman Empire'],
          ["What year did South Africa hold its first democratic election?", '1994'],
          ['What era was primarily known for a revival of art, culture, and learning in Europe?', 'The Renaissance']
        ]
      },
      {
        name: 'Good at Geography',
        questions: [
          ["What's commonly cited as the world's longest river?", 'The Nile'],
          ["What's the smallest country in the world?", 'Vatican City'],
          ['What continent is the Sahara Desert located on?', 'Africa'],
          ["What's the capital of Australia?", 'Canberra — not Sydney'],
          ["What's the tallest mountain in the world?", 'Mount Everest'],
          ["What's the largest ocean?", 'The Pacific Ocean'],
          ['What country currently has the largest population in the world?', 'India'],
          ["What's the smallest continent by land area?", 'Australia']
        ]
      },
      {
        name: 'Financially Literate',
        questions: [
          ['What’s "compound interest"?', 'Interest calculated on both the initial amount and accumulated interest'],
          ['What’s a "credit score" used for?', 'Assessing how likely someone is to repay debt'],
          ['What’s an "emergency fund"?', 'Savings set aside for unexpected expenses'],
          ["What's the difference between a stock and a bond?", 'A stock is ownership in a company; a bond is a loan to a company or government'],
          ['What’s "diversification" in investing?', 'Spreading investments across assets to reduce risk'],
          ['What’s "inflation"?', 'The general rise in prices over time, which reduces purchasing power'],
          ['What’s a "budget"?', 'A plan for managing income and expenses'],
          ['What’s an "index fund"?', 'A fund that tracks a market index, like the S&P 500']
        ]
      },
      {
        name: 'a Science Nerd',
        questions: [
          ["What does Newton's First Law of Motion state?", 'An object stays at rest or in motion unless acted on by a force'],
          ['What does "DNA" stand for?', 'Deoxyribonucleic acid'],
          ["What's the speed of light, roughly?", 'About 300,000 km per second'],
          ["What's an atom's nucleus made up of?", 'Protons and neutrons'],
          ['What theory explains the origin of the universe?', 'The Big Bang theory'],
          ["What's photosynthesis?", 'The process plants use to convert sunlight into energy'],
          ["What's the periodic table organized by?", 'Atomic number'],
          ["What's gravity?", 'The force that attracts objects with mass toward each other']
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
          ['What does "AI" stand for?', 'Artificial Intelligence'],
          ['What’s a "large language model"?', 'An AI trained on massive text data to generate and understand language'],
          ['What’s "machine learning"?', 'A method where systems learn patterns from data rather than explicit programming'],
          ['What’s a "neural network" loosely modeled on?', "The human brain's structure of interconnected neurons"],
          ['What is an AI "hallucination"?', 'When an AI generates confident but incorrect or made-up information'],
          ['What’s "training data"?', 'The data used to teach an AI model'],
          ['What’s a "chatbot"?', 'A program designed to simulate conversation'],
          ['What’s "prompt engineering"?', 'Crafting inputs to get better outputs from an AI model']
        ]
      },
      {
        name: 'a Lie Detector',
        questions: [
          ['What does a polygraph actually measure?', 'Physiological signals like heart rate, breathing, and skin conductivity'],
          ['Are polygraph results generally admissible in court?', 'No — most courts consider them unreliable'],
          ['What’s a "baseline question" used for in a polygraph test?', 'Establishing a normal physiological response for comparison'],
          ['What’s a "micro-expression"?', 'A brief, involuntary facial expression revealing true emotion'],
          ['What common physiological response tends to increase when someone lies, per polygraph theory?', 'Heart rate and skin conductivity (sweating)'],
          ['What decade were modern polygraph tests developed in?', 'The 1920s'],
          ['What’s the main scientific criticism of lie detector accuracy?', "A high rate of false positives and negatives — it's not considered reliable"],
          ['What technique do some people try to use to "beat" a polygraph?', 'Countermeasures like controlled breathing']
        ]
      },
      {
        name: 'Fluent in Slang',
        questions: [
          ['What does "no cap" mean?', 'No lie, seriously'],
          ['What does "bet" mean, used as a response?', 'Okay, agreed'],
          ['What does "slay" mean?', 'To do something exceptionally well'],
          ['What does "sus" mean?', 'Suspicious'],
          ['What does "lowkey" mean?', 'Somewhat, or secretly'],
          ['What does "bussin’" mean?', 'Really good — usually said about food'],
          ['What does "ghosting" mean?', 'Suddenly cutting off all communication with someone'],
          ['What does "simp" mean?', 'Someone excessively attentive or submissive toward someone they like']
        ]
      },
      {
        name: 'Someone Who Actually Watches the News',
        questions: [
          ['What body sets interest rates in South Africa?', 'The South African Reserve Bank (SARB)'],
          ['What’s "inflation," as commonly reported?', 'The rate at which prices rise over time'],
          ['What international body issues major global climate reports?', 'The IPCC — Intergovernmental Panel on Climate Change'],
          ['What’s a "recession" in economic terms?', 'A significant decline in economic activity, often measured as two straight quarters of GDP contraction'],
          ['What term describes scheduled power outages, familiar in South Africa?', 'Load shedding'],
          ['What global body is the United Nations Security Council part of?', 'The United Nations'],
          ['What US institution is commonly cited as setting the benchmark interest rate?', 'The Federal Reserve'],
          ['What’s "GDP" short for?', 'Gross Domestic Product']
        ]
      },
      {
        name: 'an Adult (Basic Life Admin)',
        questions: [
          ['What’s a "credit score" used for?', 'Determining creditworthiness for loans'],
          ['What is the purpose of an emergency fund?', 'Covering unexpected expenses without going into debt'],
          ['What’s a "lease"?', 'A legal agreement to rent property for a set period'],
          ['What’s "tax season" generally about?', 'The period for filing annual income tax returns'],
          ['What is a "debit order" or direct debit?', 'An automatic, recurring payment from your bank account'],
          ['What is the point of renters or home insurance?', 'Financial protection against loss or damage to belongings or property'],
          ['What’s a "warranty"?', 'A guarantee covering repair or replacement of a product for a set period'],
          ['What’s "budgeting"?', 'Planning income and expenses to manage money effectively']
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
