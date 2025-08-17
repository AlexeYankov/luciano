import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/home.jpg"
          alt="Luciano home background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Welcome to Luciano
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md max-w-2xl mx-auto">
            Discover our amazing collection and experience the finest quality products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg">
              Shop Now
            </button>
            <button className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200">
              Learn More
            </button>
            </div>
        </div>
      </div>
    </div>
  )
}
