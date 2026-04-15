import type { Badge } from '@/types';

// バッジ定義データ
export const badges: Badge[] = [
  // ジャンル別バッジ
  { id: 'badge-1', name: 'ヒップホップマスター', description: 'ヒップホップの知識が豊富な証', icon: '🎤', genre: 'hiphop' },
  { id: 'badge-2', name: 'ストリートの詩人', description: 'ヒップホップの歌詞考察に精通', icon: '📝', genre: 'hiphop' },
  { id: 'badge-3', name: 'ロック魂', description: 'ロックへの情熱を証明するバッジ', icon: '🎸', genre: 'rock' },
  { id: 'badge-4', name: 'フェス番長', description: 'ロックフェスの常連を称える', icon: '🤘', genre: 'rock' },
  { id: 'badge-5', name: 'V系の求道者', description: 'V系の深淵を知る者に贈る', icon: '🦇', genre: 'visualkei' },
  { id: 'badge-6', name: '闇の美学', description: 'V系の美意識を極めた証', icon: '🌹', genre: 'visualkei' },
  { id: 'badge-7', name: 'シティポップ通', description: 'シティポップの世界に精通', icon: '🌴', genre: 'citypop' },
  { id: 'badge-8', name: 'レコード職人', description: 'アナログレコードのコレクター', icon: '💿', genre: 'citypop' },
  { id: 'badge-9', name: 'フロアの支配者', description: 'EDMの世界を熟知した証', icon: '🎧', genre: 'edm' },
  { id: 'badge-10', name: 'ビートの錬金術師', description: 'テクノ・EDMの深みを知る者', icon: '⚡', genre: 'edm' },
  { id: 'badge-11', name: 'ジャズ通', description: 'ジャズの歴史と技法に精通', icon: '🎹', genre: 'jazz' },
  { id: 'badge-12', name: 'スウィングの達人', description: 'ジャズの即興を愛する者', icon: '🎷', genre: 'jazz' },
  { id: 'badge-13', name: 'R&Bソウル', description: 'R&Bの魂を持つ者', icon: '💜', genre: 'rnb' },
  { id: 'badge-14', name: 'グルーヴマスター', description: 'R&Bのリズムを体で知る者', icon: '🎵', genre: 'rnb' },
  { id: 'badge-15', name: 'パンクの反逆者', description: 'パンク精神を貫く者', icon: '🔥', genre: 'punk' },
  { id: 'badge-16', name: 'モッシュピットの住人', description: 'パンクライブの最前線', icon: '💥', genre: 'punk' },
  // クロスジャンルバッジ
  { id: 'badge-17', name: '音楽博士', description: 'すべてのジャンルに精通した博識', icon: '🎓' },
  { id: 'badge-18', name: 'ライブ参戦王', description: '数多くのライブに参戦した猛者', icon: '👑' },
  { id: 'badge-19', name: 'プレイリスト職人', description: '優れたプレイリストを生み出す才能', icon: '📀' },
  { id: 'badge-20', name: 'カルチャーの語り部', description: '音楽文化を伝え続ける者', icon: '📖' },
];
