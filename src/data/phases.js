// Fase program sesuai Metode 3P+
export const PHASES = [
  { id: 1, days: [1, 2, 3, 4],               label: 'Pola Pikir',  color: '#1D9E75', desc: 'Fondasi mindset + ruhiyah' },
  { id: 2, days: [5, 6, 7, 8, 9, 10],        label: 'Pola Makan',  color: '#BA7517', desc: 'Pantangan + Walmagh' },
  { id: 3, days: [11, 12, 13, 14],            label: 'Pola Tidur',  color: '#534AB7', desc: 'Kualitas tidur + istiqomah' },
]

export function getPhase(day) {
  return PHASES.find(p => p.days.includes(day)) || PHASES[0]
}
