import type { NearbySpot } from '@/types';

// モックスポットデータ（聖地 + 周辺スポット）
export const spots: NearbySpot[] = [
  {
    id: 'spot-1', name: '渋谷HARLEM', type: 'livehouse',
    address: '東京都渋谷区円山町2-4', lat: 35.6570, lng: 139.6950,
    genre: 'hiphop', description: '日本ヒップホップの聖地。伝説のMCバトルが行われたクラブ。ZORNや般若もここでキャリアを磨いた。',
    imageUrl: 'https://picsum.photos/seed/spot1/400/300', relatedArtists: ['ZORN', '般若', 'PUNPEE'], isSacred: true,
  },
  {
    id: 'spot-2', name: '下北沢SHELTER', type: 'livehouse',
    address: '東京都世田谷区北沢2-6-10', lat: 35.6613, lng: 139.6680,
    genre: 'rock', description: '邦ロックの登竜門。BUMP OF CHICKENやアジカンもここからスタートした伝説のライブハウス。',
    imageUrl: 'https://picsum.photos/seed/spot2/400/300', relatedArtists: ['BUMP OF CHICKEN', 'ASIAN KUNG-FU GENERATION'], isSacred: true,
  },
  {
    id: 'spot-3', name: '高田馬場AREA', type: 'livehouse',
    address: '東京都新宿区高田馬場3-3-3', lat: 35.7125, lng: 139.7034,
    genre: 'visualkei', description: 'V系バンドの聖地。the GazettEやDIR EN GREYが初期にライブを重ねた場所。',
    imageUrl: 'https://picsum.photos/seed/spot3/400/300', relatedArtists: ['the GazettE', 'DIR EN GREY'], isSacred: true,
  },
  {
    id: 'spot-4', name: 'タワーレコード渋谷店', type: 'record_shop',
    address: '東京都渋谷区神南1-22-14', lat: 35.6625, lng: 139.6993,
    genre: 'rock', description: 'NO MUSIC, NO LIFE. 日本最大級のレコードショップ。インストアイベントも頻繁に開催。',
    imageUrl: 'https://picsum.photos/seed/spot4/400/300', relatedArtists: [], isSacred: true,
  },
  {
    id: 'spot-5', name: 'disk union 新宿本館', type: 'record_shop',
    address: '東京都新宿区新宿3-31-4', lat: 35.6914, lng: 139.7020,
    genre: 'citypop', description: 'シティポップのレコードを探すならここ。竹内まりやや山下達郎のレア盤が見つかることも。',
    imageUrl: 'https://picsum.photos/seed/spot5/400/300', relatedArtists: ['竹内まりや', '山下達郎'], isSacred: true,
  },
  {
    id: 'spot-6', name: 'ブルーノート東京', type: 'livehouse',
    address: '東京都港区南青山6-3-16', lat: 35.6617, lng: 139.7132,
    genre: 'jazz', description: '世界的ジャズクラブの東京店。上原ひろみをはじめ、国内外のトップアーティストが出演。',
    imageUrl: 'https://picsum.photos/seed/spot6/400/300', relatedArtists: ['上原ひろみ'], isSacred: true,
  },
  {
    id: 'spot-7', name: 'Cafe BOHEMIA', type: 'cafe',
    address: '東京都渋谷区宇田川町36-22', lat: 35.6614, lng: 139.6953,
    genre: 'hiphop', description: 'ヒップホップ好きが集まるカフェバー。ライブ前後の打ち上げにも最適。BGMはいつもHIPHOP。',
    imageUrl: 'https://picsum.photos/seed/spot7/400/300',
  },
  {
    id: 'spot-8', name: 'Bar Chit Chat', type: 'bar',
    address: '東京都世田谷区北沢2-14-2', lat: 35.6620, lng: 139.6675,
    genre: 'rock', description: '下北沢のロック好きが集うバー。壁一面のバンドポスターが圧巻。ライブ後の一杯に最適。',
    imageUrl: 'https://picsum.photos/seed/spot8/400/300',
  },
  {
    id: 'spot-9', name: 'City Pop Vinyl', type: 'record_shop',
    address: '東京都中野区中野5-52-15', lat: 35.7064, lng: 139.6655,
    genre: 'citypop', description: 'シティポップ専門のレコードショップ。店主の選盤眼は折り紙付き。海外のファンも訪れる。',
    imageUrl: 'https://picsum.photos/seed/spot9/400/300',
  },
  {
    id: 'spot-10', name: 'WOMB', type: 'livehouse',
    address: '東京都渋谷区円山町2-16', lat: 35.6565, lng: 139.6942,
    genre: 'edm', description: '渋谷を代表するクラブ。世界的DJが来日公演を行う場所。最高峰の音響システムが自慢。',
    imageUrl: 'https://picsum.photos/seed/spot10/400/300', relatedArtists: ['中田ヤスタカ'], isSacred: true,
  },
  {
    id: 'spot-11', name: 'Jazz Spot Intro', type: 'bar',
    address: '東京都新宿区歌舞伎町2-14-5', lat: 35.6966, lng: 139.7030,
    genre: 'jazz', description: '老舗ジャズバー。レコードで流れるジャズを聴きながらウィスキーを楽しめる大人の空間。',
    imageUrl: 'https://picsum.photos/seed/spot11/400/300',
  },
  {
    id: 'spot-12', name: 'Rock Cafe Loft', type: 'cafe',
    address: '東京都新宿区歌舞伎町1-12-9', lat: 35.6946, lng: 139.7017,
    genre: 'punk', description: 'パンクロック好きの溜まり場カフェ。ライブチケットの情報交換もここで。Wi-Fiもあり作業にも。',
    imageUrl: 'https://picsum.photos/seed/spot12/400/300',
  },
];
