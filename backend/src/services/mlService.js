const axios = require("axios");

const predictDyslexia = async (features) => {
  const response = await axios.post(
    "http://localhost:8000/predict",
    { features }
  );
  return response.data.dyslexia_level;
};

module.exports = predictDyslexia;
