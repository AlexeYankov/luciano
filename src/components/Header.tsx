'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'На верх' },
    { href: '/menu', label: 'К тортикам!' },
    { href: '/about', label: 'О нас' },
    { href: '/basket', label: 'Корзина' },
    { href: '/orders', label: 'Заказы' }
  ]

  // Определяем активную ссылку: если скролл > 0, то активна "К тортикам!", иначе по pathname
  const getActiveHref = () => {
    if (isScrolled) {
      return '/menu'
    }
    return pathname
  }

  const activeHref = getActiveHref()

  return (
    <header className="bg-none backdrop-blur-md border-b border-white/30 shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white drop-shadow-lg transition-all duration-300 hover:scale-105">
              Luciano
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 ease-in-out ${
                    activeHref === item.href
                      ? 'text-white bg-white/20 shadow-lg backdrop-blur-sm scale-105'
                      : 'text-white/90 hover:text-white hover:bg-white/10 hover:backdrop-blur-sm hover:scale-105'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button className="text-white hover:text-white/80 p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-110">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
