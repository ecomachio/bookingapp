const ListingEmptyState = () => {
  return (
    <div className="w-full flex items-center flex-wrap justify-center gap-10 mt-6">
      <div className="grid gap-4 w-60">
        <div>
          <h2 className="text-center text-black dark:text-white text-xl font-semibold leading-loose pb-2">
            There’s nothing here
          </h2>
          <p className="text-center text-black dark:text-white text-base font-normal leading-relaxed pb-4">
            Try changing your filters to <br />
            see our options
          </p>
        </div>
      </div>
    </div>
  );
};
export default ListingEmptyState;
