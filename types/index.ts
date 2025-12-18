export interface LyricToken {
  t: string; // Traditional Chinese
  py: string; // Pinyin
  hv?: string; // Hán Việt (Sino-Vietnamese)
  en: string; // English meaning
  vi: string; // Vietnamese meaning
}

export interface LyricLine {
  tokens: LyricToken[];
}

export interface LyricSection {
  type: "verse" | "chorus";
  label: string;
  lines: LyricLine[];
}

export interface SongProvider {
  type: "youtube";
  id: string;
}

export interface SongData {
  songId: string;
  title: string;
  artist: string;
  provider: SongProvider;
  sections: LyricSection[];
}

