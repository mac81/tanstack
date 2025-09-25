export const ErrorComponent = ({ error }: { error: string }) => {
  return <div className="mb-4 text-red-500">Error: {error}</div>;
};
