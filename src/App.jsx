import React, { useMemo, useRef, useState } from "react";
import Counter from "./components/counter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/myModal/MyModal";
import { usePosts } from "./hooks/usePosts";

function App() {
    // useState возвращает массив из 2х объектов, первый это само состояние (posts), второй- функция, которое это состояние изменятет (setPosts)
    const [posts, setPosts] = useState([
        { id: 1, title: "JavaScript", body: "111" },
        { id: 2, title: "Phyton", body: "333" },
        { id: 3, title: "C++", body: "222" },
    ]);

    const [modal, setModal] = useState(false); // Состояния для модального окна, отвечающиего за его видимость
    const [filter, setFilter] = useState({ sort: "", query: "" }); // Состояние для компонента PostFilter
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    // Получаем пост из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    return (
        <div className='App'>
            <MyButton style={{ marginTop: 15 }} onClick={() => setModal(true)}>
                Create Post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: "15px 0" }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title={"Posts about JS"}
            />
        </div>
    );
}

export default App;
