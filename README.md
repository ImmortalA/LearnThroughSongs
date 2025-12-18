# Learn Chinese by Song - 黃昏

A minimal web app MVP for learning Traditional Chinese through the song 《黃昏》 by 周傳雄 (Steve Chou).

## Features

- **Song Player**: Embedded YouTube video player
- **Interactive Lyrics**: Traditional Chinese lyrics with Pinyin and hover tooltips
- **Tooltips**: Show Traditional text, Pinyin, English, and Vietnamese meanings on hover
- **Toggles**: Show/hide Pinyin and translations
- **Copy Vocab**: Copy hovered token information as TSV format
- **Search**: Filter lyrics by Traditional Chinese or Pinyin
- **Responsive**: Mobile-friendly layout

## How to Run

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── SongPlayer.tsx      # YouTube iframe player
│   ├── LyricsViewer.tsx    # Lyrics display with search
│   ├── TokenSpan.tsx       # Individual token with hover
│   └── Tooltip.tsx         # Tooltip component
├── data/
│   └── huanghun.json       # Song data and lyrics
├── types/
│   └── index.ts            # TypeScript type definitions
└── package.json
```

## How to Add More Lines/Tokens in JSON

Edit `data/huanghun.json` and add more lines to the `lines` array. Each line contains a `tokens` array, and each token has:

- `t`: Traditional Chinese text
- `py`: Pinyin
- `en`: English meaning
- `vi`: Vietnamese meaning

Example:
```json
{
  "tokens": [
    {
      "t": "黃昏",
      "py": "huáng hūn",
      "en": "dusk, twilight",
      "vi": "hoàng hôn"
    }
  ]
}
```

## Update YouTube Video ID

Edit `data/huanghun.json` and update the `provider.id` field with your YouTube video ID:

```json
{
  "provider": {
    "type": "youtube",
    "id": "YOUR_YOUTUBE_VIDEO_ID"
  }
}
```

## Lyrics Copyright Note

**Important**: The sample data includes placeholder text. You should paste your own lyrics into the JSON file. Please ensure you have the right to use the lyrics you add, and respect copyright laws.

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

