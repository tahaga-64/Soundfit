// アーティスト名 → Spotify Artist ID マッピング（埋め込みプレイヤー用）
export const artistSpotifyIds: Record<string, string> = {
  'ZORN': '7FMXFo1gEYAdxy9eWFHsw6',
  'PUNPEE': '5XO4xyeszLrSmFJsAe3OsD',
  'Creepy Nuts': '2xWxCeVUMGrvMfsuo3DkWe',
  'BAD HOP': '0bdMBiglNheMojXolkCX5b',
  'KOHH': '5NRyyKb7mEdm3XJx5okMYb',
  '般若': '0tnwzBlpINB1MZWHqdspJC',
  'King Gnu': '6OwLSEJSMCQnYnKeIQnthE',
  'RADWIMPS': '4PXOKnuFCPGBsfhJjIAbvz',
  'ONE OK ROCK': '7k4MnFDIzRnMOWiJGMN03x',
  '[Alexandros]': '0FOak4JjjeBqEa3DPYlKAp',
  'BUMP OF CHICKEN': '64OeSBFo8O0IK7atjNeFcS',
  'ASIAN KUNG-FU GENERATION': '5CttFi0UtkDLRhfIPxqTg1',
  'the GazettE': '4bfFGmCfkYaHmIuGMvJqaS',
  'DIR EN GREY': '0cdLEIJTmJVx31TqVxqaTP',
  'X JAPAN': '5X0LpszJBCaxoHaFIaRLNE',
  'BUCK-TICK': '3hR6GJ0WuNgsm27amHsjb1',
  "L'Arc~en~Ciel": '5iiALUOQJOmCiGRmB4u3e2',
  '竹内まりや': '1eotVLGUPb2pzF7JUfMbzL',
  '山下達郎': '2UmFh5GrYRMjJEshmJqHrh',
  'never young beach': '3QUBLDCm2NeNgBUQAX41cC',
  '角松敏生': '0F7F4fMtPth9mWB8rV9bhI',
  '大貫妙子': '4pqOlDaBz3FUEzXuU3rl3F',
  '松原みき': '0Z9CqOmIqxFmrHEGkHCX7D',
  'Perfume': '3cICFrrHdO5MSgFCFbzsiE',
  'capsule': '0kbLiDJyyW4WKVx8dAPt0S',
  'm-flo': '0TQ3L9dUHN7kSLLVTfJSNA',
  '中田ヤスタカ': '4BajZulvTVmOXPFNBnHSjX',
  'tofubeats': '0m39jOBRBZYmQQ5kcZaP5h',
  '上原ひろみ': '25FMtHPTXihlVRjkJvizr5',
  'fox capture plan': '3oeAZrfOJfgDRU8QHLJMCH',
  'SOIL&"PIMP"SESSIONS': '2LuPNT3J8b5kYjqHYhHpHV',
  "PE'Z": '2gJbsOrNMmxFCaiqxlOlQi',
  '宇多田ヒカル': '7lBPl5MCDzEVf4vEjOdfCf',
  'Crystal Kay': '0Jm7xg20VhY9a6qVjMv8bF',
  'JUJU': '1vVOGcxnqA0bvbKFHHi98j',
  'AI': '3oKCklmXbJGLPiGPv8dqkr',
  '三浦大知': '7x3lMPTjK0DXt1fNiJJTny',
  'Hi-STANDARD': '24uMjDe5MOE2ayyJjnfHPs',
  'MONGOL800': '3bZC3ks2iFKKCSq8QJxRJr',
  'ELLEGARDEN': '4aawyAB9vmqN3uQ7FjRGTy',
  '10-FEET': '6bEATHDIf4M8cGpJJsMq39',
  'WANIMA': '3MDAD3LIBTqkHU2XlxnCon',
  'LUNA SEA': '3rq7bFKjfaxRcGREdun46X',
};

// アーティスト名からSpotify IDを取得（埋め込みプレイヤー用）
export function getSpotifyArtistId(artistName: string): string | undefined {
  return artistSpotifyIds[artistName];
}

// Spotify検索URLを生成（IDに依存しないため常に動作する）
export function getSpotifyArtistUrl(artistName: string): string {
  return `https://open.spotify.com/search/${encodeURIComponent(artistName)}`;
}
