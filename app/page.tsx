import { Hero } from '@/components/marketing/hero'
import { SiteNav } from '@/components/marketing/site-nav'
import {
  ClosingCta,
  FeaturedCoaches,
  Features,
  HowItWorks,
  Pricing,
  SiteFooter,
  Testimonials,
  TrustSection,
} from '@/components/marketing/sections'

export default function LandingPage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <TrustSection />
        <FeaturedCoaches />
        <Testimonials />
        <Pricing />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  )
}
