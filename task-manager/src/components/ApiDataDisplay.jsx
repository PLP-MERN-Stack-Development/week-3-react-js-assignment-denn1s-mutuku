// src/components/ApiDataDisplay.jsx
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button'; // Using shadcn/ui Button
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'; // Using shadcn/ui Card

function ApiDataDisplay() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs once on mount

  // Filter data based on search term
  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Get current items for the page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  if (loading) {
    return (
      <Card className="p-6 text-center bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardContent>
          <p className="text-lg font-semibold text-blue-500 dark:text-blue-300">Loading API data...</p>
          <div className="mt-4 flex justify-center">
            {/* Simple loading spinner */}
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-center bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 shadow-lg rounded-lg border-red-400">
        <CardHeader>
          <CardTitle className="text-red-700 dark:text-red-100">Error fetching data:</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
          <p className="mt-2 text-sm">Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">API Data Display</h2>

      {/* Search Feature */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search posts by title or body..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
        />
      </div>

      {/* Data List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <Card key={item.id} className="dark:bg-gray-700 dark:border-gray-600">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{item.body}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-4">No results found for "{searchTerm}".</p>
        )}
      </div>

      {/* Pagination Controls */}
      {filteredData.length > itemsPerPage && ( // Only show pagination if there's more than one page
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <span className="text-gray-700 dark:text-gray-300 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default ApiDataDisplay;
