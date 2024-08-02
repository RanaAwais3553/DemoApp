import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSearchResults = async () => {
  try {
    const searchResults = await AsyncStorage.getItem('searchResults');
    if (searchResults !== null) {
      return JSON.parse(searchResults);
    }
    return []; // Return an empty array if there are no search results
  } catch (error) {
    console.error('Error retrieving search results:', error);
    return [];
  }
};
export const saveSearchResult = async searchResult => {
  try {
    // Retrieve the existing search results
    const existingResults = await AsyncStorage.getItem('searchResults');
    let resultsArray =
      existingResults && existingResults.length > 0
        ? JSON.parse(existingResults)
        : [];

    // resultsArray = [...resultsArray, ...searchResult];
    // Add the new search result
    const uniqueToArray1 = searchResult?.filter(
      obj1 => !resultsArray.some(obj2 => obj2.id === obj1.id),
    );

    // Get unique objects from array2 that are not in array1
    const uniqueToArray2 = resultsArray?.filter(
      obj2 => !searchResult.some(obj1 => obj1.id === obj2.id),
    );
    const uniqueObjects = [...uniqueToArray1, ...uniqueToArray2];
    // resultsArray.push(searchResult);

    // Save the updated search results back to local storage
    await AsyncStorage.setItem('searchResults', JSON.stringify(searchResult));

    console.log('Search result saved successfully');
  } catch (error) {
    console.error('Error saving search result:', error);
  }
};
