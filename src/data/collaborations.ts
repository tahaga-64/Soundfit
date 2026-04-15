import type { CollaborationPost } from '@/types';

// モックコラボレーション投稿データ
export const collaborations: CollaborationPost[] = [
  {
    id: 'collab-1', type: 'dj_match', authorId: 'user-5', genre: 'edm',
    title: 'EDM好きなDJ探してます！', content: '渋谷でEDM/テクノのDJイベントを企画してます。一緒に回してくれるDJ募集中。Perfume系のテクノポップも好きな方歓迎！',
    createdAt: '2026-03-20T10:00:00Z',
    replies: [
      { id: 'cr-1', userId: 'user-12', content: 'EDMとR&Bのクロスオーバーセットならできます！興味あります', timestamp: '2026-03-20T12:00:00Z', likes: 5 },
    ],
  },
  {
    id: 'collab-2', type: 'lyrics_collab', authorId: 'user-9', genre: 'hiphop',
    title: 'このビートに日本語ラップ乗せてくれる人！', content: 'Lo-fiヒップホップのビート作りました。日本語ラップを乗せて完成させたい。ZORNっぽい生活感のあるリリックが理想。サンプル音源送れます。',
    createdAt: '2026-03-18T15:00:00Z',
    replies: [
      { id: 'cr-2', userId: 'user-1', content: 'リリック書けます！サンプルビート聴かせてください', timestamp: '2026-03-18T17:00:00Z', likes: 8 },
      { id: 'cr-3', userId: 'user-11', content: 'ラップはできないけどメロディ乗せるのは得意です！', timestamp: '2026-03-19T09:00:00Z', likes: 3 },
    ],
  },
  {
    id: 'collab-3', type: 'zine_recruit', authorId: 'user-2', genre: 'visualkei',
    title: 'V系カルチャーZINE制作メンバー募集', content: 'V系の歴史と美学をまとめたZINEを作りたい。ライター、カメラマン、デザイナー募集。X JAPANからthe GazettEまで幅広くカバーしたい。',
    createdAt: '2026-03-15T14:00:00Z',
    replies: [
      { id: 'cr-4', userId: 'user-10', content: 'デザインできます！V系は20年追ってるので資料もたくさんあります', timestamp: '2026-03-15T16:00:00Z', likes: 12 },
    ],
  },
  {
    id: 'collab-4', type: 'dj_match', authorId: 'user-1', genre: 'hiphop',
    title: 'ヒップホップDJナイト開催したい', content: '新宿あたりでジャパニーズヒップホップのDJナイトやりたい。選曲のセンスがいいDJと組みたいです。90年代〜最新まで幅広く。',
    createdAt: '2026-03-12T20:00:00Z',
    replies: [
      { id: 'cr-5', userId: 'user-9', content: 'ちょうどそういうイベントやりたかった！DMください', timestamp: '2026-03-12T22:00:00Z', likes: 6 },
    ],
  },
  {
    id: 'collab-5', type: 'lyrics_collab', authorId: 'user-3', genre: 'rock',
    title: 'バンドの作詞やってくれる人募集', content: 'ロックバンドで活動中。曲は書けるけど歌詞が苦手。King Gnuのような文学的な歌詞を書ける方を探してます。',
    createdAt: '2026-03-10T11:00:00Z',
    replies: [
      { id: 'cr-6', userId: 'user-6', content: '歌詞書くの好きです。R&B寄りの歌詞になるかもだけど大丈夫ですか？', timestamp: '2026-03-10T13:00:00Z', likes: 4 },
      { id: 'cr-7', userId: 'user-4', content: '小説書いてるので歌詞も書けると思います。ポエティックな表現得意です', timestamp: '2026-03-10T15:00:00Z', likes: 7 },
    ],
  },
  {
    id: 'collab-6', type: 'zine_recruit', authorId: 'user-4', genre: 'citypop',
    title: 'シティポップ同人誌チーム募集', content: '80年代シティポップの再評価をテーマにした同人誌を作りたい。海外からの視点も入れたい。英語できる方も歓迎。',
    createdAt: '2026-03-08T09:00:00Z',
    replies: [
      { id: 'cr-8', userId: 'user-1', content: '面白そう！シティポップの歴史には詳しいので参加したいです', timestamp: '2026-03-08T11:00:00Z', likes: 9 },
    ],
  },
  {
    id: 'collab-7', type: 'dj_match', authorId: 'user-8', genre: 'jazz',
    title: 'ジャズバーでのセッション相手募集', content: 'ピアノ弾きです。サックスやベースのプレイヤーとセッションしたい。上原ひろみみたいなエネルギッシュなジャズがやりたい。',
    createdAt: '2026-03-05T18:00:00Z',
    replies: [
      { id: 'cr-9', userId: 'user-6', content: 'ベース弾けます！ジャズセッション興味あります', timestamp: '2026-03-05T20:00:00Z', likes: 5 },
    ],
  },
  {
    id: 'collab-8', type: 'lyrics_collab', authorId: 'user-12', genre: 'rnb',
    title: 'R&Bトラックに歌を入れてくれるシンガー募集', content: '三浦大知っぽいR&Bトラックを作ったので、歌入れしてくれる人を探してます。ダンストラックですがバラードアレンジも可。',
    createdAt: '2026-03-03T14:00:00Z',
    replies: [],
  },
  {
    id: 'collab-9', type: 'zine_recruit', authorId: 'user-7', genre: 'punk',
    title: 'パンクシーンのZINE一緒に作ろう', content: 'AIR JAMからの日本パンクシーンの変遷をまとめたZINEを企画中。ライブレポートや写真を提供してくれる方募集。',
    createdAt: '2026-02-28T16:00:00Z',
    replies: [
      { id: 'cr-10', userId: 'user-11', content: 'パンクのライブ写真たくさん撮ってます！提供できますよ', timestamp: '2026-02-28T18:00:00Z', likes: 8 },
    ],
  },
  {
    id: 'collab-10', type: 'dj_match', authorId: 'user-4', genre: 'citypop',
    title: 'シティポップDJイベント一緒に開催しませんか', content: '中目黒あたりでシティポップのDJイベントを企画したい。竹内まりやから現代のネオシティポップまで。おしゃれな空間を作りたい。',
    createdAt: '2026-02-25T10:00:00Z',
    replies: [
      { id: 'cr-11', userId: 'user-5', content: 'シティポップとEDMのクロスオーバーセットやりたいです！', timestamp: '2026-02-25T12:00:00Z', likes: 4 },
    ],
  },
];
