import type {Roommate} from '../screens/types/Roomate';

export const roommates: Roommate[] = [
  {
    id: '1',
    name: 'Raka',
    age: 25,
    occupation: 'Software Engineer',
    location: 'Sudirman, Jakarta',
    budget: '2 - 3 juta',
    compatibilityScore: 92,
    lifestyleTags: ['Rapi', 'Tidak merokok', 'Tidur normal'],
    description:
      'Mencari roommate yang sama-sama kerja kantoran, suka lingkungan tenang, dan bisa saling jaga privasi.',
  },
  {
    id: '2',
    name: 'Dimas',
    age: 24,
    occupation: 'UI/UX Designer',
    location: 'BSD, Tangerang',
    budget: '1 - 2 juta',
    compatibilityScore: 86,
    lifestyleTags: ['Santai', 'Dekat transportasi', 'Jarang tamu'],
    description:
      'Lebih suka tempat tinggal yang nyaman buat istirahat setelah kerja. Terbuka untuk sharing biaya internet dan kebersihan.',
  },
  {
    id: '3',
    name: 'Fajar',
    age: 27,
    occupation: 'Data Analyst',
    location: 'Depok',
    budget: 'Di bawah 1 juta',
    compatibilityScore: 79,
    lifestyleTags: ['Cukup rapi', 'Tidak masalah pet', 'Pagi'],
    description:
      'Sedang cari teman tinggal untuk area dekat transportasi umum. Lebih suka komunikasi jelas dari awal.',
  },
];