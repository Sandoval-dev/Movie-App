import { View, Text, Dimensions, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useCallback, useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { debounce } from 'lodash'
import { fetchSearchMovies, image185 } from '../../api/moviedb'

var { width, height } = Dimensions.get('window')

export default function SearchScreen() {
    const navigation = useNavigation()
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    let movieName = "Avengers : Infinity War"

    const handleSearch = value => {
        if (value && value.length > 2) {
            setLoading(true)
            fetchSearchMovies({
                query: value,
                include_adult: 'false',
                language: 'en-US',
                page: '1'
            }).then(data => {
                setLoading(false)
                if(data && data.results) setResults(data.results)
            })
        }
        else {
            setLoading(false)
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), [])
    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
                <TextInput onChangeText={handleTextDebounce} placeholder='Search Movie' placeholderTextColor={'lightgray'}
                    className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider' />
                <TouchableOpacity onPress={() => { navigation.navigate('Home') }} className="rounded-full p-3 m-1 bg-neutral-500">
                    <XMarkIcon size="25" color="white" />
                </TouchableOpacity>

            </View>
            {/* results */}
            {
                loading ? (<Loading />) :

                    results.length > 0 ? (
                        <ScrollView className="space-y-3" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                            <Text className="text-white font-semibold ml-1">
                                Results ({results.length})
                            </Text>
                            <View className="flex-row justify-between flex-wrap">
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback onPress={() => navigation.push("Movie", item)} key={index} className="w-1/2 p-3 bg-neutral-500 rounded-lg shadow-md">
                                                <View className="space-y-2 mb-4">
                                                    <Image className="rounded-3xl" style={{ width: width * 0.44, height: height * 0.3 }}
                                                     source={{uri:image185(item?.poster_path)}} />
                                                    <Text className="text-neutral-400 ml-1">{item?.title.length > 22 ? item?.title.slice(0, 22) + '...' : item?.title}</Text>
                                                </View>

                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View className="flex-row justify-center">
                            <Image className="h-96 w-96" source={require('../../assets/favicon.png')} />
                        </View>
                    )

            }


        </SafeAreaView>
    )
}