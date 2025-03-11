import React from 'react'
import Hero from '../components/Hero'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import LatestMensCollection from '../components/LatestMensCollection'
import LatestWomensCollection from '../components/LatestWomensCOllections'
import LatestKidsCollection from '../components/LatestKidsCollections'

const Home = () => {
  return (
    <div>
      <Hero/>
      <BestSeller/>
      <LatestMensCollection/>
      <LatestWomensCollection/>
      <LatestKidsCollection/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home