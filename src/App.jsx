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
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setNewPost((curPost) => ({
      ...curPost,
      [name]: newValue,
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

          <label htmlFor="PostImage">Immagine del Post</label>
          <input
            type="text"
            placeholder="URL Immagine del Post"
            id="PostImage"
            name="image"
            value={newPost.image}
            onChange={handleInputChange}
          />

          <label htmlFor="PostContent">Contenuto del Post</label>
          <textarea
            rows="3"
            type="text"
            placeholder="Contenuto del Post..."
            id="PostContent"
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
          ></textarea>

          <label htmlFor="Category">Categoria</label>
          <select
            id="Category"
            name="category"
            value={newPost.category}
            onChange={handleInputChange}
          >
            <option value="" selected disabled hidden>Seleziona una categoria</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Scienze">Scienza</option>
            <option value="Cultura">Cultura</option>
            <option value="Sport">Sport</option>
          </select>

          <label htmlFor="PostState">Pubblica il Post</label>
          <input
            type="checkbox"
            id="PostState"
            name="state"
            checked={newPost.state}
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
                <div className="card-image">
                  <img 
                    src={curPost.image ? curPost.image : "https://placehold.co/600x400"}
                    alt="L'immagine del Post" />
                </div>
                <div className="card-heading">
                  <h2>{curPost.title}</h2>
                  <button
                    className="btn remove"
                    onClick={() => { removePost(curPost) }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
                <div className="card-content">
                  <p>{curPost.content}</p>
                  <span>{curPost.state ? "Pubblicato" : "Bozza"}</span>
                </div>
                <div className="card-footer">
                  <span>{curPost.author || "Autore Sconosciuto"}</span>
                  <span>{curPost.category}</span>
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
