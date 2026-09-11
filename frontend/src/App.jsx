import QRCode from 'qrcode.react'

const profile = {
  name: '윤준기',
  major: 'MFE 26',
  email: 'junki.yun@kaist.ac.kr',
  instagram: 'jun96ki',
  github: 'jk6841',
  interests: ['💪 헬스', '🎵 음악', '🍳 요리', '🎤 아이돌', '⚽ 호날두', '🥗 다이어트'],
}

function generateVCardQR() {
  return `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
EMAIL:${profile.email}
NOTE:${profile.major}
URL:https://instagram.com/${profile.instagram}
END:VCARD`
}

export default function App() {
  const vcard = generateVCardQR()

  return (
    <div className="min-h-screen bg-cream px-4 py-12">
      <div className="mx-auto flex max-w-xl flex-col gap-8">
        <header className="pt-8 pb-4 text-center">
          <h1 className="text-4xl leading-tight font-semibold tracking-sb text-starbucks-green">
            안녕하세요 👋
          </h1>
        </header>

        <main className="flex flex-col gap-8">
          <section className="bg-white rounded-card shadow-card p-8">
            <p className="mb-2 text-xs font-semibold tracking-sb-loose text-ink-soft uppercase">
              {profile.major}
            </p>
            <h2 className="mb-6 text-3xl font-semibold tracking-sb text-starbucks-green">
              {profile.name}
            </h2>

            <div className="mb-6 flex flex-wrap gap-3">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-accent-green px-4 py-1.5 text-sm font-semibold tracking-sb text-accent-green"
                >
                  {interest}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
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
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold tracking-sb-loose text-ink-soft uppercase">
                  💻 GitHub
                </span>
                <a
                  href={`https://github.com/${profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-accent-green hover:underline"
                >
                  github.com/{profile.github}
                </a>
              </div>
              <div className="flex flex-col gap-1">
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

          <section className="bg-house-green rounded-card p-8 text-center">
            <h3 className="mb-6 text-lg font-semibold tracking-sb text-ink-on-green">
              연락처 QR코드
            </h3>
            <div className="rounded-card mb-4 flex justify-center bg-white p-6">
              <QRCode value={vcard} size={200} level="H" includeMargin />
            </div>
            <p className="text-sm text-ink-on-green-soft">QR코드를 스캔하여 연락처를 저장하세요</p>
          </section>
        </main>
      </div>
    </div>
  )
}
