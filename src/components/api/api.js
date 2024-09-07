export const getData = async (city) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=f0b4fbd9be914453bf2201518240409&q=${city}&aqi=no`
    );
    return response.json();
  } catch (error) {}
};
