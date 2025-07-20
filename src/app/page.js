import Hero from "@/components/layout/Hero.js"
import HomeMenu from "@/components/layout/HomeMenu.js"
import SectionHeaders from "@/components/layout/SectionHeaders.js"


export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      
      <section className="text-center my-16" id="about">
        <SectionHeaders 
          subHeader={'Our Story'}
          mainHeader={'About us'}
        />
        
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            We Provide Good Quality Food To Your Family!
            Step into our family-owned restaurant, where each dish is a labor of love steeped 
            in tradition. Since 2020, we've been serving up more than just food—we offer a taste 
            of heritage and a warm embrace of home.
          </p>
          <p>
            From our secret family recipes to the inviting 
            ambiance, every element speaks to our commitment to authenticity and hospitality. 
            Join us for a meal and become part of our extended family, where every guest is cherished 
            and every bite tells a story.
          </p>
        </div>
      </section>
     
      <section className="text-center my-8" id="contact">
        <SectionHeaders 
          subHeader={'Don\'t hesitate'} 
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+96181698935">
            +961 81 698 935
          </a>
        </div>
      </section>
    </>
  )
}
