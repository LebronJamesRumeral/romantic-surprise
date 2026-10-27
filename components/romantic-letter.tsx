'use client'

import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Heart, Mail, Music2, RotateCcw, Sparkles, X } from 'lucide-react'
import { useState } from 'react'

// Edit this one object to personalize the surprise.
const LETTER = {
  name: 'Girlfriend',
  sender: 'yours, always',
  date: 'October 26, 2026',
  // Change the letter text here.
  paragraphs: [
    'You’re all i’ve every wanted in this lifetime, you would use your voice in the most gentlest way, i love every word you say to me; the compliments, the love, the care i received, it makes me feel like i’m the only man you loved',
    'It is too soon to talk about the future, how our wedding would happen but it is playing in my head like a movie where it’s only us.',
    'Bottom line, you’re all i want; if it’s not you then nothing is worth it. i’ll try and try my everything so i can make you tell everyone i’m your husband. so now i am glad that you made me your official boyfriend. i will always love you.',
    
  ],
  // Change photo paths here. Empty strings keep the soft placeholder.
  // Public assets use root-relative URLs and exact filename casing (hosting is case-sensitive).
  photos: ['/Photo1.jpg', '/Photo2.jpg', '/Photo3.jpg'],
  // Change the photobooth caption here.
  photoCaption: 'us • 10.26.26',
  music: '',
}

const hearts = [
  { left: '8%', top: '18%', size: 13, delay: 0 }, { left: '86%', top: '14%', size: 10, delay: 1.2 },
  { left: '18%', top: '76%', size: 9, delay: 0.6 }, { left: '78%', top: '72%', size: 14, delay: 1.8 },
  { left: '50%', top: '10%', size: 8, delay: 2.4 },
]

function FloatingHearts() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">{hearts.map((heart, index) => <motion.div key={index} className="absolute text-[#8065a8]/35" style={{ left: heart.left, top: heart.top }} animate={{ y: [0, -12, 0], rotate: [-8, 8, -8], opacity: [0.35, 0.7, 0.35] }} transition={{ duration: 4 + index * 0.4, delay: heart.delay, repeat: Infinity, ease: 'easeInOut' }}><Heart fill="currentColor" size={heart.size} /></motion.div>)}</div>
}

function PhotoStrip({ onSelect, reducedMotion }: { onSelect: (photo: string) => void; reducedMotion: boolean }) {
  // Changed: this is an in-flow strip with separately tappable photo frames.
  return <motion.div role="group" aria-label="Photobooth strip" className="photo-strip" initial={reducedMotion ? false : { opacity: 0, y: -32, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: 2.5 }} transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 12, delay: 0.25 }} whileTap={reducedMotion ? undefined : { scale: 1.04 }}>
    <span aria-hidden="true" className="photo-tape"><Heart fill="currentColor" size={13} /></span>
    <span className="photo-strip-frames">{LETTER.photos.map((photo, index) => <button type="button" className="photo-slot" key={index} aria-label={`View memory ${index + 1}`} onClick={() => onSelect(photo)}>{photo ? <Image src={photo} alt="" fill sizes="(max-width: 640px) 62px, 104px" className="object-cover grayscale-[15%]" /> : <span className="flex h-full flex-col items-center justify-center gap-1 bg-[#eee7f6] text-[#8065a8]"><Heart fill="currentColor" size={18} strokeWidth={1.2} /><span className="font-sans text-[7px] uppercase tracking-[0.12em]">photo {index + 1}</span></span>}</button>)}</span>
    <span className="photo-caption">{LETTER.photoCaption}</span>
  </motion.div>
}

function Envelope({ onOpen, reduced }: { onOpen: () => void; reduced: boolean }) {
  return <motion.button type="button" aria-label="Open your letter" onClick={onOpen} className="group relative flex min-h-[48px] flex-col items-center outline-none" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}><motion.div className="relative h-[174px] w-[260px] rounded-[6px] bg-[#b49acb] shadow-[0_22px_45px_rgba(89,65,112,0.22)]" animate={reduced ? undefined : { y: [0, -5, 0] }} transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}><div className="absolute inset-0 overflow-hidden rounded-[6px]"><div className="absolute inset-0 bg-gradient-to-br from-[#d7c3e8]/80 to-[#9f82bd]" /><div className="absolute bottom-0 left-0 border-b-[88px] border-l-[130px] border-r-[130px] border-b-[#8d70aa] border-l-transparent border-r-transparent" /><div className="absolute bottom-0 left-0 border-b-[88px] border-l-[130px] border-r-[130px] border-b-[#b49acb] border-l-transparent border-r-transparent opacity-70" /></div><motion.div className="absolute left-0 top-0 z-10 h-[108px] w-full origin-top border-l-[130px] border-r-[130px] border-t-[100px] border-l-transparent border-r-transparent border-t-[#c6addd] drop-shadow-sm" whileTap={{ rotateX: 32 }} /><div className="absolute left-1/2 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#78579c] text-[#f7f1fc] shadow-[0_4px_10px_rgba(75,52,102,0.22)] transition-transform group-hover:scale-105"><Heart fill="currentColor" size={22} /></div></motion.div><span className="mt-7 flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-[#745c88]">Tap to open <Mail size={13} /></span></motion.button>
}

