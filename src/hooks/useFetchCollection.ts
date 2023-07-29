import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../lib/firebase";

const useFetchCollection = (collectionName: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCollection = () => {
      setLoading(true);
      try {
        const docRef = collection(database, collectionName);
        const docQuery = query(docRef, orderBy("date", "desc"));
        onSnapshot(docQuery, (snapshot) => {
          let allData: any = [];
          snapshot.docs.forEach((doc) => {
            allData.push({ id: doc.id, ...doc.data() });
          });
          setData(allData);
          setLoading(false);
        });
      } catch (error) {
        console.log({ error });

        setLoading(false);
      }
    };

    getCollection();
  }, [collectionName]);

  return { data, loading };
};

export default useFetchCollection;
