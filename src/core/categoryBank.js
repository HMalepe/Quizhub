/**
 * "Can You Pass As..." — 50 identity-check trivia categories, grouped into
 * 8 sections, 8 questions each (400 total). Sourced from the uploaded
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
  }
];

/** Flat name → [question, answer][] lookup, built from SECTIONS. */
export const CATEGORY_BANK = SECTIONS.reduce((bank, { categories }) => {
  for (const { name, questions } of categories) bank[name] = questions;
  return bank;
}, {});

export const CATEGORY_NAMES = Object.keys(CATEGORY_BANK);
