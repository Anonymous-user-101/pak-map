import { useState, useEffect } from 'react';

/**
 * Wikipedia Content Hook
 * Fetches city history and information from Wikipedia API.
 * 
 * Privacy: Only city slug is sent to Wikipedia.
 * No user data transmitted.
 */
export const useWikipedia = (citySlug, enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!citySlug || !enabled) return;

    const fetchWiki = async () => {
      setLoading(true);
      setError(null);
      try {
        // Summary API (privacy-safe)
        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(citySlug)}`;
        const res = await fetch(summaryUrl);
        if (!res.ok) throw new Error(`Wikipedia returned ${res.status}`);
        const summary = await res.json();

        // Full article extract for history content
        const extractUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(citySlug)}&format=json&origin=*`;
        const extractRes = await fetch(extractUrl);
        const extractData = await extractRes.json();
        const page = Object.values(extractData.query.pages)[0];

        setData({
          title: summary.title,
          description: summary.description,
          extract: summary.extract,
          fullExtract: page?.extract || '',
          thumbnail: summary.thumbnail?.source,
          coordinates: summary.coordinates,
          url: summary.content_urls?.desktop?.page,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWiki();
  }, [citySlug, enabled]);

  return { data, loading, error };
};