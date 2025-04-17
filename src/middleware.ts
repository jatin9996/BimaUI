import { NextRequest, NextResponse } from 'next/server'

const BLOCKED_COUNTRIES = ['UK', 'CA', 'BY', 'CU', 'IR', 'KP','RU','SY','UA','GB','US','PR','GU','VI','AS','MP','UM']

export const config = {
  matcher: ['/vaults','/earn','/faucet','/landing'],
};





export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  // if (!geo) {
  //   return ;
  // }
  // if (url.pathname === '/') {
  //   return NextResponse.redirect(url)
  // }
console.log("Request URL", url);

  const country = geo?.country || ''
  if (country && BLOCKED_COUNTRIES.includes(country)) {
    const response = new NextResponse('Not accessible', { status: 403 })
    response.headers.set('Content-Type', 'text/html');
    const htmlContent = `
      <html>
      <head>
        <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f25602;
          color: #721c24;
        }
        .container {
          text-align: center;
          border: 1px solid #f5c6cb;
          padding: 20px;
          background-color: #ffb380;
          border-radius: 5px;
        }
        h1 {
          font-size: 24px;
        }
        p {
          font-size: 18px;
        }
        .country {
          font-weight: bold;
        }
        </style>
      </head>
      <body>
        <div class="container">
        <h1>Access Denied </h1>
        <p>We're sorry, but access from your country (<span class="country">${country}</span>) is restricted.</p>
        </div>
      </body>
      </html>
    `;
    return new Response(htmlContent, { headers: response.headers });
    // return response;
    // return new NextResponse('Not accessible', { status: 403 })
      // req.nextUrl.pathname = '/blocked'
  }

  // return NextResponse.rewrite(req.nextUrl)
}

