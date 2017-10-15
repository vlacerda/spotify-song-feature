export const header = (authToken) => ({'Authorization': `Bearer ${authToken}`});
export const features = (id) => `https://api.spotify.com/v1/audio-features/${encodeURIComponent(id)}`;
export const search = (term) => `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`;