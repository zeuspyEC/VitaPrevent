import PropTypes from 'prop-types'
import './StatisticCard.css'

export default function StatisticCard({ value, label, icon, color = 'blue', description }) {
  return (
    <div className={`stat-card stat-card--${color}`} role="figure" aria-label={`${label}: ${value}`}>
      {icon && (
        <span className="stat-card__icon" aria-hidden="true">{icon}</span>
      )}
      <div className="stat-card__body">
        <span className="stat-card__value">{value}</span>
        <span className="stat-card__label">{label}</span>
        {description && (
          <span className="stat-card__desc">{description}</span>
        )}
      </div>
    </div>
  )
}

StatisticCard.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'green', 'purple', 'orange', 'cyan']),
  description: PropTypes.string,
}
