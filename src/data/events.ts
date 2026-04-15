import type { LiveEvent, LiveImpression, FestivalBuddyPost } from '@/types';

// モックライブイベントデータ
export const events: LiveEvent[] = [
  {
    id: 'event-1',
    artist: 'King Gnu',
    venue: '東京ドーム',
    date: '2026-03-15',
    genre: 'rock',
    setlist: ['白日', 'カメレオン', 'Teenager Forever', '飛行艇', '三文小説', 'BOY'],
    coverUrl: 'https://picsum.photos/seed/event1/400/300',
  },
  {
    id: 'event-2',
    artist: 'the GazettE',
    venue: '日本武道館',
    date: '2026-04-20',
    genre: 'visualkei',
    setlist: ['FILTH IN THE BEAUTY', 'UGLY', 'SHIVER', 'Cassis', 'PLEDGE'],
    coverUrl: 'https://picsum.photos/seed/event2/400/300',
  },
  {
    id: 'event-3',
    artist: 'ZORN',
    venue: '渋谷CLUB QUATTRO',
    date: '2026-02-28',
    genre: 'hiphop',
    setlist: ['My Life', 'Letter', 'Don\'t Look Back', 'Walk This Way', 'All My Homies'],
    coverUrl: 'https://picsum.photos/seed/event3/400/300',
  },
  {
    id: 'event-4',
    artist: 'Perfume',
    venue: '幕張メッセ',
    date: '2026-05-10',
    genre: 'edm',
    setlist: ['ポリリズム', 'チョコレイト・ディスコ', 'FLASH', 'エレクトロ・ワールド', 'STAR TRAIN'],
    coverUrl: 'https://picsum.photos/seed/event4/400/300',
  },
  {
    id: 'event-5',
    artist: '宇多田ヒカル',
    venue: 'さいたまスーパーアリーナ',
    date: '2026-06-01',
    genre: 'rnb',
    setlist: ['Automatic', 'First Love', '花束を君に', 'One Last Kiss', 'Beautiful World'],
    coverUrl: 'https://picsum.photos/seed/event5/400/300',
  },
  {
    id: 'event-6',
    artist: 'Hi-STANDARD',
    venue: '横浜アリーナ',
    date: '2026-01-15',
    genre: 'punk',
    setlist: ['Stay Gold', 'My First Kiss', 'FIGHTING FISTS, ANGRY SOUL', 'GLORY'],
    coverUrl: 'https://picsum.photos/seed/event6/400/300',
  },
  {
    id: 'event-7',
    artist: '上原ひろみ',
    venue: 'ブルーノート東京',
    date: '2026-03-22',
    genre: 'jazz',
    setlist: ['Tom & Jerry', 'Place To Be', 'Desire', 'Spectrum'],
    coverUrl: 'https://picsum.photos/seed/event7/400/300',
  },
  {
    id: 'event-8',
    artist: 'never young beach',
    venue: '日比谷野外音楽堂',
    date: '2026-07-20',
    genre: 'citypop',
    setlist: ['明るい未来', 'お気に召すまま', 'どうでもいいけど', 'fam fam'],
    coverUrl: 'https://picsum.photos/seed/event8/400/300',
  },
  {
    id: 'event-9',
    artist: 'RADWIMPS',
    venue: 'Zepp Tokyo',
    date: '2026-04-05',
    genre: 'rock',
    setlist: ['前前前世', 'スパークル', '有心論', 'おしゃかしゃま', 'DADA'],
    coverUrl: 'https://picsum.photos/seed/event9/400/300',
  },
  {
    id: 'event-10',
    artist: 'Creepy Nuts',
    venue: '大阪城ホール',
    date: '2026-05-25',
    genre: 'hiphop',
    setlist: ['Bling-Bang-Bang-Born', 'よふかしのうた', '板についてきたハングリー', 'のびしろ'],
    coverUrl: 'https://picsum.photos/seed/event10/400/300',
  },
  {
    id: 'event-11',
    artist: 'SUMMER SONIC 2026',
    venue: 'ZOZOマリンスタジアム',
    date: '2026-08-15',
    genre: 'rock',
    setlist: [],
    coverUrl: 'https://picsum.photos/seed/event11/400/300',
  },
  {
    id: 'event-12',
    artist: 'FUJI ROCK FESTIVAL 2026',
    venue: '苗場スキー場',
    date: '2026-07-25',
    genre: 'rock',
    setlist: [],
    coverUrl: 'https://picsum.photos/seed/event12/400/300',
  },
];

