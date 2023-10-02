import React, { useRef, useState } from "react";
import Counter from "./components/counter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {
    // useState возвращает массив из 2х объектов, первый это само состояние (posts), второй- функция, которое это состояние изменятет (setPosts)
    const [posts, setPosts] = useState([
        { id: 1, title: "JavaScript", body: "111" },
        { id: 2, title: "Phyton", body: "333" },
        { id: 3, title: "C++", body: "222" },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSort, setSelectedSort] = useState("");

    // const [post, setPost] = useState({ title: "", body: "" });

    // const bodyInputRef = useRef(); Используем хук useRef, чтобы получить данные из неуправляемого инпута, получая доступ к дом-элементу, useRef создает сслыку

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    // Получаем пост из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort]))); // Ф-ция sort не возвращает новый отсартированный массив, а мутирует старый, состояние напрямую изменять нельзя
        // поэтому разварачиваем посты в новый массив и сортируем его (мутируем копию массива и не мутируем состояние напрямую), sort принимаем коллбек, который аргументами принимает 2
        // элемента массива, берем поле, которое выбрал пользователь (title или body), и сравнимаем поле из объекта а с полем из объекта b
    };

    return (
        <div className='App'>
            <PostForm create={createPost} />
            <hr style={{ margin: "15px 0" }} />
            <div>
                <MyInput
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <MySelect
                    value={selectedSort}
                    onChange={sortPosts}
                    defaultValue='Sort By'
                    options={[
                        { value: "title", name: "By Name" },
                        { value: "body", name: "By Description" },
                    ]}
                />
            </div>
            {posts.length !== 0 ? (
                <PostList
                    remove={removePost}
                    posts={posts}
                    title={"Posts about JS"}
                />
            ) : (
                <h1 style={{ textAlign: "center" }}>No posts found!</h1>
            )}
        </div>
    );
}

export default App;