function Letter({ onClose, onSelect, reducedMotion }: { onClose: () => void; onSelect: (photo: string) => void; reducedMotion: boolean }) {
  const [favorite, setFavorite] = useState(false)
  // Changed: removed card clipping and moved the strip into the content flow.
  return <motion.article className="letter-paper relative mx-auto w-full max-w-[680px] rounded-[3px] px-6 py-8 sm:px-12 sm:py-12" initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
    <button type="button" aria-label="Send floating hearts" onClick={() => setFavorite(!favorite)} className="absolute right-4 top-4 z-20 flex min-h-[48px] min-w-[48px] items-center justify-center text-[#8d72ad]/45 transition-transform hover:scale-110"><Heart fill={favorite ? 'currentColor' : 'none'} size={34} strokeWidth={1.5} /></button>
    <AnimatePresence>{favorite && <div aria-hidden="true" className="pointer-events-none absolute right-7 top-3 z-30">{[0, 1, 2].map((item) => <motion.div key={item} className="absolute text-[#8065a8]" initial={{ opacity: 0, y: 10, x: item * 8 - 8 }} animate={{ opacity: [0, 1, 0], y: -55 - item * 12, x: item * 18 - 16 }} transition={{ duration: 1.2, delay: item * .12 }}><Heart fill="currentColor" size={12} /></motion.div>)}</div>}</AnimatePresence>
    <div className="letter-content relative mx-auto w-full max-w-[530px]">
      <PhotoStrip onSelect={onSelect} reducedMotion={reducedMotion} />
      <div className="letter-date-divider mb-8 flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.24em] text-[#8b75a1]"><span className="h-px flex-1 bg-[#c8b7d8]" /><span>{LETTER.date}</span><span className="h-px flex-1 bg-[#c8b7d8]" /></div>
      <p className="letter-serif mb-5 text-[24px] leading-tight text-[#49365f] sm:text-[28px]">My dearest {LETTER.name},</p>
      <div className="space-y-5 text-[17px] leading-[1.75] text-[#635271]">{LETTER.paragraphs.map((paragraph, index) => <motion.p key={paragraph} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.2, duration: 0.7 }}>{paragraph}</motion.p>)}</div>
      <div className="letter-signature mt-10 text-right"><motion.p className="letter-serif text-[23px] italic text-[#49365f]" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .9 }}> {LETTER.sender}</motion.p><Heart className="ml-auto mt-2 text-[#8065a8]" fill="currentColor" size={18} /></div>
      <button type="button" onClick={onClose} className="mx-auto mt-10 flex min-h-[48px] items-center gap-2 rounded-full border border-[#c6b5d8] px-5 font-sans text-xs uppercase tracking-[0.14em] text-[#745c88] transition-colors hover:bg-[#eee7f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78579c]"><RotateCcw size={14} /> Read again</button>
    </div>
  </motion.article>
}

export function RomanticLetter() {
  const [opened, setOpened] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const reduced = useReducedMotion()
  return <main className="romantic-page relative flex min-h-[100dvh] items-center justify-center overflow-x-clip px-4 py-8 sm:px-8"><FloatingHearts /><div className="relative z-10 w-full"><AnimatePresence mode="wait">{!opened ? <motion.section key="intro" className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center" exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.45 }}><p className="mb-8 font-sans text-[10px] uppercase tracking-[0.34em] text-[#8b75a1]">A little something for you</p><Envelope onOpen={() => setOpened(true)} reduced={!!reduced} /><p className="mt-12 max-w-[250px] text-center font-sans text-xs leading-relaxed text-[#786b85]">Some things are too special to say out loud.</p></motion.section> : <motion.section key="letter" className="flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Letter onClose={() => setOpened(false)} onSelect={setSelectedPhoto} reducedMotion={!!reduced} /><div className="mt-5 flex min-h-[48px] items-center">{LETTER.music && <button type="button" onClick={() => setMusicOn(!musicOn)} className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.15em] text-[#745c88]"><Music2 size={15} /> {musicOn ? 'Pause music' : 'Play music'}<audio src={LETTER.music} autoPlay={musicOn} loop /></button>}</div></motion.section>}</AnimatePresence></div><AnimatePresence>{selectedPhoto !== null && <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-[#352747]/55 p-6" role="dialog" aria-modal="true" aria-label="Photo preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedPhoto(null)}><button type="button" aria-label="Close photo preview" className="absolute right-5 top-5 flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-[#fdfaff] text-[#49365f]" onClick={() => setSelectedPhoto(null)}><X size={20} /></button>{selectedPhoto ? <Image src={selectedPhoto} alt="Enlarged favorite memory" width={520} height={520} className="max-h-[80vh] w-auto rounded-sm object-contain shadow-2xl" /> : <div className="flex h-64 w-64 flex-col items-center justify-center gap-3 rounded-sm bg-[#eee7f6] text-[#8065a8]"><Heart fill="currentColor" size={48} /><span className="font-sans text-xs uppercase tracking-[0.18em]">Add a photo above</span></div>}</motion.div>}</AnimatePresence></main>
}
