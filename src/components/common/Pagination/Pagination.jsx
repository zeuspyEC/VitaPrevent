import PropTypes from 'prop-types'
import './Pagination.css'

export default function Pagination({ page, totalPages, onPrev, onNext, onPage, loading }) {
  const pages = buildPages(page, totalPages)

  return (
    <nav aria-label="Paginación" className="pagination">
      <button
        onClick={onPrev}
        disabled={page <= 1 || loading}
        aria-label="Página anterior"
        className="pagination__btn pagination__btn--nav"
      >
        ‹
      </button>

      <ul className="pagination__list" role="list">
        {pages.map((p, i) =>
          p === '…' ? (
            <li key={`ellipsis-${i}`} className="pagination__ellipsis" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                onClick={() => onPage?.(p)}
                disabled={loading}
                aria-label={`Página ${p}`}
                aria-current={p === page ? 'page' : undefined}
                className={`pagination__btn ${p === page ? 'pagination__btn--active' : ''}`}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        onClick={onNext}
        disabled={page >= totalPages || loading}
        aria-label="Página siguiente"
        className="pagination__btn pagination__btn--nav"
      >
        ›
      </button>
    </nav>
  )
}

function buildPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '…', total]
  if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '…', current - 1, current, current + 1, '…', total]
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPage: PropTypes.func,
  loading: PropTypes.bool,
}
