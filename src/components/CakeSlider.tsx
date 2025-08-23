'use client'

import { useState } from 'react'

interface CakeCard {
  id: number
  name: string
  description: string
  price: string
  image: string
}

export default function CakeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const cakeCards: CakeCard[] = [
    {
      id: 1,
      name: 'Клубничный торт',
      description: 'Нежный торт с клубникой и сливочным кремом',
      price: '1200 ₽',
      image: '/assets/images/strawberry-cake.jpg'
    },
    {
      id: 2,
      name: 'Шоколадный торт',
      description: 'Классический шоколадный торт с шоколадной глазурью',
      price: '1400 ₽',
      image: '/assets/images/chocolate-cake.jpg'
    },
    {
      id: 3,
      name: 'Ванильный торт',
      description: 'Воздушный ванильный торт с ягодным джемом',
      price: '1100 ₽',
      image: '/assets/images/vanilla-cake.jpg'
    },
    {
      id: 4,
      name: 'Лимонный торт',
      description: 'Освежающий лимонный торт с цитрусовой начинкой',
      price: '1300 ₽',
      image: '/assets/images/lemon-cake.jpg'
    },
    {
      id: 5,
      name: 'Ореховый торт',
      description: 'Питательный торт с грецкими орехами и медом',
      price: '1500 ₽',
      image: '/assets/images/nut-cake.jpg'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev + 1
      return next >= cakeCards.length - 2 ? 0 : next
    })
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const prevSlide = prev - 1
      return prevSlide < 0 ? cakeCards.length - 3 : prevSlide
    })
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.min(index, cakeCards.length - 3))
  }

  const visibleCards = cakeCards.slice(currentSlide, currentSlide + 3)

  return (
    <section id="menu" className="w-full h-[700px] relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: 'url(/assets/images/slider.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Smooth transition gradient from top */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10"></div>
      
      {/* Затемнение для лучшей читаемости */}
      <div className="absolute inset-0 bg-black/20 z-5"></div>
      
      {/* Smooth transition gradient to bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
      
      {/* Контент слайдера */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center px-4">
        <h2 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg animate-fade-in">
          Наши работы
        </h2>
        
        {/* Слайдер с 3 карточками */}
        <div className="w-full max-w-6xl mx-auto relative">
          {/* Карточки */}
          <div className="flex justify-center gap-6">
            {visibleCards.map((card, index) => (
              <div 
                key={card.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl w-80 flex-shrink-0 transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-pink-200 to-red-200 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    <span className="text-3xl">🍰</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {card.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {card.description}
                  </p>
                  <div className="text-xl font-bold text-pink-600">
                    {card.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Навигационные кнопки */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Индикаторы слайдов */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(cakeCards.length / 3) }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index * 3)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                Math.floor(currentSlide / 3) === index
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
