import React, { useEffect, useState } from "react";

function Fetch() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch()
      .then((resp) => resp.json())
      .then((apiData) => {
        setData(apiData.message);
      });
  }, []);
  return (
   <div></div>
  );
}

export default Fetch;