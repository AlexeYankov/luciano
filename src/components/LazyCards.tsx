'use client'

import { useState, useEffect, useRef } from 'react'
import cakeDescriptions from '@/assets/descriptions/description.json'

interface CakeDescription {
  weight: string
  description: string
  name: string
}

interface CakeCategory {
  [key: string]: CakeDescription
}

interface CakeData {
  [key: string]: CakeCategory
}

interface Card {
  id: number
  title: string
  description: string
  category: string
  weight: string
  image: string
}

export default function LazyCards() {
  const [visibleCards, setVisibleCards] = useState<Card[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  // Генерируем карточки из данных description.json
  const generateCards = (startIndex: number, count: number): Card[] => {
    const cards: Card[] = []
    const cakeData = cakeDescriptions as CakeData
    
    // Получаем все торты из всех категорий
    const allCakes: Array<{category: string, key: string, data: CakeDescription}> = []
    
    Object.entries(cakeData).forEach(([categoryKey, category]) => {
      Object.entries(category).forEach(([cakeKey, cakeData]) => {
        allCakes.push({
          category: categoryKey,
          key: cakeKey,
          data: cakeData
        })
      })
    })
    
    // Генерируем карточки начиная с startIndex
    for (let i = 0; i < count && startIndex + i < allCakes.length; i++) {
      const cake = allCakes[startIndex + i]
      const id = startIndex + i
      
      cards.push({
        id,
        title: cake.data.name,
        description: cake.data.description,
        category: cake.category,
        weight: cake.data.weight,
        image: `/assets/images/cake-${(id % 8) + 1}.jpg` // Циклично используем 8 изображений
      })
    }
    
    return cards
  }

  // Имитация загрузки карточек
  const loadMoreCards = async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    
    // Имитируем задержку загрузки
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const newCards = generateCards(visibleCards.length, 8) // Загружаем по 8 карточек (2 ряда)
    
    setVisibleCards(prev => [...prev, ...newCards])
    
    // Останавливаем загрузку когда все торты загружены
    if (newCards.length < 8) {
      setHasMore(false)
    }
    
    setIsLoading(false)
  }

  // Настройка Intersection Observer для ленивой загрузки
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreCards()
        }
      },
      { threshold: 0.1 }
    )

    observerRef.current = observer

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, isLoading, visibleCards.length])

  // Загружаем первые карточки при монтировании
  useEffect(() => {
    loadMoreCards()
  }, [])

  // Функция для получения читаемого названия категории
  const getCategoryDisplayName = (categoryKey: string): string => {
    const categoryNames: { [key: string]: string } = {
      'kids': 'Детские торты',
      'medovye-i-sloenye': 'Медовые и слоеные',
      'vozdushno-orehovye': 'Воздушно-ореховые',
      'biskvitnye': 'Бисквитные'
    }
    return categoryNames[categoryKey] || categoryKey
  }

  return (
    <section className="w-full py-16 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: 'url(/assets/images/bg-infinity.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40 z-5"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
            Наши торты
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Изучите наше портфолио и выберите идеальный дизайн для вашего торта
          </p>
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {visibleCards.map((card) => (
            <div
              key={card.id}
              className="group relative bg-white/95 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden cursor-pointer"
            >
              {/* Изображение карточки */}
              <div className="w-[150px] h-[150px] mx-auto bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <span className="text-4xl">🎂</span>
              </div>
              
              {/* Контент карточки */}
              <div className="p-4 text-center">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full font-medium">
                    {getCategoryDisplayName(card.category)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-2 group-hover:text-pink-600 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                  {card.description}
                </p>
                <p className="text-xs text-gray-400 font-medium">
                  Вес: {card.weight} кг
                </p>
              </div>

              {/* Hover эффект */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <button className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium hover:bg-pink-100 transition-colors duration-200">
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Индикатор загрузки */}
        {isLoading && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}

        {/* Сообщение о конце загрузки */}
        {!hasMore && (
          <div className="text-center text-white/80">
            <p>Все торты загружены</p>
          </div>
        )}

        {/* Невидимый элемент для отслеживания скролла */}
        <div ref={loadingRef} className="h-4" />
      </div>
    </section>
  )
}
