import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode.react'

const profile = {
  name: '윤준기',
  major: 'MFE 26',
  email: 'junki.yun@kaist.ac.kr',
  instagram: 'jun96ki',
  github: 'jk6841',
}

const interestCategories = [
  {
    title: '다이어트',
    items: [
      {
        label: '달걀',
        image: '/interests/egg.webp',
        emoji: '🥚',
      },
      {
        label: '삼겹살',
        image: '/interests/samgyeopsal.webp',
        emoji: '🥓',
      },
    ],
  },
  {
    title: '운동',
    items: [
      {
        label: '헬스 기구',
        image: '/interests/health.webp',
        emoji: '🏋️',
      },
      {
        label: '호날두',
        image: '/interests/ronaldo.jpg',
        emoji: '⚽',
      },
    ],
  },
  {
    title: '요리 (가끔)',
    items: [
      { label: '한식', image: '/interests/korea_food.jpeg', emoji: '🍳' },
      { label: '피자', image: '/interests/pizza.jpeg', emoji: '🍕' },
      { label: '스테이크', image: '/interests/steak.jpeg', emoji: '🥩' },
    ],
  },
  {
    title: '음악',
    items: [
      {
        label: '신용재',
        image: '/interests/shin_youngjae.webp',
        emoji: '🎵',
      },
      {
        label: '전상근',
        image: '/interests/jeon_sangkeun.webp',
        emoji: '🎵',
      },
    ],
  },
  {
    title: '아이돌',
    items: [
      {
        label: '송하영',
        image: '/interests/song_hayoung.jpg',
        emoji: '🎤',
      },
      {
        label: '닝닝',
        image: '/interests/ningning.webp',
        emoji: '🎤',
      },
      {
        label: '유하',
        image: '/interests/yuha.webp',
        emoji: '🎤',
      },
    ],
  },
]

function generateVCardQR() {
  return `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
EMAIL:${profile.email}
NOTE:${profile.major}
URL:https://instagram.com/${profile.instagram}
END:VCARD`
}

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

function ImageTile({ image, emoji, label, delay = 0 }) {
  const [ref, visible] = useReveal()
  const [failed, setFailed] = useState(false)

  return (
    <div
      ref={ref}
      className={`reveal aspect-square w-full overflow-hidden rounded-card bg-ceramic ${visible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {failed ? (
        <div className="flex h-full w-full items-center justify-center text-6xl">{emoji}</div>
      ) : (
        <img
          src={image}
          alt={label}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

const GRID_COLS_BY_COUNT = {
  1: 'grid-cols-1 sm:grid-cols-2',
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
}

function InterestSection({ title, items }) {
  const [ref, visible] = useReveal()
  const gridColsClass = GRID_COLS_BY_COUNT[items.length] ?? 'grid-cols-2 sm:grid-cols-3'

  return (
    <section ref={ref} aria-label={title} className={`reveal ${visible ? 'reveal-visible' : ''}`}>
      <div className={`grid ${gridColsClass} gap-5`}>
        {items.map((item, index) => (
          <ImageTile key={item.label} {...item} delay={index * 80} />
        ))}
      </div>
    </section>
  )
}

export default function App() {
  const vcard = generateVCardQR()
  const [profileRef, profileVisible] = useReveal()
  const [qrRef, qrVisible] = useReveal()
  const [interestsRef, interestsVisible] = useReveal()

  return (
    <div className="min-h-screen bg-cream px-4 py-12 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex justify-end">
          <Link
            to="/memo"
            className="rounded-card bg-starbucks-green px-4 py-2 text-sm font-semibold tracking-sb text-white shadow-card transition hover:opacity-90"
          >
            메모장
          </Link>
        </div>
        <main className="flex flex-col gap-10">
          <section
            ref={profileRef}
            className={`reveal bg-white rounded-card shadow-card p-10 lg:p-14 ${profileVisible ? 'reveal-visible' : ''}`}
          >
            <div className="mb-10 text-center">
              <p className="mb-2 text-xs font-semibold tracking-sb-loose text-ink-soft uppercase">
                {profile.major}
              </p>
              <h2 className="text-4xl font-semibold tracking-sb text-starbucks-green lg:text-5xl">
                {profile.name}
              </h2>
            </div>

            <div className="grid gap-8 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-xs font-semibold tracking-sb-loose text-ink-soft uppercase">
                  📧 Email
                </span>
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all text-accent-green hover:underline"
                >
                  {profile.email}
                </a>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-xs font-semibold tracking-sb-loose text-ink-soft uppercase">
                  💻 GitHub
                </span>
                <a
                  href={`https://github.com/${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-accent-green hover:underline"
                >
                  https://github.com/{profile.github}
                </a>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-xs font-semibold tracking-sb-loose text-ink-soft uppercase">
                  📱 Instagram
                </span>
                <a
                  href={`https://instagram.com/${profile.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-accent-green hover:underline"
                >
                  @{profile.instagram}
                </a>
              </div>
            </div>
          </section>

          <section
            ref={qrRef}
            className={`reveal bg-house-green rounded-card p-10 text-center lg:p-14 ${qrVisible ? 'reveal-visible' : ''}`}
          >
            <h3 className="mb-8 text-lg font-semibold tracking-sb text-ink-on-green">
              연락처 QR코드
            </h3>
            <div className="rounded-card mb-4 flex justify-center bg-white p-8">
              <QRCode value={vcard} size={240} level="H" includeMargin />
            </div>
            <p className="text-sm text-ink-on-green-soft">QR코드를 스캔하여 연락처를 저장하세요</p>
          </section>

          <section
            ref={interestsRef}
            className={`reveal bg-white rounded-card shadow-card p-10 lg:p-14 ${interestsVisible ? 'reveal-visible' : ''}`}
          >
            <h3 className="mb-10 text-center text-lg font-semibold tracking-sb text-starbucks-green">
              관심사
            </h3>
            <div className="flex flex-col gap-12">
              {interestCategories.map((category) => (
                <InterestSection key={category.title} title={category.title} items={category.items} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
