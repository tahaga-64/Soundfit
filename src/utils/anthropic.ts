import type { AISuggestion } from '@/types';

// Anthropic API経由でAIプレイリストを生成
export async function generateAIPlaylist(mood: string, genre?: string): Promise<AISuggestion[]> {
  const genrePrompt = genre ? `\nジャンル指定: ${genre}` : '';

  const response = await fetch('/api/anthropic/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `あなたは日本の音楽に詳しいDJです。以下の気分に合う日本の曲を5曲おすすめしてください。${genrePrompt}

気分: ${mood}

必ず以下のJSON配列形式のみで回答してください（前後に余計なテキストを入れないでください）:
[{"title": "曲名", "artist": "アーティスト名", "reason": "おすすめ理由（1文）"}]`
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`API呼び出しに失敗しました: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content[0].text;

  // JSONをパース（前後の余分なテキストを除去）
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error('AIからの応答を解析できませんでした');
  }

  return JSON.parse(jsonMatch[0]) as AISuggestion[];
}
