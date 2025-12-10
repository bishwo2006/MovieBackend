// Sample movie data to insert into MongoDB
const movies = [
  {
    title: "Avengers: Endgame",
    description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions.",
    imageUrl: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    rating: 8.4,
    ratingCount: "1.2M",
    duration: "3h 2min",
    genre: ["Action", "Adventure", "Drama"],
    releaseDate: "2019-04-26",
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"],
    isFeatured: true,
    isPremiered: false,
    trailerUrl: "https://youtube.com/embed/TcMBFSGVi1c",
    price: 12.99
  },
  {
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    imageUrl: "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    rating: 8.7,
    ratingCount: "450K",
    duration: "2h 46min",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    releaseDate: "2024-03-01",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Javier Bardem", "Josh Brolin"],
    isFeatured: true,
    isPremiered: true,
    trailerUrl: "https://youtube.com/embed/Way9Dexny3w",
    price: 14.99
  },
  {
    title: "The Batman",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
    imageUrl: "https://image.tmdb.org/t/p/original/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    rating: 7.8,
    ratingCount: "890K",
    duration: "2h 56min",
    genre: ["Action", "Crime", "Drama"],
    releaseDate: "2022-03-04",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright", "John Turturro"],
    isFeatured: true,
    isPremiered: false,
    trailerUrl: "https://youtube.com/embed/mqqft2x_Aa4",
    price: 11.99
  },
  {
    title: "Spider-Man: No Way Home",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    imageUrl: "https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    rating: 8.2,
    ratingCount: "1.5M",
    duration: "2h 28min",
    genre: ["Action", "Adventure", "Fantasy"],
    releaseDate: "2021-12-17",
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon", "Willem Dafoe"],
    isFeatured: true,
    isPremiered: false,
    trailerUrl: "https://youtube.com/embed/JfVOs4VSpmA",
    price: 13.49
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    imageUrl: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.6,
    ratingCount: "2.1M",
    duration: "2h 49min",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    releaseDate: "2014-11-07",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Matt Damon"],
    isFeatured: false,
    isPremiered: false,
    trailerUrl: "https://youtube.com/embed/zSWdZVtXT7E",
    price: 9.99
  },
  {
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    imageUrl: "https://image.tmdb.org/t/p/original/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    rating: 8.6,
    ratingCount: "950K",
    duration: "2h 12min",
    genre: ["Comedy", "Drama", "Thriller"],
    releaseDate: "2019-11-08",
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik", "Park So-dam"],
    isFeatured: true,
    isPremiered: false,
    trailerUrl: "https://youtube.com/embed/5xH0HfJHsaY",
    price: 10.49
  },
  {
    title: "Joker",
    description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.",
    imageUrl: "https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    rating: 8.4,
    ratingCount: "1.3M",
    duration: "2h 2min",
    genre: ["Crime", "Drama", "Thriller"],
    releaseDate: "2019-10-04",
    director: "Todd Phillips",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz", "Frances Conroy", "Brett Cullen"],
    isFeatured: true,
    isPremiered: false,
    trailerUrl: "https://youtube.com/embed/zAGVQLHvwOY",
    price: 11.29
  },
  {
    title: "Top Gun: Maverick",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission.",
    imageUrl: "https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    rating: 8.3,
    ratingCount: "850K",
    duration: "2h 10min",
    genre: ["Action", "Drama"],
    releaseDate: "2022-05-27",
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm", "Glen Powell"],
    isFeatured: true,
    isPremiered: true,
    trailerUrl: "https://youtube.com/embed/giXco2jaZ_4",
    price: 14.99
  },
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    imageUrl: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    rating: 9.3,
    ratingCount: "2.8M",
    duration: "2h 22min",
    genre: ["Drama"],
    releaseDate: "1994-10-14",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler", "Clancy Brown"],
    isFeatured: false,
    isPremiered: false,
    trailerUrl: "https://youtube.com/embed/6hB3S9bIaco",
    price: 7.99
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imageUrl: "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    rating: 8.8,
    ratingCount: "2.4M",
    duration: "2h 28min",
    genre: ["Action", "Sci-Fi", "Thriller"],
    releaseDate: "2010-07-16",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy", "Ken Watanabe"],
    isFeatured: true,
    isPremiered: false,
    trailerUrl: "https://youtube.com/embed/YoHD9XEInc0",
    price: 10.99
  }
];

