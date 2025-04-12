import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DynamicPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/pages/${slug}`)
      .then((res) => setPage(res.data))
      .catch((err) => console.error("Page not found", err));
  }, [slug]);

  if (!page) {
    return (
      <div className="container my-5">
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}

export default DynamicPage;
