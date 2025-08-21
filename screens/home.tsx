import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';

import {
    createStaticNavigation,
    useNavigation,
} from '@react-navigation/native';
import { ArrowRight, Cpu, Loader, Loader2 } from 'lucide-react-native';
import { getSearchSuggestionFromAI } from 'gemini';
import SpinningLoader from 'components/Spinner';
import { useQueryContext } from 'context/query-store';



function HomeScreen() {
    const navigation = useNavigation<any>();
    // const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false)
    const [suggestionsLoading, setSuggestionsLoading] = useState(false)
    const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

    const { query, setQuery } = useQueryContext()

    const handleSuggestionPress = (suggestion: string) => {
        setQuery(suggestion);
        // In a real app, trigger search here, e.g., navigate to results or call API
        console.log(`Searching for: ${suggestion}`);
    };

    const handleAskAI = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            navigation.navigate('Details')
        }, 1500)
    }

    const getAISuggestions = async () => {
        try {
            setSuggestionsLoading(true)
            const suggestions = await getSearchSuggestionFromAI()
            if (suggestions) {
                setAiSuggestions(suggestions)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSuggestionsLoading(false)
        }
    }

    useEffect(() => {
        setQuery("")
        getAISuggestions()
    }, [])

    // Example AI suggestions (these could be fetched from an API in a real app)

    return (
        <View className="h-screen flex justify-center items-center p-5">
            <Cpu color={'gray'} size={'70'} />
            <Text className='text-white text-6xl font-semibold font-raleway'>Shoppy AI</Text>
            <Text className='text-center mt-3 mb-20 font-semibold font-quicksand text-gray-300 w-[80%]'>Searching for something new? Use shoppy to get instant AI suggestions.</Text>
            <View className='w-full flex flex-row justify-center items-center'>
                <TextInput className='bg-gray-800 w-full p-6 rounded-2xl border-2 border-gray-700 text-white' placeholder='I want a phone with...' placeholderTextColor={'gray'} multiline value={query} onChangeText={(val) => setQuery(val)} />
                <Pressable className='absolute top-1/2 right-0 translate-x-[-50%] translate-y-[-50%] bg-blue-500 p-2 rounded-full disabled:bg-gray-500' onPress={handleAskAI} disabled={!query}>
                    {loading ? <SpinningLoader><Loader color={'white'} /></SpinningLoader> : <ArrowRight color={'white'} />}
                </Pressable>
            </View>

            <View className='mt-10 mb-5 flex flex-row justify-center items-center flex-wrap gap-2'>
                {suggestionsLoading ? <SpinningLoader><Loader2 color={'white'} size={32} /></SpinningLoader> : aiSuggestions.length > 0 ? aiSuggestions.map((item, index) =>
                    <Pressable onPress={() => handleSuggestionPress(item)} key={index} className='bg-slate-600 p-3 rounded-full'>
                        <Text className='text-gray-300'>{item.substring(0, 22)}....</Text>
                    </Pressable>) : <Text className='text-gray-500'>No Suggestions</Text>}
            </View>
        </View>
    );
}

export default HomeScreen