// Function to insert movies into database
const insertMovies = async () => {
  try {
    const Movie = require('./models/Movie');
    await Movie.insertMany(movies);
    console.log('Movies inserted successfully');
  } catch (error) {
    console.error('Error inserting movies:', error);
  }
};


const halls = [
  { name: "PVR Cinemas", location: "Kathmandu", priceRange:{min:250,max:450}, totalSeats:200, bookedSeats:120, amenities:["IMAX","Dolby Atmos"], isIMAX:true, isDolbyAtmos:true, hasReclinerSeats:true, hasFoodService:true, distance:2.5, showTimes:["10:00 AM","1:00 PM","4:00 PM","7:00 PM"] },
  { name: "QFX Civil Mall", location:"Sundhara", priceRange:{min:220,max:400}, totalSeats:180, bookedSeats:50, amenities:["Dolby Atmos","3D"], isDolbyAtmos:true, hasFoodService:true, distance:4.2, showTimes:["9:00 AM","12:15 PM","3:30 PM","6:45 PM","10:00 PM"] },
  { name: "QFX Bhaktapur", location:"Chyamasingh", priceRange:{min:200,max:380}, totalSeats:160, bookedSeats:80, amenities:["Parking","Cafe"], distance:6.1, showTimes:["11:00 AM","2:00 PM","5:00 PM","8:00 PM"] },
  { name: "Bsr Movies", location:"Gongabu", priceRange:{min:180,max:350}, totalSeats:150, bookedSeats:30, amenities:["Recliners","Snacks"], hasReclinerSeats:true, showTimes:["10:30 AM","1:30 PM","4:30 PM","7:30 PM"] },
  { name: "One Cinemas", location:"New Baneshwor", priceRange:{min:240,max:410}, totalSeats:170, bookedSeats:100, amenities:["Dolby Atmos","Food Service"], isDolbyAtmos:true, hasFoodService:true, showTimes:["11:15 AM","3:00 PM","6:45 PM","9:45 PM"] },
  { name: "Kamal Pokhari Multiplex", location:"Kamal Pokhari", priceRange:{min:260,max:480}, totalSeats:220, bookedSeats:200, amenities:["IMAX","VIP Recliners"], isIMAX:true, hasReclinerSeats:true, showTimes:["10:00 AM","2:00 PM","6:00 PM"] },
  { name: "FCUBE", location:"Mitrapark", priceRange:{min:210,max:390}, totalSeats:190, bookedSeats:60, amenities:["Parking","Cafe"], showTimes:["12:00 PM","3:30 PM","7:00 PM"] },
  { name: "Gopi Krishna Movies", location:"Chabahil", priceRange:{min:170,max:340}, totalSeats:140, bookedSeats:40, amenities:["Fast Food","3D"], showTimes:["10:15 AM","1:45 PM","5:15 PM","8:45 PM"] },
  { name: "QFX Labim", location:"Pulchowk", priceRange:{min:280,max:500}, totalSeats:250, bookedSeats:230, amenities:["IMAX","Dolby Atmos","VIP"], isIMAX:true, isDolbyAtmos:true, hasReclinerSeats:true, showTimes:["9:30 AM","12:50 PM","4:10 PM","7:30 PM","10:50 PM"] },
  { name: "MidTown Cinema", location:"Kalanki", priceRange:{min:200,max:350}, totalSeats:160, bookedSeats:75, amenities:["AC","Snacks"], showTimes:["10:45 AM","2:15 PM","5:45 PM","9:15 PM"] }
];


module.exports = movies;