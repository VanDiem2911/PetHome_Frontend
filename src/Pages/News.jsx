import { useState, useEffect } from 'react'
import { fetchNews } from '../utils/api'
import { useLanguage } from '../context/LanguageContext'

const News = () => {
  const { lang } = useLanguage()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeArticle, setActiveArticle] = useState(null)

  useEffect(() => {
    const loadNews = async () => {
      try {
        setList(await fetchNews())
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadNews()
  }, [])

  return (
    <div className="container-site py-12">
      
      {/* Header Section */}
      <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
        <h2 className="font-heading font-bold text-brown-dark text-2xl sm:text-3xl tracking-tight">
          {lang === 'vi' ? 'Tin Tức & Cẩm Nang Thú Cưng' : 'Pet Care News & Advice'}
        </h2>
        <p className="text-[#555555] text-xs sm:text-sm leading-relaxed">
          {lang === 'vi' 
            ? 'Tổng hợp các bài chia sẻ kinh nghiệm chăm sóc, huấn luyện và dinh dưỡng tốt nhất dành cho chó mèo cưng của bạn.' 
            : 'Collect the best sharing of experience in caring, training and nutrition for your beloved dogs and cats.'}
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-xs text-muted mt-2">Đang tải bài viết...</p>
        </div>
      ) : list.length === 0 ? (
        <div className="py-20 text-center text-muted">
          <span className="text-5xl">📰</span>
          <p className="text-sm font-bold mt-4">Chưa có tin tức nào</p>
          <p className="text-xs mt-1">Hãy quay lại sau nhé!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {list.map(article => (
            <div
              key={article.id}
              className="group bg-white border border-[#eeeeee] rounded-card overflow-hidden hover:shadow-mid transition-all duration-280 hover:-translate-y-1 flex flex-col"
            >
              {/* Image Container */}
              <div className="aspect-[16/10] bg-[#f8f9fa] relative overflow-hidden select-none">
                {article.imageUrl ? (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-280"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">📰</div>
                )}
                <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded-sm">
                  {article.createdAt ? new Date(article.createdAt).toLocaleDateString('vi-VN') : ''}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-heading font-bold text-brown-dark text-sm sm:text-base leading-snug line-clamp-2 hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-text-light line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-border-light flex justify-between items-center text-[11px] text-muted">
                  <span>Tác giả: {article.author || 'Spa Staff'}</span>
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="font-bold text-primary hover:underline outline-none"
                  >
                    Đọc thêm &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Article Detail */}
      {activeArticle && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className="bg-white border border-border-light rounded-card p-6 sm:p-8 w-full max-w-2xl max-h-[85vh] overflow-y-auto relative shadow-high animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 text-muted hover:text-brown-dark"
              aria-label="Đóng"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Content detail */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex gap-4 items-center text-xs text-muted">
                  <span>Tác giả: {activeArticle.author}</span>
                  <span>·</span>
                  <span>{activeArticle.createdAt ? new Date(activeArticle.createdAt).toLocaleString('vi-VN') : ''}</span>
                </div>
                <h1 className="font-heading font-bold text-brown-dark text-xl sm:text-2xl leading-snug">
                  {activeArticle.title}
                </h1>
              </div>

              {activeArticle.imageUrl && (
                <div className="aspect-[16/9] w-full rounded-card overflow-hidden bg-bg-light">
                  <img
                    src={activeArticle.imageUrl}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="text-xs text-[#555555] font-semibold leading-relaxed border-l-4 border-primary pl-4 bg-bg-light py-2">
                {activeArticle.summary}
              </p>

              <div className="text-xs sm:text-sm text-brown-dark/95 leading-relaxed space-y-4 whitespace-pre-line">
                {activeArticle.content}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-border-light flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2 border border-border-light hover:bg-bg-light text-brown-dark text-xs font-semibold rounded-pill transition-colors"
              >
                Đóng bài viết
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default News
