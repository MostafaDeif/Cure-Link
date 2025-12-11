import React from 'react'
import "./index.css"
import HealthcareCategorySelector from '../../Components/HealthcareCategorySelector'
import { doctorsData } from '../../Data/doctorsData'
import nursesData from '../../Data/nurseData'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import masrPharmacy from '../../assets/masrPharmacy.png'
import maherPharmacy from '../../assets/maherPharmacy.png'
import DwaPharmacy from '../../assets/DwaPharmacy.png'
import ElezabyPharmacy from '../../assets/ElezabyPharmacy.png'
import KhabiryPharmacy from '../../assets/KhabiryPharmacy.png'

const pharmaciesData = [
  { id: 1, name: 'Misr Pharmacy', image: masrPharmacy, location: 'Cairo', rating: '4.6' },
  { id: 2, name: 'Maher Pharmacy', image: maherPharmacy, location: 'Alexandria', rating: '4.4' },
  { id: 3, name: 'El Khabiry', image: KhabiryPharmacy, location: 'Giza', rating: '4.5' },
  { id: 4, name: 'Dawaa Misr', image: DwaPharmacy, location: 'Tanta', rating: '4.3' },
  { id: 5, name: 'Elezaby', image: ElezabyPharmacy, location: 'Aswan', rating: '4.7' },
]

const PersonCard = ({ name, image, subtitle, meta }) => (
  <div className="person-card" role="group" aria-label={name}>
    <img src={image} alt={name} className="person-thumb " />
    <div className="person-body">
      <div className="person-name">{name}</div>
      <div className="person-sub">{subtitle}</div>
      <div className="person-meta">{meta}</div>
    </div>
  </div>
)

// Swiper will be used instead of the custom AutoSlider

export default function Services() {
  return (
    <div className="services-page">
      <HealthcareCategorySelector />

      <main className="services-main max-width">
        <section className="section">
          <h2 className="section-title">Recommended Doctors</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={3}
            
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {doctorsData.map((d, i) => (
              <SwiperSlide key={i}>
                <PersonCard name={d.name} image={d.imageUrl} subtitle={d.specialty} meta={`${d.rating} • ${d.distance}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="section">
          <h2 className="section-title">Available Nurses</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={3}
            
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {nursesData.slice(0, 8).map((n, i) => (
              <SwiperSlide key={i}>
                <PersonCard name={n.name} image={n.imageUrl} subtitle={n.specialty} meta={`${n.rating} • ${n.distance}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="section">
          <h2 className="section-title">Nearby Pharmacies</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={3}
            
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {pharmaciesData.map((p) => (
              <SwiperSlide key={p.id}>
                <PersonCard name={p.name} image={p.image} subtitle={p.location} meta={`${p.rating} rating`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </main>
    </div>
  )
}
