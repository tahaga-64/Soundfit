import type { AISuggestion } from '@/types';

// localStorageからAnthropicキーを取得
function getStoredAnthropicKey(): string {
  return localStorage.getItem('soundfit_anthropic_api_key') || '';
}

// Anthropic API経由でAIプレイリストを生成
export async function generateAIPlaylist(mood: string, genre?: string): Promise<AISuggestion[]> {
  const genrePrompt = genre ? `\nジャンル指定: ${genre}` : '';
  const apiKey = getStoredAnthropicKey();

  const body = JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `あなたは日本の音楽に詳しいDJです。以下の気分に合う日本の曲を5曲おすすめしてください。${genrePrompt}

気分: ${mood}

必ず以下のJSON配列形式のみで回答してください（前後に余計なテキストを入れないでください）:
[{"title": "曲名", "artist": "アーティスト名", "reason": "おすすめ理由（1文）"}]`
    }]
  });

  let response: Response;

  if (apiKey) {
    // localStorageのAPIキーで直接呼び出し
    response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body,
    });
  } else {
    // フォールバック: Vite proxy 経由
    response = await fetch('/api/anthropic/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  }

  if (!response.ok) {
    const status = response.status;
    if (status === 401) throw new Error('APIキーが無効です。設定画面で正しいキーを入力してください。');
    throw new Error(`API呼び出しに失敗しました: ${status}`);
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
