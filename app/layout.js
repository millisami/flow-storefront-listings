import '@picocss/pico/css/pico.css'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <main className='container'>
          <nav className="grid">
            <ul>
              <li><h3>Flow NFTStorefrontV1 Listings</h3></li>
            </ul>
          </nav>
          <hr/>
          {children}
        </main>
      </body>
    </html>
  )
}
