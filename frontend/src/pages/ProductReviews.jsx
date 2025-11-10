import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { reviewsAPI } from '../services/api';
import { toast } from 'react-toastify';
import './ProductReviews.css';

const ProductReviews = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      loadReviews();
    } else {
      setLoading(false);
    }
  }, [id]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewsAPI.getProductReviews(id);
      setReviews(response.data || []);
    } catch (error) {
      console.error('Chyba pri načítaní recenzií:', error);
      setReviews([]);
      toast.error('Chyba pri načítaní recenzií');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Musíte byť prihlásení pre hodnotenie');
      return;
    }

    setSubmitting(true);
    try {
      await reviewsAPI.create({ productId: id, rating, comment });
      toast.success('Recenzia bola pridaná');
      setComment('');
      setRating(5);
      loadReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Chyba pri pridávaní recenzie');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading) {
    return <div className="loading">Načítavam recenzie...</div>;
  }

  return (
    <div className="reviews-page">
      <h2>Recenzie</h2>

      {user && (
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label>Hodnotenie:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${rating >= star ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Komentár:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              placeholder="Napíšte svoju recenziu..."
            />
          </div>
          <button type="submit" disabled={submitting} className="btn-submit">
            {submitting ? 'Odosielam...' : 'Pridať recenziu'}
          </button>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">Zatiaľ nie sú žiadne recenzie</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              <div className="review-header">
                <div>
                  <strong>{review.user?.name || 'Anonymný'}</strong>
                  <div className="review-stars">{renderStars(review.rating)}</div>
                </div>
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString('sk-SK')}
                </span>
              </div>
              {review.comment && <p className="review-comment">{review.comment}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;

