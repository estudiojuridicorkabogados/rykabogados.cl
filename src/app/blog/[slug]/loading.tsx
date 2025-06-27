// @TODO Improve loading state for blog pages
export default function BlogPostPageLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="ml-4 text-gray-700">Cargando...</p>
    </div>
  );
}
