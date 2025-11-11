import React from 'react'
import './index.css'

const sampleArticles = [
  {
    id: 1,
    title: 'How to choose the right medicine for common cold',
    excerpt:
      'A short guide to choosing over-the-counter medicines, precautions and when to see a doctor.',
    author: 'Dr. Sara Ahmed',
    date: 'Nov 5, 2025',
    image: 'https://via.placeholder.com/600x360?text=Medicine'
  },
  {
    id: 2,
    title: '5 Tips for faster recovery after surgery',
    excerpt:
      'Practical post-operative care tips to improve recovery time and avoid complications.',
    author: 'Dr. Omar Hassan',
    date: 'Oct 28, 2025',
    image: 'https://via.placeholder.com/600x360?text=Recovery'
  },
  {
    id: 3,
    title: 'Home nursing: what to expect and how to prepare',
    excerpt:
      'Everything you need to know before hiring a home nurse or preparing a home for care.',
    author: 'Nurse Leila',
    date: 'Sep 14, 2025',
    image: 'https://via.placeholder.com/600x360?text=Nursing'
  },
  {
    id: 4,
    title: 'Managing chronic conditions: a patient checklist',
    excerpt:
      'Daily habits that help manage chronic conditions and improve quality of life.',
    author: 'Dr. Karim Youssef',
    date: 'Aug 30, 2025',
    image: 'https://via.placeholder.com/600x360?text=Chronic+Care'
  }
]

export default function Articles() {
  return (
    <div className="articles-container">
      <div className="articles-header">
        <h1>Articles</h1>
        <div className="articles-count">{sampleArticles.length} articles</div>
      </div>

      <div className="articles-grid">
        {sampleArticles.map((a) => (
          <article key={a.id} className="article-card">
            <img className="article-thumb" src={a.image} alt={a.title} />
            <div className="article-body">
              <div className="article-meta">{a.author} • {a.date}</div>
              <h3 className="article-title">{a.title}</h3>
              <p className="article-excerpt">{a.excerpt}</p>
              <div className="article-actions">
                <a className="read-btn" href="#">Read more</a>
                <div className="article-id" style={{ fontSize: 12, color: '#9ca3af' }}>
                  #{a.id}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
