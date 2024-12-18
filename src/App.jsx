import { useState } from "react";

const initialPostData = {
  title: "",
  author: "",
  image: "",
  content: "",
  category: "",
  state: false,
}

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(initialPostData);

  const handleNewPostSubmit = (event) => {
    event.preventDefault();

    if (newPost.title.trim() === "" || posts.some((curPost) => curPost.title === newPost.title)) {
      const message = newPost.title.trim() === "" 
        ? "Aggiungi un titolo" 
        : "Titolo già presente";
      return alert(message);
    }

    const postToAdd = {
      ...newPost,
      id: Date.now(),
    };

    setPosts([...posts, postToAdd]);
    setNewPost(initialPostData);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setNewPost((curPost) => ({
      ...curPost,
      [name]: value,
    }));
  };

  const removePost = (postToRemove) => {
    const newArray = posts.filter(curPost => curPost.title !== postToRemove.title);
    setPosts(newArray);
  }

  return (
    <>
      <header>
        <h1>React Form</h1>
      </header>

      <main>
        <form action="" className="container row" onSubmit={handleNewPostSubmit}>
          <label htmlFor="PostName">Titolo del Post</label>
          <input
            type="text"
            placeholder="Titolo del Post"
            id="PostName"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />

          <label htmlFor="AuthorName">Nome dell'Autore</label>
          <input
            type="text" 
            placeholder="Nome dell'Autore"
            id="AuthorName"
            name="author"
            value={newPost.author}
            onChange={handleInputChange}
          />
          
          <button
            type="submit"
            className="btn submit"
          >
            Crea Post
          </button>
        </form>

      {posts.length > 0 ? (
        <ul className="container row">
          {posts.map((curPost) => (
            <li 
              key={curPost.id}
              className="card"
            >
              <div className="uppercard">
                <h2>{curPost.title}</h2>
                <button
                  className="btn remove"
                  onClick={() => {removePost(curPost)}}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
              <div>
                <span>{curPost.author || "Autore Sconosciuto"}</span>
              </div>  
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-list container row">
          La tua lista è vuota! Aggiungi qualche Post!
        </p>
      )}
      </main>
    </>
  )
}

export default App;
