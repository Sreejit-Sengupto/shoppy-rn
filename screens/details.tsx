import SpinningLoader from 'components/Spinner';
import { useQueryContext } from 'context/query-store';
import { getProductSuggestionFromAI } from 'gemini';
import { Cpu, Loader, ShoppingBag, User2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

function DetailScreen() {
  const [productSuggestions, setProductSuggestions] = useState<{ name: string; reason: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const { query } = useQueryContext();

  const getProductSuggestions = async () => {
    try {
      setLoading(true);
      const prds = await getProductSuggestionFromAI(query);
      if (prds && prds.length > 0) {
        setProductSuggestions(prds);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductSuggestions();
    // setProductSuggestions([])
    // setProductSuggestions([{
    //     "name": "Adaptive Pain Management",
    //     "reason": "This device is recommended as it uses advanced technology to provide adaptive pain relief, directly targeting specific areas of discomfort for personalized therapy, which would be beneficial for back pain."
    // },
    // {
    //     "name": "Charge Boost Massage Gun",
    //     "reason": "This product is recommended because it is designed to target sore muscles and improve recovery, which can effectively alleviate discomfort associated with back pain."
    // }])
  }, []);

  return (
    <View className="p-5">
      <View className="flex flex-row items-start justify-center gap-3 p-5">
        <View className="rounded-full bg-indigo-600 p-2">
          <User2 color={'white'} size={30} />
        </View>
        <Text className="font-raleway text-4xl font-semibold text-gray-300">{query}</Text>
      </View>

      <View className="h-0.5 w-full bg-gray-700"></View>

      <View className="flex items-start justify-center gap-3 p-5">
        <View className="flex flex-row items-center justify-center gap-2">
          <View className="rounded-full bg-amber-600 p-2">
            <Cpu color={'white'} size={20} />
          </View>
          <Text className="font-raleway text-2xl font-bold text-amber-500">AI Recommendations</Text>
        </View>
        {/* {!loading && productSuggestions.length === 0 && <Text className="mt-32 w-full text-gray-500 font-bold font-quicksand text-3xl text-center">No Recommendations</Text>} */}
        <ScrollView className="w-full p-2">
          {loading ? (
            <View className="flex flex-row items-center justify-start gap-2">
              <Text className="text-xl text-white">AI is Thinking...</Text>
              <SpinningLoader>
                <Loader color={'white'} size={20} />
              </SpinningLoader>
            </View>
          ) : productSuggestions.length > 0 ? (
            productSuggestions.map((item, index) => {
              return (
                <View key={index} className="my-2 flex items-start justify-center">
                  <View className="flex flex-row items-center justify-start gap-2">
                    <Text className="text-2xl text-gray-300">•</Text>
                    <Text className="font-quicksand text-2xl font-bold text-gray-300">
                      {item.name}
                    </Text>
                  </View>
                  <Text className="ml-4 text-wrap font-quicksand text-lg font-semibold text-gray-300">
                    {item.reason}
                  </Text>
                </View>
              );
            })
          ) : (
            <View className="my-2 flex h-[200px] items-center justify-center rounded-2xl border bg-gray-800">
              <View className="flex items-center justify-start gap-2">
                <ShoppingBag color={'gray'} />
                <Text className="text-2xl text-gray-400">No Recommendations</Text>
                <Text className="w-44 text-center text-gray-400">
                  The product may not be available as of now.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

export default DetailScreen;
