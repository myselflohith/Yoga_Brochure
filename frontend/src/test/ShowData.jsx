import axios from "axios";
import React, { useEffect, useState } from "react";

const ShowData = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/getf/getdata"
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div>{JSON.stringify(data)}</div>;
};

export default ShowData;
