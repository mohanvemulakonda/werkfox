import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        {/* Simplified CMYK-inspired circular design */}
        <div
          style={{
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Center circle - Key (Black) */}
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#1E293B',
              position: 'absolute',
              zIndex: 4,
            }}
          />

          {/* Cyan arc */}
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '3px solid #00B8D4',
              borderRadius: '50%',
              position: 'absolute',
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
              transform: 'rotate(0deg)',
              zIndex: 3,
            }}
          />

          {/* Magenta arc */}
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '3px solid #E91E63',
              borderRadius: '50%',
              position: 'absolute',
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
              transform: 'rotate(120deg)',
              zIndex: 2,
            }}
          />

          {/* Yellow arc */}
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '3px solid #FFC107',
              borderRadius: '50%',
              position: 'absolute',
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
              transform: 'rotate(240deg)',
              zIndex: 1,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
