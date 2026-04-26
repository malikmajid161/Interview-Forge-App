import React from 'react'

const FloatingBackground = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
      <div className="floating-sphere sphere-teal" style={{ top: '10%', left: '5%' }}></div>
      <div className="floating-sphere sphere-purple" style={{ top: '60%', left: '80%', animationDelay: '-5s' }}></div>
      <div className="floating-sphere sphere-coral" style={{ top: '40%', left: '40%', animationDelay: '-10s' }}></div>
      <div className="floating-sphere sphere-teal" style={{ top: '80%', left: '10%', width: '200px', height: '200px', animationDelay: '-15s' }}></div>
    </div>
  )
}

export default FloatingBackground
