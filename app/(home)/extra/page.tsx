const ExtraPage = () => {
  return (
    <>
      <h3>Extra Page</h3>
      <p>
        This page is protected by the middleware. No code in the page itself.
        the protection relies on the middleware, the AuthProvider, and the
        layout.
      </p>
    </>
  );
};

export default ExtraPage;
