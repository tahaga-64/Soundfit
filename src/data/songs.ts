import type { Song } from '@/types';

// モック楽曲データ（日本のアーティスト）
export const songs: Song[] = [
  // ヒップホップ
  { id: 'song-1', title: 'My Life', artist: 'ZORN', album: 'My Life', genre: 'hiphop', year: 2020, coverUrl: 'https://picsum.photos/seed/song1/300/300', votes: 342 },
  { id: 'song-2', title: '夢追人', artist: 'PUNPEE', album: 'MODERN TIMES', genre: 'hiphop', year: 2017, coverUrl: 'https://picsum.photos/seed/song2/300/300', votes: 289 },
  { id: 'song-3', title: 'よふかしのうた', artist: 'Creepy Nuts', album: 'Case', genre: 'hiphop', year: 2022, coverUrl: 'https://picsum.photos/seed/song3/300/300', votes: 415 },
  { id: 'song-4', title: 'Kawasaki Drift', artist: 'BAD HOP', album: 'BAD HOP WORLD', genre: 'hiphop', year: 2019, coverUrl: 'https://picsum.photos/seed/song4/300/300', votes: 198 },
  { id: 'song-5', title: 'JUNJI TAKADA', artist: 'KOHH', album: 'DIRT II', genre: 'hiphop', year: 2018, coverUrl: 'https://picsum.photos/seed/song5/300/300', votes: 267 },
  { id: 'song-6', title: '最ッ低のMC', artist: '般若', album: 'コンサート', genre: 'hiphop', year: 2016, coverUrl: 'https://picsum.photos/seed/song6/300/300', votes: 178 },
  { id: 'song-7', title: 'Bling-Bang-Bang-Born', artist: 'Creepy Nuts', album: 'Bling-Bang-Bang-Born', genre: 'hiphop', year: 2024, coverUrl: 'https://picsum.photos/seed/song7/300/300', votes: 523 },
  { id: 'song-8', title: 'Letter', artist: 'ZORN', album: 'LIFE STORY', genre: 'hiphop', year: 2019, coverUrl: 'https://picsum.photos/seed/song8/300/300', votes: 231 },

  // ロック
  { id: 'song-9', title: '白日', artist: 'King Gnu', album: 'CEREMONY', genre: 'rock', year: 2019, coverUrl: 'https://picsum.photos/seed/song9/300/300', votes: 587 },
  { id: 'song-10', title: '前前前世', artist: 'RADWIMPS', album: '人間開花', genre: 'rock', year: 2016, coverUrl: 'https://picsum.photos/seed/song10/300/300', votes: 498 },
  { id: 'song-11', title: 'Wherever You Are', artist: 'ONE OK ROCK', album: '35xxxv', genre: 'rock', year: 2015, coverUrl: 'https://picsum.photos/seed/song11/300/300', votes: 412 },
  { id: 'song-12', title: 'ワタリドリ', artist: '[Alexandros]', album: 'EXIST!', genre: 'rock', year: 2015, coverUrl: 'https://picsum.photos/seed/song12/300/300', votes: 356 },
  { id: 'song-13', title: '天体観測', artist: 'BUMP OF CHICKEN', album: 'jupiter', genre: 'rock', year: 2001, coverUrl: 'https://picsum.photos/seed/song13/300/300', votes: 534 },
  { id: 'song-14', title: 'リライト', artist: 'ASIAN KUNG-FU GENERATION', album: 'ソルファ', genre: 'rock', year: 2004, coverUrl: 'https://picsum.photos/seed/song14/300/300', votes: 389 },
  { id: 'song-15', title: 'カメレオン', artist: 'King Gnu', album: 'THE GREATEST UNKNOWN', genre: 'rock', year: 2023, coverUrl: 'https://picsum.photos/seed/song15/300/300', votes: 312 },
  { id: 'song-16', title: 'スパークル', artist: 'RADWIMPS', album: '君の名は。', genre: 'rock', year: 2016, coverUrl: 'https://picsum.photos/seed/song16/300/300', votes: 445 },

  // V系
  { id: 'song-17', title: 'FILTH IN THE BEAUTY', artist: 'the GazettE', album: 'STACKED RUBBISH', genre: 'visualkei', year: 2007, coverUrl: 'https://picsum.photos/seed/song17/300/300', votes: 267 },
  { id: 'song-18', title: 'VINUSHKA', artist: 'DIR EN GREY', album: 'UROBOROS', genre: 'visualkei', year: 2008, coverUrl: 'https://picsum.photos/seed/song18/300/300', votes: 234 },
  { id: 'song-19', title: '紅', artist: 'X JAPAN', album: 'BLUE BLOOD', genre: 'visualkei', year: 1989, coverUrl: 'https://picsum.photos/seed/song19/300/300', votes: 567 },
  { id: 'song-20', title: 'DRESS', artist: 'BUCK-TICK', album: 'TABOO', genre: 'visualkei', year: 1989, coverUrl: 'https://picsum.photos/seed/song20/300/300', votes: 198 },
  { id: 'song-21', title: 'HONEY', artist: "L'Arc~en~Ciel", album: 'HEART', genre: 'visualkei', year: 1998, coverUrl: 'https://picsum.photos/seed/song21/300/300', votes: 478 },
  { id: 'song-22', title: 'UGLY', artist: 'the GazettE', album: 'BEAUTIFUL DEFORMITY', genre: 'visualkei', year: 2013, coverUrl: 'https://picsum.photos/seed/song22/300/300', votes: 189 },
  { id: 'song-23', title: 'Tears', artist: 'X JAPAN', album: 'DAHLIA', genre: 'visualkei', year: 1996, coverUrl: 'https://picsum.photos/seed/song23/300/300', votes: 445 },

  // シティポップ
  { id: 'song-24', title: 'Plastic Love', artist: '竹内まりや', album: 'VARIETY', genre: 'citypop', year: 1984, coverUrl: 'https://picsum.photos/seed/song24/300/300', votes: 612 },
  { id: 'song-25', title: 'RIDE ON TIME', artist: '山下達郎', album: 'RIDE ON TIME', genre: 'citypop', year: 1980, coverUrl: 'https://picsum.photos/seed/song25/300/300', votes: 534 },
  { id: 'song-26', title: '明るい未来', artist: 'never young beach', album: 'YASHINOKI HOUSE', genre: 'citypop', year: 2015, coverUrl: 'https://picsum.photos/seed/song26/300/300', votes: 287 },
  { id: 'song-27', title: 'TOKYO TOWER', artist: '角松敏生', album: 'SEA IS A LADY', genre: 'citypop', year: 1987, coverUrl: 'https://picsum.photos/seed/song27/300/300', votes: 198 },
  { id: 'song-28', title: '都会', artist: '大貫妙子', album: 'SUNSHOWER', genre: 'citypop', year: 1977, coverUrl: 'https://picsum.photos/seed/song28/300/300', votes: 256 },
  { id: 'song-29', title: '真夜中のドア', artist: '松原みき', album: 'POCKET PARK', genre: 'citypop', year: 1979, coverUrl: 'https://picsum.photos/seed/song29/300/300', votes: 589 },
  { id: 'song-30', title: 'お気に召すまま', artist: 'never young beach', album: 'A GOOD TIME', genre: 'citypop', year: 2017, coverUrl: 'https://picsum.photos/seed/song30/300/300', votes: 234 },

  // EDM
  { id: 'song-31', title: 'ポリリズム', artist: 'Perfume', album: 'GAME', genre: 'edm', year: 2007, coverUrl: 'https://picsum.photos/seed/song31/300/300', votes: 478 },
  { id: 'song-32', title: 'Starry Sky', artist: 'capsule', album: 'FRUITS CLiPPER', genre: 'edm', year: 2006, coverUrl: 'https://picsum.photos/seed/song32/300/300', votes: 234 },
  { id: 'song-33', title: 'come again', artist: 'm-flo', album: 'EXPO EXPO', genre: 'edm', year: 2001, coverUrl: 'https://picsum.photos/seed/song33/300/300', votes: 367 },
  { id: 'song-34', title: 'NANIMONO', artist: '中田ヤスタカ', album: 'Digital Native', genre: 'edm', year: 2016, coverUrl: 'https://picsum.photos/seed/song34/300/300', votes: 189 },
  { id: 'song-35', title: 'No.1', artist: 'tofubeats', album: 'First Album', genre: 'edm', year: 2014, coverUrl: 'https://picsum.photos/seed/song35/300/300', votes: 312 },
  { id: 'song-36', title: 'チョコレイト・ディスコ', artist: 'Perfume', album: 'GAME', genre: 'edm', year: 2007, coverUrl: 'https://picsum.photos/seed/song36/300/300', votes: 445 },
  { id: 'song-37', title: 'FLASH', artist: 'Perfume', album: 'COSMIC EXPLORER', genre: 'edm', year: 2016, coverUrl: 'https://picsum.photos/seed/song37/300/300', votes: 278 },

  // ジャズ
  { id: 'song-38', title: 'Tom & Jerry', artist: '上原ひろみ', album: 'Spiral', genre: 'jazz', year: 2005, coverUrl: 'https://picsum.photos/seed/song38/300/300', votes: 234 },
  { id: 'song-39', title: '疾走する閃光', artist: 'fox capture plan', album: 'COVERMIND', genre: 'jazz', year: 2015, coverUrl: 'https://picsum.photos/seed/song39/300/300', votes: 189 },
  { id: 'song-40', title: 'SUMMER GODDESS', artist: 'SOIL&"PIMP"SESSIONS', album: 'PIMPIN\'', genre: 'jazz', year: 2006, coverUrl: 'https://picsum.photos/seed/song40/300/300', votes: 167 },
  { id: 'song-41', title: 'Akatsuki', artist: "PE'Z", album: '九月の空 -KUGATSU NO SORA-', genre: 'jazz', year: 2003, coverUrl: 'https://picsum.photos/seed/song41/300/300', votes: 145 },
  { id: 'song-42', title: 'Place To Be', artist: '上原ひろみ', album: 'Place To Be', genre: 'jazz', year: 2009, coverUrl: 'https://picsum.photos/seed/song42/300/300', votes: 198 },
  { id: 'song-43', title: 'Butterfly Effect', artist: 'fox capture plan', album: 'BUTTERFLY', genre: 'jazz', year: 2018, coverUrl: 'https://picsum.photos/seed/song43/300/300', votes: 156 },

  // R&B
  { id: 'song-44', title: 'Automatic', artist: '宇多田ヒカル', album: 'First Love', genre: 'rnb', year: 1998, coverUrl: 'https://picsum.photos/seed/song44/300/300', votes: 612 },
  { id: 'song-45', title: '恋におちたら', artist: 'Crystal Kay', album: 'Color Change!', genre: 'rnb', year: 2005, coverUrl: 'https://picsum.photos/seed/song45/300/300', votes: 345 },
  { id: 'song-46', title: 'やさしさで溢れるように', artist: 'JUJU', album: 'YOU', genre: 'rnb', year: 2009, coverUrl: 'https://picsum.photos/seed/song46/300/300', votes: 298 },
  { id: 'song-47', title: 'Story', artist: 'AI', album: 'MIC-A-HOLIC A.I.', genre: 'rnb', year: 2005, coverUrl: 'https://picsum.photos/seed/song47/300/300', votes: 389 },
  { id: 'song-48', title: 'EXCITE', artist: '三浦大知', album: 'HIT', genre: 'rnb', year: 2017, coverUrl: 'https://picsum.photos/seed/song48/300/300', votes: 267 },
  { id: 'song-49', title: 'First Love', artist: '宇多田ヒカル', album: 'First Love', genre: 'rnb', year: 1999, coverUrl: 'https://picsum.photos/seed/song49/300/300', votes: 578 },
  { id: 'song-50', title: '(RE)PLAY', artist: '三浦大知', album: 'BEST', genre: 'rnb', year: 2016, coverUrl: 'https://picsum.photos/seed/song50/300/300', votes: 212 },

  // パンク
  { id: 'song-51', title: 'Stay Gold', artist: 'Hi-STANDARD', album: 'MAKING THE ROAD', genre: 'punk', year: 1999, coverUrl: 'https://picsum.photos/seed/song51/300/300', votes: 456 },
  { id: 'song-52', title: '小さな恋のうた', artist: 'MONGOL800', album: 'MESSAGE', genre: 'punk', year: 2001, coverUrl: 'https://picsum.photos/seed/song52/300/300', votes: 534 },
  { id: 'song-53', title: 'Missing', artist: 'ELLEGARDEN', album: 'RIOT ON THE GRILL', genre: 'punk', year: 2005, coverUrl: 'https://picsum.photos/seed/song53/300/300', votes: 378 },
  { id: 'song-54', title: 'RIVER', artist: '10-FEET', album: 'REALIFE', genre: 'punk', year: 2013, coverUrl: 'https://picsum.photos/seed/song54/300/300', votes: 289 },
  { id: 'song-55', title: 'ともに', artist: 'WANIMA', album: 'Are You Coming?', genre: 'punk', year: 2017, coverUrl: 'https://picsum.photos/seed/song55/300/300', votes: 412 },
  { id: 'song-56', title: 'My First Kiss', artist: 'Hi-STANDARD', album: 'ANGRY FIST', genre: 'punk', year: 1997, coverUrl: 'https://picsum.photos/seed/song56/300/300', votes: 345 },
  { id: 'song-57', title: 'Fire Cracker', artist: 'ELLEGARDEN', album: 'BRING YOUR BOARD!!', genre: 'punk', year: 2003, coverUrl: 'https://picsum.photos/seed/song57/300/300', votes: 267 },
  { id: 'song-58', title: 'やってみよう', artist: 'WANIMA', album: 'Everybody!!', genre: 'punk', year: 2018, coverUrl: 'https://picsum.photos/seed/song58/300/300', votes: 356 },
];
