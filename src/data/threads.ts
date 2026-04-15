import type { DiscussionThread } from '@/types';

// モックディスカッションスレッドデータ
export const threads: DiscussionThread[] = [
  {
    id: 'thread-1', title: 'King Gnu「白日」の歌詞を考察する', authorId: 'user-3', genre: 'rock',
    content: '「白日」の歌詞って、後悔と贖罪がテーマだと思うんだけど、みんなはどう解釈してる？「真っ新に生まれ変わって」のところが特に深い。',
    tags: ['King Gnu', '歌詞考察', '白日'],
    createdAt: '2026-03-01T14:00:00Z',
    replies: [
      { id: 'tr-1', userId: 'user-11', content: '自分は「時間は戻せない」というメッセージだと思ってる。ドラマのストーリーとリンクしてるよね。', timestamp: '2026-03-01T15:30:00Z', likes: 12 },
      { id: 'tr-2', userId: 'user-1', content: '常田さんのインタビューで「人間の弱さ」がテーマって言ってたよ。ロック好きじゃなくても響く曲だよね。', timestamp: '2026-03-01T16:45:00Z', likes: 8 },
      { id: 'tr-3', userId: 'user-7', content: 'MVの映像演出も含めて完成された作品だと思う。井口さんのファルセットが切ない。', timestamp: '2026-03-02T09:00:00Z', likes: 15 },
    ],
  },
  {
    id: 'thread-2', title: 'V系バンドの魅力を語るスレ', authorId: 'user-2', genre: 'visualkei',
    content: 'V系って見た目だけじゃないんだよ。音楽的にもめちゃくちゃレベル高い。DIR EN GREYなんて世界レベルだし。V系の魅力を語ろう！',
    tags: ['V系', 'DIR EN GREY', 'the GazettE'],
    createdAt: '2026-02-15T20:00:00Z',
    replies: [
      { id: 'tr-4', userId: 'user-10', content: 'X JAPANから入ったけど、今のV系シーンも面白い。音楽性の幅がすごく広がってると思う。', timestamp: '2026-02-15T21:00:00Z', likes: 20 },
      { id: 'tr-5', userId: 'user-3', content: '正直V系食わず嫌いだったけど、the GazettEのCassis聴いて印象変わった。メロディがきれい。', timestamp: '2026-02-16T10:00:00Z', likes: 14 },
    ],
  },
  {
    id: 'thread-3', title: 'シティポップが海外で再評価されている理由', authorId: 'user-4', genre: 'citypop',
    content: '竹内まりやの「Plastic Love」がYouTubeで1億回再生超え。なぜ今、海外でシティポップがバズってるのか考察しよう。',
    tags: ['シティポップ', '竹内まりや', '海外人気'],
    createdAt: '2026-01-20T12:00:00Z',
    replies: [
      { id: 'tr-6', userId: 'user-1', content: 'Vaporwaveムーブメントからの流れだと思う。80年代の日本のサウンドがノスタルジックに聞こえるらしい。', timestamp: '2026-01-20T13:00:00Z', likes: 25 },
      { id: 'tr-7', userId: 'user-6', content: '山下達郎の音作りが時代を超えてるんだよね。RIDE ON TIMEは今聴いても新鮮。', timestamp: '2026-01-20T14:30:00Z', likes: 18 },
      { id: 'tr-8', userId: 'user-12', content: 'TikTokの影響も大きいと思う。「真夜中のドア」がバズったのもそうだし。', timestamp: '2026-01-21T08:00:00Z', likes: 22 },
    ],
  },
  {
    id: 'thread-4', title: 'ZORNの最新アルバムレビュー', authorId: 'user-9', genre: 'hiphop',
    content: 'ZORNの新アルバム聴いた？相変わらずリアルなリリックが胸に刺さる。「Letter」の続編みたいな曲もあって泣けた。',
    tags: ['ZORN', 'アルバムレビュー', 'ヒップホップ'],
    createdAt: '2026-03-10T19:00:00Z',
    replies: [
      { id: 'tr-9', userId: 'user-1', content: 'ZORNは生き様がそのまま曲になってるから響くんだよな。新アルバムも最高だった。', timestamp: '2026-03-10T20:00:00Z', likes: 16 },
      { id: 'tr-10', userId: 'user-11', content: 'ヒップホップ普段聴かないけどZORNは好き。言葉の力がすごい。', timestamp: '2026-03-11T09:00:00Z', likes: 10 },
    ],
  },
  {
    id: 'thread-5', title: 'Perfumeのライブ演出について', authorId: 'user-5', genre: 'edm',
    content: 'Perfumeのライブ演出は世界最高峰だと思う。ライゾマティクスとのコラボレーションが生み出すテクノロジーアートの世界。',
    tags: ['Perfume', 'ライブ演出', 'テクノロジー'],
    createdAt: '2026-02-25T16:00:00Z',
    replies: [
      { id: 'tr-11', userId: 'user-12', content: 'あの三角形のステージ演出は本当にすごい。レーザーの使い方が芸術的。', timestamp: '2026-02-25T17:00:00Z', likes: 19 },
      { id: 'tr-12', userId: 'user-4', content: 'テクノロジーと音楽の融合という意味では世界的に見てもトップクラスだと思う。', timestamp: '2026-02-25T18:30:00Z', likes: 13 },
    ],
  },
  {
    id: 'thread-6', title: '上原ひろみの超絶技巧を語る', authorId: 'user-8', genre: 'jazz',
    content: '上原ひろみのピアノは人間の限界を超えてると思う。特にライブでの即興演奏は毎回違う景色を見せてくれる。',
    tags: ['上原ひろみ', 'ジャズピアノ', '超絶技巧'],
    createdAt: '2026-03-05T11:00:00Z',
    replies: [
      { id: 'tr-13', userId: 'user-6', content: 'Tom & Jerryの速弾きは本当にヤバい。ライブで見たとき鳥肌立った。', timestamp: '2026-03-05T12:00:00Z', likes: 11 },
      { id: 'tr-14', userId: 'user-4', content: 'ジャズの枠を超えたアーティストだよね。ロックやプログレの要素もあって面白い。', timestamp: '2026-03-05T13:30:00Z', likes: 9 },
    ],
  },
  {
    id: 'thread-7', title: 'パンクロックは死なない', authorId: 'user-7', genre: 'punk',
    content: 'Hi-STANDARDが復活してAIR JAMやったとき、パンクは死んでないって確信した。10-FEETやWANIMAが繋いでくれてる。',
    tags: ['パンク', 'Hi-STANDARD', 'AIR JAM'],
    createdAt: '2026-01-30T15:00:00Z',
    replies: [
      { id: 'tr-15', userId: 'user-11', content: 'ELLEGARDENの復活も熱かった。パンクシーンはまだまだ元気だよ。', timestamp: '2026-01-30T16:00:00Z', likes: 17 },
      { id: 'tr-16', userId: 'user-3', content: 'WANIMAの「ともに」は世代を超えて愛される名曲だと思う。パンクの精神を感じる。', timestamp: '2026-01-30T17:30:00Z', likes: 12 },
    ],
  },
  {
    id: 'thread-8', title: '宇多田ヒカルの影響力について', authorId: 'user-6', genre: 'rnb',
    content: 'First Loveが世に出てから25年以上。宇多田ヒカルが日本の音楽シーンに与えた影響はどれほどだったのか。',
    tags: ['宇多田ヒカル', 'R&B', 'First Love'],
    createdAt: '2026-02-10T10:00:00Z',
    replies: [
      { id: 'tr-17', userId: 'user-12', content: '15歳であのデビューアルバムを出したのが信じられない。日本のR&Bの歴史を変えた人。', timestamp: '2026-02-10T11:00:00Z', likes: 28 },
      { id: 'tr-18', userId: 'user-4', content: 'エヴァンゲリオンの主題歌でまた新しい世代にも届いてるのがすごい。', timestamp: '2026-02-10T12:30:00Z', likes: 21 },
      { id: 'tr-19', userId: 'user-8', content: '音楽的な深みが年々増してる。Badモードはジャンルを超えた傑作。', timestamp: '2026-02-10T14:00:00Z', likes: 16 },
    ],
  },
  {
    id: 'thread-9', title: 'never young beachの心地よさの正体', authorId: 'user-1', genre: 'citypop',
    content: 'never young beachの音楽って何であんなに心地いいんだろう。80年代シティポップの匂いがするのに古くない。その秘密を考えたい。',
    tags: ['never young beach', 'シティポップ', 'インディー'],
    createdAt: '2026-03-15T13:00:00Z',
    replies: [
      { id: 'tr-20', userId: 'user-4', content: 'アナログ感のあるサウンドプロダクションと、力の抜けたボーカルの組み合わせが最高なんだよね。', timestamp: '2026-03-15T14:00:00Z', likes: 14 },
    ],
  },
  {
    id: 'thread-10', title: '三浦大知のダンスと歌の両立', authorId: 'user-12', genre: 'rnb',
    content: '三浦大知は日本のマイケル・ジャクソンだと思ってる。あのレベルで歌って踊れるアーティストは世界的にも稀。',
    tags: ['三浦大知', 'ダンス', 'R&B'],
    createdAt: '2026-02-20T18:00:00Z',
    replies: [
      { id: 'tr-21', userId: 'user-6', content: 'EXCITEのパフォーマンスは何回見ても鳥肌。歌もダンスも一切ブレない。', timestamp: '2026-02-20T19:00:00Z', likes: 23 },
      { id: 'tr-22', userId: 'user-5', content: 'ライブで見ると本当にすごさがわかる。口パクじゃないのが信じられないレベル。', timestamp: '2026-02-20T20:30:00Z', likes: 19 },
    ],
  },
];
