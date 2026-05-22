import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../store/authStore";
import API_BASE_URL from "../config/api";
import { toast } from "react-hot-toast";

import {
  pageBackground,
  pageWrapper,
  articlePageTitle,
  articlePageCategory,
  articlePageMeta,
  articlePageContent,
  articlePageAuthor,
  articlePageTimestamp,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  bodyText,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentuser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);

      try {
        // Try with auth first, fallback to public
        const res = await axios.get(`${API_BASE_URL}/user-api/article/${id}`, { 
          withCredentials: true 
        }).catch(() => 
          // Fallback to public endpoint if auth fails
          axios.get(`${API_BASE_URL}/user-api/article/${id}`)
        );

        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || "Error loading article");
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id, article]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // delete article
  const deleteArticle = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/author-api/article/${id}`, { withCredentials: true });

      navigate("/author-profile");
    } catch (err) {
      setError(err.response?.data?.error);
    }
  };

  const editArticle = (articleObj) => {
    navigate(`/edit-article/${articleObj._id}`, { state: articleObj });
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please log in to add a comment");
      navigate("/login");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setSubmittingComment(true);
    try {
      const res = await axios.put(
        `${API_BASE_URL}/user-api/article/${id}/comment`,
        { comment: newComment },
        { withCredentials: true }
      );

      setArticle(res.data.payload);
      setNewComment("");
      toast.success("Comment added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className={pageBackground}>
      <div className={pageWrapper}>
        {/* Back button */}
        <button 
          onClick={() => navigate("/articles")}
          className={`${bodyText} text-[#c0392b] hover:text-[#922b21] mb-8 flex items-center gap-2 transition-colors`}
        >
          ← Back to Articles
        </button>

        {/* Article Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={articlePageCategory}>{article.category}</span>
            {article.status && (
              <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 bg-[#ede8df] text-[#7a6f68] rounded-sm">
                {article.status}
              </span>
            )}
          </div>
          <h1 className={`${articlePageTitle} mb-6`}>{article.title}</h1>
          
          {/* Article Meta */}
          <div className={`${articlePageMeta} flex flex-wrap items-center gap-6 pb-6 border-b border-[#ddd7ce]`}>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#1a1410]">By </span>
              <span className={articlePageAuthor}>
                {article.author?.firstName} {article.author?.lastName}
              </span>
            </div>
            <span className="text-[#7a6f68]">•</span>
            <span className={articlePageTimestamp}>
              {formatDate(article.createdAt)}
            </span>
            {article.updatedAt && article.updatedAt !== article.createdAt && (
              <>
                <span className="text-[#7a6f68]">•</span>
                <span className="text-sm text-[#7a6f68] italic">
                  Updated {formatDate(article.updatedAt)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className={`${articlePageContent} mb-12 prose prose-sm max-w-none`}>
          {article.content}
        </div>

        {/* Author Actions */}
        {user?.role === "AUTHOR" && user?._id === article.author?._id && (
          <div className="flex gap-3 pt-8 border-t border-[#ddd7ce]">
            <button 
              className={editBtn} 
              onClick={() => editArticle(article)}
            >
              Edit Article
            </button>
            <button 
              className={deleteBtn}
              onClick={deleteArticle}
            >
              Delete Article
            </button>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-16 pt-8 border-t border-[#ddd7ce]">
          <h2 className="text-2xl font-bold text-[#1a1410] mb-8">Comments ({article.comments?.length || 0})</h2>

          {/* Add Comment Form */}
          {isAuthenticated ? (
            <form onSubmit={handleAddComment} className="mb-12 p-6 bg-[#f5f1eb] rounded-lg">
              <h3 className="text-lg font-semibold text-[#1a1410] mb-4">Add Your Comment</h3>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts on this article..."
                className="w-full p-3 border border-[#ddd7ce] rounded-lg font-serif text-[#1a1410] placeholder-[#7a6f68] focus:outline-none focus:ring-2 focus:ring-[#c0392b] resize-none"
                rows="4"
                disabled={submittingComment}
              />
              <button
                type="submit"
                disabled={submittingComment || !newComment.trim()}
                className="mt-4 px-6 py-2 bg-[#c0392b] text-white rounded-lg hover:bg-[#922b21] disabled:bg-gray-400 transition-colors font-semibold"
              >
                {submittingComment ? "Posting..." : "Post Comment"}
              </button>
            </form>
          ) : (
            <div className="mb-12 p-6 bg-[#f5f1eb] rounded-lg text-center">
              <p className={`${bodyText} mb-4`}>Please log in to add a comment</p>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-2 bg-[#c0392b] text-white rounded-lg hover:bg-[#922b21] transition-colors font-semibold"
              >
                Log In
              </button>
            </div>
          )}

          {/* Comments List */}
          {article.comments && article.comments.length > 0 ? (
            <div className="space-y-6">
              {article.comments.map((comment, idx) => (
                <div key={idx} className="p-6 bg-[#ede8df] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-[#1a1410]">
                      {comment.user?.firstName} {comment.user?.lastName}
                    </span>
                  </div>
                  <p className={`${bodyText} text-[#3a3530]`}>{comment.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className={`${bodyText} text-[#7a6f68] text-center py-8`}>
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleByID;