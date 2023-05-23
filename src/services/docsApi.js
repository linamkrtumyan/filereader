import axios from "axios";

export const getDocsVariables = async (link) => {
  try {
    const result = await axios.get(
      `https://docs.google.com/document/d/${link}/export`
    );
    return result.data;
  } catch (error) {
    console.log("Something get wrong");
  }
};
