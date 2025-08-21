import SpinningLoader from "components/Spinner";
import { useQueryContext } from "context/query-store";
import { getProductSuggestionFromAI } from "gemini";
import { Cpu, Loader, ShoppingBag, User2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

function DetailScreen() {
    const [productSuggestions, setProductSuggestions] = useState<{ name: string; reason: string }[]>([])
    const [loading, setLoading] = useState(false)

    const { query } = useQueryContext()

    const getProductSuggestions = async () => {
        try {
            setLoading(true)
            const prds = await getProductSuggestionFromAI(query)
            if (prds && prds.length > 0) {
                setProductSuggestions(prds)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getProductSuggestions()
        // setProductSuggestions([])
        // setProductSuggestions([{
        //     "name": "Adaptive Pain Management",
        //     "reason": "This device is recommended as it uses advanced technology to provide adaptive pain relief, directly targeting specific areas of discomfort for personalized therapy, which would be beneficial for back pain."
        // },
        // {
        //     "name": "Charge Boost Massage Gun",
        //     "reason": "This product is recommended because it is designed to target sore muscles and improve recovery, which can effectively alleviate discomfort associated with back pain."
        // }])
    }, [])

    return (
        <View className="p-5">
            <View className="flex flex-row justify-center items-start p-5 gap-3">
                <View className="bg-indigo-600 p-2 rounded-full">
                    <User2 color={'white'} size={30} />
                </View>
                <Text className="text-gray-300 font-raleway text-4xl font-semibold">{query}</Text>
            </View>

            <View className="w-full h-0.5 bg-gray-700"></View>

            <View className="flex justify-center items-start p-5 gap-3">
                <View className="flex flex-row justify-center items-center gap-2">
                    <View className="bg-amber-600 p-2 rounded-full">
                        <Cpu color={'white'} size={20} />
                    </View>
                    <Text className="text-amber-500 text-2xl font-raleway font-bold">AI Recommendations</Text>
                </View>
                {/* {!loading && productSuggestions.length === 0 && <Text className="mt-32 w-full text-gray-500 font-bold font-quicksand text-3xl text-center">No Recommendations</Text>} */}
                <ScrollView className="p-2 w-full">
                    {loading ? <View className="flex flex-row justify-start items-center gap-2">
                        <Text className="text-white text-xl">AI is Thinking...</Text>
                        <SpinningLoader><Loader color={'white'} size={20} /></SpinningLoader>
                    </View> : productSuggestions.length > 0 ? productSuggestions.map((item, index) => {
                        return (
                            <View key={index} className="my-2 flex justify-center items-start">
                                <View className="flex flex-row justify-start items-center gap-2">
                                    <Text className="text-gray-300 text-2xl">•</Text>
                                    <Text className="text-gray-300 font-bold font-quicksand text-2xl">{item.name}</Text>
                                </View>
                                <Text className="text-gray-300 text-lg font-semibold font-quicksand ml-4 text-wrap">{item.reason}</Text>
                            </View>
                        )
                    }) : <View className="my-2 h-[200px] flex justify-center items-center bg-gray-800 border rounded-2xl">
                        <View className="flex justify-start items-center gap-2">
                            <ShoppingBag color={'gray'} />
                            <Text className="text-gray-400 text-2xl">No Recommendations</Text>
                            <Text className="text-gray-400 w-44 text-center">The product may not be available as of now.</Text>
                        </View>
                    </View>}
                </ScrollView>
            </View>
        </View>
    );
}

export default DetailScreen;