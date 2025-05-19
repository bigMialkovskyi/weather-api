const axios = require('axios');

exports.getWeather = async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const response = await axios.get(`https://wttr.in/${city}?format=j1`);
    const data = response.data;

    const weather = {
      temperature: parseFloat(data.current_condition[0].temp_C),
      humidity: parseFloat(data.current_condition[0].humidity),
      description: data.current_condition[0].weatherDesc[0].value
    };

    res.json(weather);
  } catch (error) {
    res.status(404).json({ error: 'City not found or weather service error' });
  }
};  