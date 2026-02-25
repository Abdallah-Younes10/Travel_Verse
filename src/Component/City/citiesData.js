
const citiesData = [
     {
    name: "France",
    video: "France.mp4",
    posterImage: "france.jpg",
    posterText: "Experience the charm of France with its romantic cities and world-class cuisine."
  },
  {
    name: "Egypt",
    video: "Egypt.mp4",
    posterImage: "egypt.jpg",
    posterText: "Explore the ancient wonders and vibrant culture of Egypt."
  },
  {
    name: "Argentina",
    video: "Argentina.mp4",
    posterImage: "argentina.jpg",
    posterText: "Feel the rhythm of tango and the thrill of Patagonian landscapes."
  },
  {
    name: "Bolivia",
    video: "Bolivia.mp4",
    posterImage: "bolivia.jpg",
    posterText: "Adventure through Bolivia's highlands and salt flats."
  },
  {
    name: "Brazil",
    video: "Brazil.mp4",
    posterImage: "brazil.jpg",
    posterText: "Dance through the vibrant streets of Rio and lush Amazon rainforests."
  },
  {
    name: "Chile",
    video: "Chile.mp4",
    posterImage: "chile.jpg",
    posterText: "From desert to glaciers, Chile's landscapes are unmatched."
  },
  {
    name: "Colombia",
    video: "Colombia.mp4",
    posterImage: "colombia.jpg",
    posterText: "Colorful cities and coffee hills await in Colombia."
  },
  {
    name: "Peru",
    video: "Peru.mp4",
    posterImage: "peru.jpg",
    posterText: "Walk in the footsteps of the Incas through ancient Peru."
  },
  {
    name: "Ghana",
    video: "Ghana.mp4",
    posterImage: "ghana.jpg",
    posterText: "Discover Ghana's rich heritage and warm hospitality."
  },
  {
    name: "Kenya",
    video: "Kenya.mp4",
    posterImage: "kenya.jpg",
    posterText: "Witness the majestic wildlife and landscapes of Kenya."
  },
  {
    name: "Morocco",
    video: "Morocco.mp4",
    posterImage: "morocco.jpg",
    posterText: "Stroll through colorful souks and desert dunes in Morocco."
  },
  {
    name: "India",
    video: "India.mp4",
    posterImage: "india.jpg",
    posterText: "A kaleidoscope of colors, cultures, and spirituality."
  },
  {
    name: "China",
    video: "China.mp4",
    posterImage: "china.jpg",
    posterText: "Explore ancient dynasties and modern marvels in China."
  },
  {
    name: "Japan",
    video: "Japan.mp4",
    posterImage: "japan.jpg",
    posterText: "Balance tradition and technology in beautiful Japan."
  },
  {
    name: "Kyrgyzstan",
    video: "Kyrgyzstan.mp4",
    posterImage: "kyrgyzstan.jpg",
    posterText: "Mountains, nomads, and untouched natural beauty."
  },
  {
    name: "Myanmar",
    video: "Myanmar.mp4",
    posterImage: "myanmar.jpg",
    posterText: "Golden pagodas and timeless traditions await in Myanmar."
  },
  {
    name: "Canada",
    video: "Canada.mp4",
    posterImage: "canada.jpg",
    posterText: "Vast wilderness and welcoming cities in Canada."
  },
  {
    name: "Mexico",
    video: "Mexico.mp4",
    posterImage: "mexico.jpg",
    posterText: "From beaches to pyramids, discover magical Mexico."
  },
  {
    name: "USA",
    video: "USA.mp4",
    posterImage: "usa.jpg",
    posterText: "Explore diverse landscapes and cultures across America."
  },
    { name: "Belgium", video: "Belgium.mp4", posterImage: "belgiumPoster", posterText: "Belgium is a hidden gem of Europe, with medieval towns, chocolate, and a rich history of art." },
  { name: "Croatia", video: "Croatia.mp4", posterImage: "croatiaPoster", posterText: "From Dubrovnik’s ancient walls to the stunning Adriatic coast, Croatia is full of surprises." },
  { name: "England", video: "England.mp4", posterImage: "englandPoster", posterText: "Explore the charm of English countryside and iconic cities like London and Oxford." },
  { name: "Germany", video: "Germany.mp4", posterImage: "germanyPoster", posterText: "From fairytale castles to vibrant cities, Germany offers a unique blend of tradition and innovation." },
  { name: "Ireland", video: "Ireland.mp4", posterImage: "irelandPoster", posterText: "Ireland's green hills, lively pubs, and rich folklore make it a must-visit destination." },
  { name: "Italy", video: "Italy.mp4", posterImage: "italyPoster", posterText: "Enjoy Italian cuisine, historic landmarks, and beautiful coastlines from Rome to Venice." },
  { name: "Netherlands", video: "Netherland.mp4", posterImage: "netherlandsPoster", posterText: "The Netherlands enchants with tulip fields, windmills, and the artistic charm of Amsterdam." },
  { name: "Norway", video: "Norway.mp4", posterImage: "norwayPoster", posterText: "Norway's fjords, northern lights, and Viking heritage await your discovery." },
  { name: "Poland", video: "Poland.mp4", posterImage: "polandPoster", posterText: "Explore medieval towns, mountains, and the cultural heart of Eastern Europe in Poland." },
  { name: "Portugal", video: "Portugal.mp4", posterImage: "portugalPoster", posterText: "Portugal offers sunny beaches, historic cities, and world-famous cuisine." },
  { name: "Russia", video: "Russia.mp4", posterImage: "russiaPoster", posterText: "Discover Russia’s imperial cities, vast landscapes, and iconic cathedrals." },
  { name: "Spain", video: "Spain.mp4", posterImage: "spainPoster", posterText: "Dance with passion in Spain, where flamenco, tapas, and historic marvels come alive." },
  { name: "Sweden", video: "Sweden.mp4", posterImage: "swedenPoster", posterText: "Sweden invites you to explore its forests, design culture, and progressive lifestyle." },
  { name: "Switzerland", video: "Switzerland.mp4", posterImage: "switzerlandPoster", posterText: "Home to the Alps, Switzerland offers unmatched nature, chocolate, and serenity." },
  { name: "Turkey", video: "Turkeya.mp4", posterImage: "turkeyPoster", posterText: "Straddling Europe and Asia, Turkey is a fusion of empires, flavors, and ancient cities." },
  { name: "Palestine", video: "Palestine.mp4", posterImage: "palestinePoster", posterText: "Palestine is rich with heritage, history, and spiritual significance." },
  { name: "UAE", video: "UAE.mp4", posterImage: "uaePoster", posterText: "A land of skyscrapers and deserts, the UAE blends modern luxury with Bedouin tradition." },
  { name: "Saudia", video: "Saudia.mp4", posterImage: "saudiaPoster", posterText: "From ancient ruins to modern marvels, Saudi Arabia is opening its doors to the world." },
  { name: "Cuba", video: "Cuba.mp4", posterImage: "cubaPoster", posterText: "Cuba offers colonial charm, vintage cars, and Caribbean rhythms." },
  { name: "Cambodia", video: "Malaysia.mp4", posterImage: "cambodiaPoster", posterText: "Explore ancient temples and vibrant markets in the heart of Southeast Asia." },
  { name: "Taiwan", video: "Romania.mp4", posterImage: "taiwanPoster", posterText: "Taiwan's mountains, tech cities, and street food make it unforgettable." },
  { name: "Thailand", video: "Scotland.mp4", posterImage: "thailandPoster", posterText: "From temples to tropical islands, Thailand is pure paradise." },
  { name: "SouthKorea", video: "South Korea.mp4", posterImage: "southKoreaPoster", posterText: "South Korea is a dynamic mix of high-tech cities and ancient palaces." },
  { name: "Tunisia", video: "Tunisia.mp4", posterImage: "tunisiaPoster", posterText: "Tunisia is a treasure trove of Roman ruins, Mediterranean beaches, and Sahara dunes." },
  { name: "Madagascar", video: "Madagascar.mp4", posterImage: "madagascarPoster", posterText: "An island of biodiversity, Madagascar offers adventures like no other." },
  { name: "southAfrica", video: "Kenya.mp4", posterImage: "southAfricaPoster", posterText: "South Africa dazzles with wildlife, culture, and dramatic landscapes." },
  { name: "Namibia", video: "Madagascar.mp4", posterImage: "namibiaPoster", posterText: "Namibia’s deserts and wildlife safaris are a dream for explorers." },
  { name: "Zambia", video: "Kenya.mp4", posterImage: "zambiaPoster", posterText: "Home to Victoria Falls, Zambia is an untouched natural wonder." },
  { name: "Mozambique", video: "Madagascar.mp4", posterImage: "mozambiquePoster", posterText: "Mozambique’s coastlines and culture are full of soul and beauty." },
  { name: "HongKong", video: "Japan.mp4", posterImage: 'hongKongPoster', posterText: "Where East meets West, Hong Kong is a city of contrasts." },
  { name: "Indonesia", video: "Romania.mp4", posterImage: "indonesiaPoster", posterText: "Indonesia is a tropical archipelago filled with islands and adventures." },
  { name: "Malaysia", video: "Malaysia.mp4", posterImage: "malaysiaPoster", posterText: "Malaysia blends modern cities with lush jungles and cultural diversity." },
  { name: "Maldives", video: "Cuba.mp4", posterImage: "maldivesPoster", posterText: "Maldives is the epitome of luxury and turquoise water escapes." },
  { name: "Denmark", video: "Sweden.mp4", posterImage: "denmarkPoster", posterText: "Denmark offers stylish cities, Viking history, and a cozy lifestyle." },
  { name: "Finland", video: "Poland.mp4", posterImage: "finlandPoster", posterText: "Finland is the land of saunas, northern lights, and endless lakes." },
  { name: "Iceland", video: "Iceland.mp4", posterImage: "icelandPoster", posterText: "Iceland’s volcanoes, geysers, and glaciers will leave you in awe." },
  { name: "Romania", video: "Romania.mp4", posterImage: "romaniaPoster", posterText: "Discover Romania’s castles, Carpathians, and colorful culture." },
  { name: "Scotland", video: "Scotland.mp4", posterImage: "scotlandPoster", posterText: "Scotland’s lochs, whisky, and legends make it magical." },
  { name: "Serbia", video: "Portugal.mp4", posterImage: "serbiaPoster", posterText: "Serbia is a Balkan beauty rich in nightlife, history, and warmth." },
  { name: "Panama", video: "Norway.mp4", posterImage: "panamaPoster", posterText: "Panama connects continents and surprises with beaches and biodiversity." },
  { name: "CostaRica", video: "Kyrgyzstan.mp4", posterImage: "costaRicaPoster", posterText: "Costa Rica is a green paradise of rainforests and wildlife." }


  ];

  export default citiesData;
