import { useParams } from "react-router-dom";

const BlogDeatil = () => {
  const { id } = useParams();
  return (
    <div>BlogDeatil {id}</div>
  )
}

export default BlogDeatil