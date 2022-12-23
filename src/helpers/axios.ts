import axios from "axios";

export const axiosData = async (country: string) => {
  const options = {
    url: `http://universities.hipolabs.com/search?country=${country}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = await axios(options)
    .then((res) => res.data)
    .catch((err) => {
      return err.message;
    });

  return data;
};