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
        image:
          'https://i.namu.wiki/i/WxUUEpbiRMWJgTjZCVuneM4BviNZe1XEs0kfxswDdYe0Mapp_k-xo347fxdJ_j4OoqGVDLdIH-nLgzcuRYpq10t7xCUcMK5ur4a6IbkX-tK5JuRbYjwF6QxPKZ42ApeCz9PMQyakr2A5aKwiG8O2ig.webp',
        emoji: '🥚',
      },
      {
        label: '삼겹살',
        image:
          'https://i.namu.wiki/i/cnxMxdL53udvyransvaTYrlTkJqQHcXX-ae9aTVNkyEiebmnP0SI6-9Xsp7Es5r3JkwpdeoVWoCyn5D-hKR7nCZ8hl3PnFrZPnfEoA4PhHCF_8-eAEzJqbikpAtrsByZnUjFxhQ0TCgKWXp-KVeHCQ.webp',
        emoji: '🥓',
      },
    ],
  },
  {
    title: '운동',
    items: [
      {
        label: '헬스 기구',
        image:
          'https://i.namu.wiki/i/06lgUlsOFjPBZLaif8i-BaOTondntugQ3YWazwq4Ae5E1p8EcbPPM5wAiCsTLeTcO_ugTnpY4OrUrzg5BrDQtcoOAo0t_phLKXvBvS9naESUdcaxLfwtlV0irfbPk2zUH8YbsV7zNeQaZ7hm5ZwN0w.webp',
        emoji: '🏋️',
      },
      {
        label: '호날두',
        image: 'https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/05/104767925.1.jpg',
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
        image:
          'https://i.namu.wiki/i/XOJXsCc1NSRhEd0nz5YMq6zd_9CPbuF3t-_aebFTWTWbuXlLV6xc2MSkfsosrXgo9YXuWpRfBdSUgw2fvtcwMhvkuCGMhZb0xi-s2dI-3-uwJdhEjo-PNvbqtp2tHqQAAyUTQOBrXvC-GVPPVF6Asg.webp',
        emoji: '🎵',
      },
      {
        label: '전상근',
        image:
          'https://i.namu.wiki/i/4dusb-8uN8HDqXlK-b0ljA6ZGtEwr8E0du81ftT-EA52MYSTVY2ONZNsxKfPVpV5v_S5q1vCMEUEKaFOkhUTJ3xNt-xj9RZ_lUh9XYGVDH8w5SUtpm18RCf4ikRMbp4uHfYYGbO1vpmot1h3pTxflg.webp',
        emoji: '🎵',
      },
    ],
  },
  {
    title: '아이돌',
    items: [
      {
        label: '송하영',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPOnfng2OM9q5DRg_BMssnkYJg04NjN1za5C4gmbaljShytU-I16nOIEg&s=10',
        emoji: '🎤',
      },
      {
        label: '닝닝',
        image:
          'https://i.namu.wiki/i/KS_zBM0k1HQ6JCWBhfSr4JXv9YEwjfny-juACOK_i-SDcnkQ2yjlZ7H1zfp8WEGdUj4qG7E27rirCpcgMDY0B9QDAewaHm97Ee8AENrTy1J7Az-f8URpLhVwo-LDEfuLthoBPu7XXO9AwOeWWSX5LA.webp',
        emoji: '🎤',
      },
      {
        label: '유하',
        image:
          'https://i.namu.wiki/i/AWEbODuDVjhp0ZHwYAvU2ONz6J6sAQGTRcO3AShmYaSbeIHUelZpfoH6JZQbGO4gzJbjrNaFY3Deh0W9KEryrb8xFjBXRFiba6CJZUCGs5a4aM1Zrgb9TIjQyN9jE6sW9AckIehHaJcDeBM06nS5dA.webp',
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
