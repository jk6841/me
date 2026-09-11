import QRCode from 'qrcode.react'

const profile = {
  name: '윤준기',
  major: 'MFE 26',
  email: 'junki.yun@kaist.ac.kr',
  instagram: 'jun96ki',
  github: 'jk6841',
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
    <div className="app">
      <header>
        <h1>안녕하세요 👋</h1>
      </header>

      <main>
        <section className="profile">
          <h2 className="name">{profile.name}</h2>
          <p className="major">{profile.major}</p>

          <div className="info">
            <div className="info-item">
              <span className="label">📧 Email</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <div className="info-item">
              <span className="label">💻 GitHub</span>
              <a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/{profile.github}
              </a>
            </div>
            <div className="info-item">
              <span className="label">📱 Instagram</span>
              <a
                href={`https://instagram.com/${profile.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{profile.instagram}
              </a>
            </div>
          </div>
        </section>

        <section className="qr-section">
          <h3>연락처 QR코드</h3>
          <div className="qr-container">
            <QRCode value={vcard} size={200} level="H" includeMargin />
          </div>
          <p className="qr-hint">QR코드를 스캔하여 연락처를 저장하세요</p>
        </section>
      </main>
    </div>
  )
}
