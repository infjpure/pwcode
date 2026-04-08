const loading = () => {
  return (
    <div className="flex items-center justify-center flex-grow">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-zinc-500 animate-spin" />
        <p className="mt-4 text-gray-600 dark:text-gray-300">Đang tải...</p>
      </div>
    </div>
  );
};

export default loading;
