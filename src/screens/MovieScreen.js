import { Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { styles, theme } from '../theme'
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast'
import MovieList from '../components/movieList'
import Loading from '../components/loading'
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../../api/moviedb'


var { width, height } = Dimensions.get('window')
const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : 'mt-3'
export default function MovieScreen() {
    let movieName = "Avengers : Infinity War"
    const { params: item } = useRoute()
    const [isFavorite, toogleFavorite] = useState(false)
    const [loading, setLoading] = useState(false)
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [movie, setMovie] = useState({})
    const navigation = useNavigation()
    useEffect(() => {

        setLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
        //console.log('item', item.id)
    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id)
        //console.log(data)
        if (data) setMovie(data)
        setLoading(false)
    }

    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id)
        //console.log(data)
        if (data) setCast(data.cast)
    }

    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id)
        console.log('similarrrrr',data)
        if (data) setSimilarMovies(data.results)
    }
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }} className="flex-1 bg-neutral-900">
            <View className="w-full">
                <SafeAreaView className={`absolute z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toogleFavorite(!isFavorite)}>
                        <HeartIcon size="35" color={isFavorite ? theme.background : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (<Loading />) : (
                        <View>
                            <Image //source={require('../../assets/movieposter1.jpg')} 
                                style={{ width, height: height * 0.65 }} source={{ uri: image500(item.poster_path) } || fallbackMoviePoster} />
                            <LinearGradient colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={{ width, height: height * 0.4 }} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} className="absolute bottom-0" />
                        </View>

                    )
                }

            </View>
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {movie?.title}
                </Text>
                {
                    movie?.id ? (<Text className="text-neutral-400 text-center font-semibold text-base">
                        {movie?.status} · {movie?.release_date?.split('-')[0]} · {movie?.runtime} min
                    </Text>) : null
                }
                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genre,index) => {
                            let showDot = index+1 !=movie.genres.length
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name} {showDot? "·" : ""}
                                </Text>
                            )
                        })
                    }

                </View>
                <Text className="text-neutral-400 mx-4 tracking-wider">
                   {
                    movie?.overview
                   }
                </Text>
            </View>

            <Cast navigation={navigation} cast={cast} />

           { similarMovies.length>0 && <MovieList title="Similar Movies" data={similarMovies} hideSeeAll={true} /> }

        </ScrollView>
    )
}
