import React, { useEffect, useState } from "react";
import axios from "axios";

const GreenwashingNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [ratings, setRatings] = useState({});
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=greenwashing&language=en&apiKey=b43b2cc95b10437cb114cca4dc8e8a63`
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleRating = (articleUrl, rating) => {
    setRatings((prev) => ({
      ...prev,
      [articleUrl]: rating,
    }));
  };

  // Filter Articles
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTag =
      selectedTag === "all" ||
      article.source.name.toLowerCase() === selectedTag;
    return matchesSearch && matchesTag;
  });

  // Sort Articles (Newest or Oldest)
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (!a.publishedAt || !b.publishedAt) return 0;
    return sortOrder === "newest"
      ? new Date(b.publishedAt) - new Date(a.publishedAt)
      : new Date(a.publishedAt) - new Date(b.publishedAt);
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const paginatedArticles = sortedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const uniqueTags = [
    ...new Set(articles.map((article) => article.source.name.toLowerCase())),
  ];

  if (loading)
    return (
      <div className="text-center text-lg font-semibold mt-10">
        Loading news...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Latest Greenwashing News 🌿
      </h2>

      {/* Right-aligned Controls (Search, Filter, Sort) */}
      <div className="flex flex-col items-end space-y-4 mb-6">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-64"
        />

        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="p-2 border rounded-md w-64"
        >
          <option value="all">All Sources</option>
          {uniqueTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {/* Sort Articles */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded-md w-64"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {paginatedArticles.length === 0 ? (
        <p className="text-center text-gray-500">No news articles found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 ">
          {paginatedArticles.map((article, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {article.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Published on:{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Source: {article.source.name}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 font-medium hover:text-green-800 transition-colors"
                  >
                    Read More →
                  </a>
                  <div>
                    <span className="mr-2">Rate:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(article.url, star)}
                        className={
                          ratings[article.url] >= star
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-green-500 text-white rounded-md disabled:bg-gray-400"
          >
            Prev
          </button>
          <span className="p-2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 bg-green-500 text-white rounded-md disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default GreenwashingNews;
