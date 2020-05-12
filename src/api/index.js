export const fetchData = async (query) => {
  try {
    const apiKey = process.env.REACT_APP_GIPHY_API_KEY;
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=10&offset=0&rating=G&lang=en`
    );

    const json = await response.json();
    return json.data.map((item) => item.images.preview.mp4);
  } catch (error) {}
};
