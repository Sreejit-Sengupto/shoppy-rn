import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';

import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { ArrowRight, Cpu, Loader, Loader2 } from 'lucide-react-native';
import { getSearchSuggestionFromAI } from 'gemini';
import SpinningLoader from 'components/Spinner';
import { useQueryContext } from 'context/query-store';

function HomeScreen() {
  const navigation = useNavigation<any>();
  // const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const { query, setQuery } = useQueryContext();

  const handleSuggestionPress = (suggestion: string) => {
    setQuery(suggestion);
    // In a real app, trigger search here, e.g., navigate to results or call API
    console.log(`Searching for: ${suggestion}`);
  };

  const handleAskAI = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Details');
    }, 1500);
  };

  const getAISuggestions = async () => {
    try {
      setSuggestionsLoading(true);
      const suggestions = await getSearchSuggestionFromAI();
      if (suggestions) {
        setAiSuggestions(suggestions);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  useEffect(() => {
    setQuery('');
    getAISuggestions();
  }, []);

  // Example AI suggestions (these could be fetched from an API in a real app)

  return (
    <View className="flex h-screen items-center justify-center p-5">
      <Cpu color={'gray'} size={'70'} />
      <Text className="font-raleway text-6xl font-semibold text-white">Shoppy AI</Text>
      <Text className="mb-20 mt-3 w-[80%] text-center font-quicksand font-semibold text-gray-300">
        Searching for something new? Use shoppy to get instant AI suggestions.
      </Text>
      <View className="flex w-full flex-row items-center justify-center">
        <TextInput
          className="w-full rounded-2xl border-2 border-gray-700 bg-gray-800 p-6 text-white"
          placeholder="I want a phone with..."
          placeholderTextColor={'gray'}
          multiline
          value={query}
          onChangeText={(val) => setQuery(val)}
        />
        <Pressable
          className="absolute right-0 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full bg-blue-500 p-2 disabled:bg-gray-500"
          onPress={handleAskAI}
          disabled={!query}>
          {loading ? (
            <SpinningLoader>
              <Loader color={'white'} />
            </SpinningLoader>
          ) : (
            <ArrowRight color={'white'} />
          )}
        </Pressable>
      </View>

      <View className="mb-5 mt-10 flex flex-row flex-wrap items-center justify-center gap-2">
        {suggestionsLoading ? (
          <SpinningLoader>
            <Loader2 color={'white'} size={32} />
          </SpinningLoader>
        ) : aiSuggestions.length > 0 ? (
          aiSuggestions.map((item, index) => (
            <Pressable
              onPress={() => handleSuggestionPress(item)}
              key={index}
              className="rounded-full bg-slate-600 p-3">
              <Text className="text-gray-300">{item.substring(0, 22)}....</Text>
            </Pressable>
          ))
        ) : (
          <Text className="text-gray-500">No Suggestions</Text>
        )}
      </View>
    </View>
  );
}

export default HomeScreen;
