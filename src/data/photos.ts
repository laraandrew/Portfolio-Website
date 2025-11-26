export interface Photo {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export const portfolioPhotos: Photo[] = [
  {
    id: 'benching',
    src: '/images/portfolio/portfolio-1.jpg',
    alt: 'Outdoor fitness photography',
    caption: 'Strength training in natural light'
  },
  {
    id: 'disney-tower',
    src: '/images/portfolio/portfolio-2.jpg',
    alt: 'Architectural photography',
    caption: 'Disney Tower perspective'
  },
  {
    id: 'portrait-1',
    src: '/images/portfolio/dagurls.JPG',
    alt: 'Portrait photography session',
    caption: 'Natural light portrait'
  },
  {
    id: 'portrait-2',
    src: '/images/portfolio/HR_exp.JPG',
    alt: 'Professional portrait',
    caption: 'Corporate headshot session'
  },
  {
    id: 'portrait-3',
    src: '/images/portfolio/jf_exp.JPG',
    alt: 'Creative portrait shot',
    caption: 'Artistic lighting experiment'
  },
  {
    id: 'portrait-4',
    src: '/images/portfolio/viv.JPG',
    alt: 'Lifestyle portrait',
    caption: 'Candid moment captured'
  },
  {
    id: 'portrait-5',
    src: '/images/portfolio/viv2.JPG',
    alt: 'Portrait series',
    caption: 'Second angle composition'
  }
];

export const personalPhotos: Photo[] = [
  {
    id: 'with-henne',
    src: '/images/personal/personal-1.jpg',
    alt: 'Personal moment with loved ones',
    caption: 'Quality time with Henne'
  },
  {
    id: 'down-the-isle',
    src: '/images/personal/downtheisle.jpg',
    alt: 'Wedding ceremony moment',
    caption: 'Walking down the aisle'
  },
  {
    id: 'family-portrait',
    src: '/images/personal/family_portrait.jpg',
    alt: 'Family portrait session',
    caption: 'Family gathering memories'
  },
  {
    id: 'homiz',
    src: '/images/personal/homiz.JPG',
    alt: 'Casual moment with friends',
    caption: 'Good times with the homies'
  }
];
