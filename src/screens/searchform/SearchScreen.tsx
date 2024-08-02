// import React, {useState, useRef} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // You can use any icon library
// import Debouncer from '../../utils/utils';

// const SearchScreen = ({navigation}) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const debouncer = new Debouncer(300);
//   const inputRef = useRef<TextInput>();
//   const [results, setResults] = useState([
//     {id: '1', country: 'USA', city: 'New York', icon: 'map-marker'},
//     {id: '2', country: 'France', city: 'Paris', icon: 'map-marker'},
//     {id: '3', country: 'Japan', city: 'Tokyo', icon: 'map-marker'},
//     // Add more sample data as needed
//   ]);

//   const handleCancel = () => {
//     setSearchQuery('');
//     navigation.goBack();
//   };
//   const handleSelectedNavigation = () => {
//     navigation.goBack();
//   };
//   const renderItem = ({item, index}) => (
//     <TouchableOpacity
//       onPress={handleSelectedNavigation}
//       style={{...styles.card, borderTopWidth: index == 0 ? 0 : 0.5}}>
//       <Icon name={item.icon} size={24} color="#fc8b32" style={styles.icon} />
//       <View style={styles.textContainer}>
//         <Text style={styles.countryName}>{item.country}</Text>
//         <Text style={styles.cityName}>{item.city}</Text>
//       </View>
//     </TouchableOpacity>
//   );
//   const handleSearch = (text: string) => {
//     setSearchQuery(text);
//     console.log('first');
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.searchInputContainer}>
//           <Icon
//             name="search"
//             size={20}
//             color="#888"
//             style={styles.searchIcon}
//           />
//           <TextInput
//             autoFocus={true}
//             style={styles.searchInput}
//             placeholder="Search..."
//             // value={searchQuery}
//             onChangeText={text => debouncer.debounce(() => handleSearch(text))}
//           />
//         </View>
//         <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
//           <Text style={styles.cancelButtonText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={{backgroundColor: '#ffffff', flex: 1}}>
//         <View style={{paddingTop: 20, paddingHorizontal: 20}}>
//           <Text>Recomended Search</Text>
//         </View>
//         <FlatList
//           data={results.filter(
//             item =>
//               item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
//               item.city.toLowerCase().includes(searchQuery.toLowerCase()),
//           )}
//           renderItem={renderItem}
//           keyExtractor={item => item.id}
//           contentContainerStyle={styles.listContainer}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 8,
//     backgroundColor: '#fc8b32',
//   },
//   searchInput: {
//     flex: 1,
//     height: 40,
//     // borderColor: '#ccc',
//     backgroundColor: '#fff',
//     // borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     fontSize: 16,
//     marginRight: 12,
//   },
//   searchInputContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     marginRight: 8,
//     marginLeft: 8,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   cancelButton: {
//     height: 40,
//     justifyContent: 'center',
//     paddingHorizontal: 12,
//     marginRight: 12,
//     borderWidth: 0.2,
//     borderColor: '#fff',
//     borderRadius: 4,
//   },
//   cancelButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   listContainer: {
//     backgroundColor: '#ffffff',
//     paddingHorizontal: 8,
//     paddingVertical: 16,
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     paddingHorizontal: 12,
//     paddingVertical: 14,
//     borderRadius: 8,
//     borderBottomWidth: 0.5,
//     borderTopWidth: 0.5,
//     borderColor: '#f2f2f2',
//   },
//   icon: {
//     marginRight: 16,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   countryName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fc8b32',
//   },
//   cityName: {
//     fontSize: 14,
//     color: '#777',
//   },
// });

// export default SearchScreen;

import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Debouncer from '../../utils/utils';
import {getSearchResults, saveSearchResult} from '../../network/localStorage';
import {fetchSearchResultsFromApi} from '../../network/searchFormApi';
import {ActivityIndicator} from 'react-native';
import {UpdateSearchForm} from '../../redux/slices/searchForm';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/hooks';
const SearchScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [storedResults, setStoredResults] = useState([]);
  const dispatch = useAppDispatch();
  const debouncer = new Debouncer(300);
  const inputRef = useRef<TextInput>();

  useEffect(() => {
    setLoading(true);
    getSearchResults()
      .then(data => {
        // let resultsArray = data.length > 0 ? JSON.parse(data) : [];
        console.log('local storage data is:#@#@', data);
        if (data?.length > 0) {
          setResults([...results, ...data]);
        }
        // setStoredResults(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching search results:', error);
      });
  }, []);
  const handleCancel = () => {
    setSearchQuery('');
    navigation.goBack();
  };

  const handleSelectedNavigation = item => {
    dispatch(UpdateSearchForm(item));
    navigation.goBack();
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectedNavigation(item)}
        style={{...styles.card, borderTopWidth: index == 0 ? 0 : 0.5}}>
        <Icon name="map-marker" size={24} color="#fc8b32" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.countryName}>{item.country}</Text>
          <Text style={styles.cityName}>{item.city}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const fetchSearchResults = async (text: string) => {
    setLoading(true);
    try {
      const data = await fetchSearchResultsFromApi(text);
      setLoading(false);
      setResults(data); // Adjust this based on the actual response structure
      await saveSearchResult(data);
      console.log('data is:#@#@', data);
      // }
    } catch (error) {
      setLoading(false);
      console.error(
        'Error fetching search results:',
        error,
        error?.response?.data,
      );
    }
  };

  const handleSearch = text => {
    setSearchQuery(text);
    if (text.length > 0) debouncer.debounce(() => fetchSearchResults(text));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchInputContainer}>
          <Icon
            name="search"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            autoFocus={true}
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={text => handleSearch(text)}
          />
        </View>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={{backgroundColor: '#ffffff', flex: 1}}>
        <View style={{paddingTop: 20, paddingHorizontal: 20}}>
          <Text>Recommended Search</Text>
        </View>
        {results.length > 0 && !loading ? (
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={item => item?.id}
            contentContainerStyle={styles.listContainer}
          />
        ) : loading ? (
          <View
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>No result found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fc8b32',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginRight: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
    marginLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  cancelButton: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginRight: 12,
    borderWidth: 0.2,
    borderColor: '#fff',
    borderRadius: 4,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 8,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#f2f2f2',
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fc8b32',
  },
  cityName: {
    fontSize: 14,
    color: '#777',
  },
});

export default SearchScreen;
