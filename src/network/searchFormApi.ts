import axios from 'axios';
export const fetchSearchResultsFromApi = async (text: string) => {
  try {
    const response = await axios.get(
      `http://hotels-api.directksa.com/api/v1/autoCompleteSearch?text=${text}&language=en&currency=SAR`,
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    if (response?.data?.data?.length > 0) {
      const formattedData = response?.data?.data?.map((item, index) => ({
        id: (index + 1).toString(), // Generate an ID starting from 1
        country: item.country.name,
        city: item.title,
        icon: 'map-marker',
      }));
      console.log('data is:#@#@', response.data.data);
      return formattedData;
    }
    return [];
  } catch (error) {
    console.error(
      'Error fetching search results:',
      error,
      error?.response?.data,
    );
    throw new Error('Error fetching search results:', error);
  }
};
