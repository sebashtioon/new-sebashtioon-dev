const BackgroundGrid = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Clean gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/20" />
    </div>
  );
};

export default BackgroundGrid;