// ライブ感想データ
export const impressions: LiveImpression[] = [
  {
    id: 'imp-1', userId: 'user-3', eventId: 'event-1',
    content: 'King Gnuのライブ最高だった！白日の生歌は鳥肌もの。常田さんのギターソロで泣いた。',
    photos: ['https://picsum.photos/seed/imp1a/400/300', 'https://picsum.photos/seed/imp1b/400/300'],
    timestamp: '2026-03-15T22:30:00Z',
  },
  {
    id: 'imp-2', userId: 'user-2', eventId: 'event-2',
    content: 'the GazettEの武道館、圧巻の一言。FILTHでフロア全体が揺れてた。ルキの声がとにかくヤバい。',
    photos: ['https://picsum.photos/seed/imp2a/400/300'],
    timestamp: '2026-04-20T23:00:00Z',
  },
  {
    id: 'imp-3', userId: 'user-1', eventId: 'event-3',
    content: 'ZORNのクアトロ、距離が近くて最高。My Lifeで一緒にヘッズが合唱する瞬間、ヒップホップの良さを再確認。',
    photos: ['https://picsum.photos/seed/imp3a/400/300'],
    timestamp: '2026-02-28T23:15:00Z',
  },
  {
    id: 'imp-4', userId: 'user-5', eventId: 'event-4',
    content: 'Perfumeのライブ演出はほんと未来。レーザーとプロジェクションマッピングの融合がすごすぎた。',
    photos: ['https://picsum.photos/seed/imp4a/400/300', 'https://picsum.photos/seed/imp4b/400/300'],
    timestamp: '2026-05-10T22:00:00Z',
  },
  {
    id: 'imp-5', userId: 'user-6', eventId: 'event-5',
    content: '宇多田ヒカルの生歌、CDよりもっと良い。Automaticのイントロで会場の空気が変わった。',
    photos: [],
    timestamp: '2026-06-01T22:45:00Z',
  },
  {
    id: 'imp-6', userId: 'user-7', eventId: 'event-6',
    content: 'ハイスタのライブは何回行っても最高。Stay Goldのイントロで涙腺崩壊。AIR JAM世代で良かった。',
    photos: ['https://picsum.photos/seed/imp6a/400/300'],
    timestamp: '2026-01-15T22:30:00Z',
  },
  {
    id: 'imp-7', userId: 'user-8', eventId: 'event-7',
    content: '上原ひろみのブルーノート公演。超絶技巧を目の前で見られる贅沢。Tom & Jerryのスピード感がやばい。',
    photos: ['https://picsum.photos/seed/imp7a/400/300'],
    timestamp: '2026-03-22T23:00:00Z',
  },
  {
    id: 'imp-8', userId: 'user-4', eventId: 'event-8',
    content: 'never young beachの野音は最高のロケーション。夕暮れ時の「明るい未来」は一生の思い出になった。',
    photos: ['https://picsum.photos/seed/imp8a/400/300', 'https://picsum.photos/seed/imp8b/400/300'],
    timestamp: '2026-07-20T20:30:00Z',
  },
];

// フェス仲間募集データ
export const buddyPosts: FestivalBuddyPost[] = [
  {
    id: 'buddy-1', userId: 'user-11', eventName: 'SUMMER SONIC 2026', date: '2026-08-15',
    content: 'サマソニ一緒に行ける人募集！ロック好きな人集まれ〜。当日は朝から参戦予定です。',
    genre: 'rock',
    replies: [
      { id: 'r-b1', userId: 'user-3', content: '行きます！一緒に回りましょう！', timestamp: '2026-04-01T10:00:00Z', likes: 3 },
      { id: 'r-b2', userId: 'user-7', content: '参加希望です！パンクステージ中心で回る予定', timestamp: '2026-04-01T11:30:00Z', likes: 2 },
    ],
  },
  {
    id: 'buddy-2', userId: 'user-1', eventName: 'FUJI ROCK FESTIVAL 2026', date: '2026-07-25',
    content: 'フジロック3日通し参戦！テント泊する仲間探してます。ヒップホップ好きな人特に歓迎。',
    genre: 'hiphop',
    replies: [
      { id: 'r-b3', userId: 'user-9', content: 'テント泊仲間探してました！ぜひ一緒に', timestamp: '2026-04-05T09:00:00Z', likes: 5 },
    ],
  },
  {
    id: 'buddy-3', userId: 'user-2', eventName: 'VISUAL JAPAN SUMMIT', date: '2026-10-10',
    content: 'V系サミット行く人いませんか？GazettEとDIR EN GREYが出るなら絶対行く！',
    genre: 'visualkei',
    replies: [
      { id: 'r-b4', userId: 'user-10', content: 'V系仲間！一緒に行きたい！', timestamp: '2026-05-15T14:00:00Z', likes: 4 },
    ],
  },
  {
    id: 'buddy-4', userId: 'user-5', eventName: 'Perfume LIVE 2026', date: '2026-05-10',
    content: 'Perfumeの幕張公演、一緒にテクノポップで盛り上がりませんか？EDM好きな方歓迎です！',
    genre: 'edm',
    replies: [],
  },
  {
    id: 'buddy-5', userId: 'user-4', eventName: 'City Pop Night', date: '2026-06-15',
    content: 'シティポップのDJイベントに一緒に行ける人募集。never young beachの前座DJが最高らしい。',
    genre: 'citypop',
    replies: [
      { id: 'r-b5', userId: 'user-1', content: 'シティポップナイト行きたかった！ぜひ', timestamp: '2026-04-20T18:00:00Z', likes: 2 },
    ],
  },
  {
    id: 'buddy-6', userId: 'user-8', eventName: 'TOKYO JAZZ 2026', date: '2026-09-01',
    content: 'TOKYO JAZZ行く仲間募集中。上原ひろみ出演確定！ジャズ好きな人一緒に語りましょう。',
    genre: 'jazz',
    replies: [
      { id: 'r-b6', userId: 'user-6', content: 'ジャズフェス行きたい！上原ひろみ観たい！', timestamp: '2026-05-01T12:00:00Z', likes: 3 },
    ],
  },
];
