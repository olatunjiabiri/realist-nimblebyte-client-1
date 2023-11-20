const AccountActivate = () => {
  const answer = window.confirm("Delete image?");
  return (
    <button
      className="btn btn-primary col-md-6 mt-3 mb-5"
      disabled={loading}
      onClick={() => {
        alert("You Data will go through Verification Process.");
      }}
    ></button>
  );
};

export default AccountActivate;
