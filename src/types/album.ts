export interface Album {
  id: string;
  band: string;
  album: string;
  likeScore: number;
  originalityScore: number;
  comment: string;
}

export interface RankedAlbum {
  band: string;
  album: string;
  averageLike: number;
  averageOriginality: number;
  finalScore: number;
  comments: Array<{
    user: string;
    comment: string;
    likeScore: number;
    originalityScore: number;
  }>;
}
