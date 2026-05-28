export type LocationBadge = 'pet-friendly'

export interface Location {
  id: string
  name: string
  address: string
  hours: {
    weekdays: string
    weekends: string
    extra?: string
  }
  mapIframe: string
  mapLink: string
  whatsapp: string
  whatsappMessage: string
  badges?: LocationBadge[]
  isStore?: boolean
  instagram?: string
  note?: string
}

export const locations: Location[] = [
  {
    id: 'barrio-norte',
    name: 'Sucursal Barrio Norte',
    address: 'Santa Fé 298, San Miguel de Tucumán',
    hours: {
      weekdays: 'Lun–Vie 7:30–21:30',
      weekends: 'Sáb, Dom y Feriados 8:30–21:30',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.8207931,-65.1988893&z=19&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJ4-NDWnxdIpQRRRDIHQHhJIQ',
    whatsapp: '5493816281499',
    whatsappMessage: 'Hola! 😊',
  },
  {
    id: 'barrio-sur',
    name: 'Sucursal Barrio Sur',
    address: 'Pje. 2 de Abril 398, San Miguel de Tucumán',
    hours: {
      weekdays: 'Lun–Vie 7:00–21:30',
      weekends: 'Sáb, Dom y Feriados 8:30–21:30',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.8364531,-65.2050872&z=19&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJsSe6HwBdIpQR20aPBpD3ZrY',
    whatsapp: '5493816281499',
    whatsappMessage: 'Hola! 😊',
  },
  {
    id: 'microcentro',
    name: 'Sucursal Microcentro',
    address: 'Bernardino Rivadavia 120, San Miguel de Tucumán',
    hours: {
      weekdays: 'Lun–Vie 7:30–21:30',
      weekends: 'Sáb, Dom y Feriados 8:30–21:30',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.8297094,-65.2013881&z=19&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJBfFcaT1dIpQRWVd4xAXKPfU',
    whatsapp: '5493816281499',
    whatsappMessage: 'Hola! 😊',
  },
  {
    id: 'yerba-buena',
    name: 'Sucursal Yerba Buena',
    address: 'Güemes 151, Yerba Buena, Tucumán',
    hours: {
      weekdays: 'Lun–Vie 7:30–21:30',
      weekends: 'Sáb, Dom y Feriados 8:30–21:30',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.815399,-65.2908552&z=19&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJEYzem0FDIpQRKBm922nMQBo',
    whatsapp: '5493816281499',
    whatsappMessage: 'Hola! 😊',
  },
  {
    id: 'praderas',
    name: 'Sucursal Praderas',
    address: '6P28+G5, Yerba Buena (Complejo Docks)',
    hours: {
      weekdays: 'Viernes 7:30–21:30',
      weekends: 'Horario completo pendiente de confirmar',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.798724,-65.2846234&z=19&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJURvKTABdIpQRSprQrLGZNpw',
    whatsapp: '5493816281509',
    whatsappMessage: 'Hola! 😊',
    badges: ['pet-friendly'],
    note: 'Pet Café — ¡Las mascotas son bienvenidas!',
  },
  {
    id: 'portal-shopping',
    name: 'Sucursal Portal Shopping',
    address: 'Av. Fermín Cariola 82, San Miguel de Tucumán',
    hours: {
      weekdays: 'Lun–Vie 7:30–21:30',
      weekends: 'Sáb, Dom y Feriados 8:30–21:30',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.8222629,-65.2670409&z=19&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJfy8bLQBdIpQRVY89w48EveM',
    whatsapp: '5493816281499',
    whatsappMessage: 'Hola! 😊',
  },
  {
    id: 'la-tienda',
    name: 'La Tienda de Benito',
    address: 'Santa Fe 440, San Miguel de Tucumán',
    hours: {
      weekdays: 'Todos los días 8:00–21:00',
      weekends: 'Todos los días 8:00–21:00',
    },
    mapIframe: 'https://maps.google.com/maps?q=-26.8204072,-65.2012402&z=19&output=embed',
    mapLink: 'https://www.google.com/maps/place/?q=place_id:ChIJ-0YIKQBdIpQRiLxmCl0YgJA',
    whatsapp: '5493816281499',
    whatsappMessage: 'Hola! 😊',
    isStore: true,
    instagram: 'https://instagram.com/benitolatienda',
    note: 'Tienda especializada en café de origen, productos artesanales y accesorios.',
  },
]

export const social = {
  instagram: 'https://instagram.com/benitosantoscafe',
  instagramHandle: '@benitosantoscafe',
  instagramTienda: 'https://instagram.com/benitolatienda',
  instagramTiendaHandle: '@benitolatienda',
  whatsappDefault: '5493816281499',
  whatsappDefaultLink: 'https://wa.me/5493816281499?text=Hola!%20%F0%9F%98%8A',
  linktree: 'https://linktr.ee/benitosantoscafe',
}

export const globalHours = {
  weekdays: 'Lun–Vie 7:30–21:30',
  weekends: 'Sáb, Dom y Feriados 8:30–21:30',
}
