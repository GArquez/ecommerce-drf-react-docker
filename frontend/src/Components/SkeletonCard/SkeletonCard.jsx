// Components/Skeleton/SkeletonCard.jsx
import './SkeletonCard.css'

export const SkeletonCard = () => {
    return (
        <div className="card skeleton-card" style={{"width": "18rem"}}>
            <div className="skeleton-img"></div>
            <div className="card-body">
                <div className="skeleton-text title"></div>
                <div className="skeleton-text brand"></div>
            </div>
            <div className="card-body">
                <div className="skeleton-text description"></div>
                <div className="skeleton-button"></div>
            </div>
        </div>
    )
}