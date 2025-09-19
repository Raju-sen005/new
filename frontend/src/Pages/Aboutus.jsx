import React from 'react'
import story from "./images/Beach-&-Nautical Style.png"
import ourpromise from "./images/story-web.webp"
import Header from '../Components/Header'
import Footer from '../Components/Footer'
function Aboutus() {
  return (
    <>
      <Header />
      <div className="bg-gray-50 text-gray-800">
        {/* Hero Section */}
        <section
          className="relative bg-cover bg-center h-[400px]"
style={{ top:"200px" }}
        >
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
              About Us
            </h1>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-6xl mx-auto px-6 py-12" style={{position:"relative",top:"200px", marginBottom:"200px"}}>
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-lg leading-relaxed mb-4">
            Vinston Designs – Crafted with Meaning, Inspired by Legends. Our journey began in early 2020,
            just before the world paused. While the pandemic disrupted supply chains and silenced many creative voices,
            Vinston Designs quietly emerged from the chaos, with resilience, passion, and a deeper purpose.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            What started as a small jewelry workshop turned into a soul-stirring mission: to create jewelry that tells stories,
            revives forgotten traditions, and reflects the spirit of the wearer. As a passionate jewelry designer, I found myself
            surrounded, almost by fate, by brilliant minds, artists, and cultural experts from across the globe.
            From European Renaissance historians, witchcraft spellcasters, and celestial observers,
            to oceanic life lovers, Viking mythology veterans, and geeky science storytellers,
            each person I met added a unique spark to the fire that became Vinston.
          </p>
          <p className="text-lg leading-relaxed">
            Inspired by their deep knowledge of traditions, ancient lore, and nature’s wonder, I began designing thematic jewelry pieces,
            each one more than an accessory, but a conceptual timepiece with a soul.
          </p>
          {/* <img src={story} alt="Our Story" className="rounded-xl shadow-lg mt-8 w-full" /> */}
        </section>

        {/* What Makes Us Unique */}
        <section className="bg-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">What Makes Us Unique</h2>
            <p className="text-lg leading-relaxed mb-4">
              At Vinston Designs, we don’t just sell jewelry. We create meaningful, themed fine jewelry, designed with intention, storytelling,
              and symbolism. Our designs are rooted in deep research, passion, and collaboration with experts from many walks of life.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              We specialize in handcrafted 925 Sterling Silver and Solid Gold (10k, 14k, 18k) jewelry in rose gold, yellow gold, and white gold finishes,
              adorned with natural gemstones, birthstones, sparkling diamonds, and semi-precious stones.
            </p>
            <p className="text-lg leading-relaxed">
              Each piece is customizable and personalizable. You can add your birthstone, engravings,
              or other meaningful elements to make it truly yours.
            </p>
            <img src={story} alt="Unique Jewelry" className="a-img rounded-xl shadow-lg w-full mt-8" />
          </div>
        </section>

        {/* Thematic Collections */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-semibold mb-6">Our Thematic Jewelry Collections</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Nature-Inspired Jewelry: floral motifs, animals, plants, forest magic</li>
            <li>Ocean & Nautical Jewelry: sailor charms, mermaids, sea creatures, anchors</li>
            <li>Celestial & Zodiac Jewelry: moon phases, sun motifs, astrology zodiac birth signs</li>
            <li>Gothic & Witch-Inspired Jewelry: occult symbols, triple moon, pentacles</li>
            <li>Protection Amulets & Talismans: evil eye, sigils, runes, healing crystals</li>
            <li>Mythological Jewelry: phoenix, unicorn, Pegasus, owls, dragons</li>
            <li>Science & Geek Jewelry: DNA strands, molecules, steampunk elements</li>
            <li>Geometric & Abstract Jewelry: Sacred geometry, minimalism, art deco</li>
            <li>Religious & Spiritual Jewelry: crosses, chakras, hamsa, prayer symbols</li>
            <li>Irish, Norse & Viking Jewelry: Celtic knots, Yggdrasil tree, Thor’s hammer</li>
          </ul>
        </section>

        {/* Jewelry for Every Occasion */}
        <section className="bg-gray-100 py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Jewelry for Every Occasion, Every Emotion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Our pieces are designed to fit into your life story, beautifully and meaningfully. Whether you’re looking for:
            </p>
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>Daily wear, office wear, or party-ready jewelry</li>
              <li>Minimalist, alternative fashion, or antique statement pieces</li>
              <li>
                Personalized gifts for birthdays, anniversaries, engagements, weddings, baby showers,
                housewarmings, retirements, or even a divorce (a new beginning)
              </li>
              <li>
                Seasonal gifts for Christmas, Halloween, Valentine’s Day, Mother’s Day, New Year, or Easter
              </li>
            </ul>
          </div>
        </section>

        {/* Crafted with Passion */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-semibold mb-4">Crafted With Passion, Rooted in Purpose</h2>
          <p className="text-lg leading-relaxed">
            What sets us apart is not just our craftsmanship, but our commitment to creating jewelry that resonates with your soul.
            Each of our designs is backed by symbolism, history, metaphysical meaning, and a story worth telling.
            Our jewelry is for women and men who want to feel empowered, who value art, tradition, and individuality.
            Whether you’re a modern witch, a nature lover, a celestial soul, or a mythology nerd, we craft pieces that
            help you express your identity, beliefs, and energy.
          </p>
        </section>

        {/* The Vinston Promise */}
        <section className="bg-gray-100 py-12 px-6 text-center">
          <h2 className="text-3xl font-semibold mb-8">The Vinston Promise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 max-w-6xl mx-auto">
            <div>
              <ul className="space-y-2 text-left">
                <li>✅ Handmade with love and precision</li>
                <li>✅ Genuine precious and semi-precious gemstones</li>
                <li>✅ Ethically sourced metals and materials</li>
                <li>✅ Customizable and personalizable</li>
                <li>✅ Hypoallergenic and long-lasting</li>
                <li>✅ Crafted to empower and connect with your essence</li>
              </ul>
            </div>

            <div>
              <img src={ourpromise} alt="" />
            </div>
          </div>
        </section>

        {/* Final Note */}
        <section className="max-w-6xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">We Don’t Just Sell Jewelry</h2>
          <p className="text-lg leading-relaxed">
            Thank you for being here. For believing in the magic of meaningful adornment.
            Welcome to Vinston Designs, where each piece reflects a part of you.
            Let’s craft something unforgettable.
          </p>
        </section>
      </div>
      <Footer />
    </>

  )
}

export default Aboutus