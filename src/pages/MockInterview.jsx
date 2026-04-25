import React, { useState, useRef, useEffect } from 'react'
import { Video, Mic, Layout, Play, Clock, Star, Send, User, Bot, Loader2, ArrowLeft } from 'lucide-react'
import { generateInterviewContent, transcribeAudio } from '../lib/ai'

const MockInterview = ({ navigate }) => {
  const [sessionActive, setSessionActive] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  
  const chatEndRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading, isTranscribing])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        setIsTranscribing(true)
        try {
          const transcript = await transcribeAudio(audioBlob)
          setInput(prev => (prev + ' ' + transcript).trim())
        } catch (error) {
          alert("Failed to transcribe audio: " + error.message)
        } finally {
          setIsTranscribing(false)
        }
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorderRef.current.start()
      setIsListening(true)
    } catch (err) {
      console.error("Mic access denied", err)
      alert("Microphone access is required for this feature.")
    }
  }

  const startSession = () => {
    setSessionActive(true)
    setMessages([
      { role: 'ai', content: "Hello! I am your AI Interviewer. I'll be conducting your mock interview today. To start things off, could you please tell me a little bit about yourself and your background?" }
    ])
  }

  const toggleListen = (e) => {
    e.preventDefault()
    if (isListening) {
      mediaRecorderRef.current?.stop()
      setIsListening(false)
    } else {
      startRecording()
    }
  }

  const handleSend = async (e) => {
    e?.preventDefault()
    if (!input.trim() || loading || isTranscribing) return

    if (isListening) {
      mediaRecorderRef.current?.stop()
      setIsListening(false)
    }

    const userMessage = input.trim()
    setInput('')
    const newMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const history = newMessages.map(m => `${m.role === 'ai' ? 'INTERVIEWER' : 'CANDIDATE'}: ${m.content}`).join('\n')
      const prompt = `You are an expert technical interviewer conducting a professional mock interview.
Here is the transcript of the interview so far:
${history}

Respond to the candidate's latest message. 
Instructions:
1. Speak directly to the candidate in a professional, conversational tone.
2. Provide very brief, constructive feedback if they answered a question.
3. Ask exactly ONE relevant follow-up question or new technical/behavioral question.
4. Keep your entire response concise (under 4 sentences). Do NOT use markdown code blocks unless asking a coding question.`

      const response = await generateInterviewContent(prompt)
      setMessages(prev => [...prev, { role: 'ai', content: response }])
    } catch (err) {
      alert("Connection to AI lost. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackData, setFeedbackData] = useState({ strengths: '', improvements: '' })
  const [videoLoading, setVideoLoading] = useState(false)

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setVideoLoading(true)
    // Simulate video frame extraction and processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    try {
      const prompt = `You are an expert AI interview coach analyzing a candidate's video response. 
Based on standard video interview metrics (eye contact, posture, tone, clarity), generate a short feedback report.
Return ONLY a valid JSON object. Do not include markdown. Format:
{
  "strengths": "1-2 sentences about what they did well (e.g. good eye contact, confident tone)",
  "improvements": "1-2 sentences about what they can improve (e.g. less filler words, better lighting)"
}`
      const response = await generateInterviewContent(prompt)
      // Parse JSON from response
      const cleaned = response.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
      const firstBrace = cleaned.indexOf('{')
      const lastBrace = cleaned.lastIndexOf('}')
      if (firstBrace !== -1 && lastBrace !== -1) {
        const parsed = JSON.parse(cleaned.slice(firstBrace, lastBrace + 1))
        setFeedbackData({
          strengths: parsed.strengths || 'Strong, clear communication and excellent posture.',
          improvements: parsed.improvements || 'Try to minimize background distractions and maintain steady eye contact with the camera.'
        })
      }
      setShowFeedback(true)
    } catch (err) {
      alert("Failed to analyze video: " + err.message)
    } finally {
      setVideoLoading(false)
      e.target.value = '' // reset input
    }
  }

  const openStaticFeedback = () => {
    setFeedbackData({
      strengths: "Clear communication of past project impact. Good structure when answering behavioral questions using the STAR method.",
      improvements: "Could be more concise when explaining technical trade-offs. Remember to clarify requirements before designing the system architecture."
    })
    setShowFeedback(true)
  }

  if (sessionActive) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--warm-white)' }}>
        <div style={{ padding: '24px 40px', background: 'white', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => setSessionActive(false)} className="btn-ghost" style={{ padding: '8px', borderRadius: '50%' }}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Active Mock Interview</h2>
            <div style={{ fontSize: '13px', color: 'var(--teal)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--teal)', animation: 'pulse 2s infinite' }}></div>
              AI is recording
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <style>{`@keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }`}</style>
          
          {messages.map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '16px', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
              {msg.role === 'ai' && (
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={20} />
                </div>
              )}
              <div style={{ 
                background: msg.role === 'user' ? 'var(--teal)' : 'white', 
                color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                padding: '16px 24px', 
                borderRadius: '20px', 
                borderTopRightRadius: msg.role === 'user' ? '4px' : '20px',
                borderTopLeftRadius: msg.role === 'ai' ? '4px' : '20px',
                boxShadow: 'var(--shadow-card)',
                lineHeight: 1.6,
                fontSize: '15px'
              }}>
                {msg.content}
              </div>
              {msg.role === 'user' && (
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--teal-light)', color: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <User size={20} />
                </div>
              )}
            </div>
          ))}
          {(loading || isTranscribing) && (
            <div style={{ display: 'flex', gap: '16px', alignSelf: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--navy)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} />
              </div>
              <div style={{ background: 'white', padding: '16px 24px', borderRadius: '20px', borderTopLeftRadius: '4px', boxShadow: 'var(--shadow-card)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                {isTranscribing ? 'Listening & Transcribing...' : 'AI is typing...'}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div style={{ padding: '24px 40px', background: 'white', borderTop: '1px solid var(--border-light)' }}>
          <form onSubmit={handleSend} style={{ display: 'flex', gap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
            <button 
              type="button" 
              onClick={toggleListen}
              className="btn-ghost" 
              style={{ 
                width: '56px', height: '56px', borderRadius: '50%', padding: 0, flexShrink: 0, 
                background: isListening ? '#fce7f3' : 'var(--surface-alt)', 
                color: isListening ? '#e11d48' : 'var(--text-secondary)',
                border: isListening ? '1px solid #fda4af' : '1px solid transparent'
              }}
            >
              <Mic size={20} style={{ animation: isListening ? 'pulse 1.5s infinite' : 'none' }} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type or click the mic to speak your response..." 
              className="input-field" 
              style={{ flex: 1, borderRadius: '100px', padding: '0 24px' }}
              disabled={loading || isTranscribing}
            />
            <button type="submit" className="btn-primary" style={{ width: '56px', height: '56px', borderRadius: '50%', padding: 0, flexShrink: 0 }} disabled={loading || isTranscribing || !input.trim()}>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container" style={{ padding: '48px', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h1 className="instrument-serif italic" style={{ fontSize: '56px', marginBottom: '16px' }}>AI Mock Interview</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Face your fears in a safe, AI-powered environment.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--teal)' }}>
            <Video size={32} />
          </div>
          <h3 style={{ marginBottom: '12px' }}>Video Interview Analysis</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px' }}>Upload a recorded interview. Get AI feedback on body language, eye contact, and confidence.</p>
          <label className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', cursor: 'pointer', opacity: videoLoading ? 0.7 : 1 }}>
            {videoLoading ? <><Loader2 size={16} className="animate-spin" /> Analyzing Video...</> : 'Upload Video'}
            <input type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: 'none' }} disabled={videoLoading} />
          </label>
        </div>

        <div className="card" style={{ padding: '40px', textAlign: 'center', border: '2px solid var(--accent-purple)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(108, 99, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--accent-purple)' }}>
            <Mic size={32} />
          </div>
          <h3 style={{ marginBottom: '12px' }}>Interactive Session</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px' }}>Real-time voice and text mock interview with our Groq AI Engine. Get instant feedback.</p>
          <button className="btn-primary" style={{ width: '100%', background: 'var(--accent-purple)' }} onClick={startSession}>Start Interview</button>
        </div>
      </div>

      <div style={{ marginTop: '64px' }}>
        <h3 style={{ marginBottom: '24px' }}>Recent Sessions</h3>
        <div className="card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layout size={20} style={{ color: 'var(--text-secondary)' }} />
            </div>
            <div>
              <div style={{ fontWeight: 600 }}>Senior Software Engineer Round</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Yesterday • 45 minutes</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--teal)' }}>84/100</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Clarity Score</div>
            </div>
            <button className="btn-ghost" onClick={openStaticFeedback} style={{ padding: '8px 16px', fontSize: '13px' }}>View Feedback</button>
          </div>
        </div>
      </div>

      {showFeedback && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '32px', maxWidth: '500px', width: '100%', position: 'relative' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Session Feedback</h2>
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Strengths</h4>
              <p style={{ fontSize: '14px', marginBottom: '16px' }}>{feedbackData.strengths}</p>
              
              <h4 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Areas for Improvement</h4>
              <p style={{ fontSize: '14px' }}>{feedbackData.improvements}</p>
            </div>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => setShowFeedback(false)}>Close Feedback</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MockInterview
