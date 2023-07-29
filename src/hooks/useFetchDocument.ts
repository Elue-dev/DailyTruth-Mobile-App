import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { useAlert } from "../context/alert/AlertContext";

export default function useFetchDocuments(
  collectionName: string,
  documentID: string
) {
  const [document, setDocument] = useState(null);
  const { showAlertAndContent } = useAlert();

  useEffect(() => {
    const getDocument = async () => {
      const docRef = doc(database, collectionName, documentID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data: any = { id: documentID, ...docSnap.data() };
        setDocument(data);
      } else {
        showAlertAndContent({
          type: "error",
          message: "Something went wrong. Please try again later",
        });
      }
    };
    getDocument();
  }, [collectionName, documentID]);

  return { document };
}
