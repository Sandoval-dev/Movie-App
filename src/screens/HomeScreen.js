import { Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme'
import TrendingMovies from '../components/trendingMovies'
import MovieList from '../components/movieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { fetchtopRatedMovies, fetchTrendingMovies, fetchupComingMovies } from '../../api/moviedb'

const ios = Platform.OS === 'ios'
export default function HomeScreen() {
  const [trending, setTrending] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [topRated, setToprated] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(()=> {
    getTrendingMovies()
    getUpComingMovies()
    getTopRatedMovies()
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies()
    //console.log('trending movies', data)
    if (data && data.results) setTrending(data.results)
      setLoading(false)
  }

  const getUpComingMovies = async () => {
    const data = await fetchupComingMovies()
    if (data && data.results) setUpcoming(data.results)
  }

  const getTopRatedMovies = async () => {
    const data = await fetchtopRatedMovies()
    if (data && data.results) setToprated(data.results)
  }
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? "mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4 my-3">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color='white' />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
      {
        loading ? (
          <Loading />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>

            {trending.length> 0 && <TrendingMovies data={trending} />}

            <MovieList hideSeeAll={true} title="Upcoming" data={upcoming} />

            <MovieList hideSeeAll={true} title="Top Rated" data={topRated} />

          </ScrollView>
        )
      }

    </View>
  )
}

