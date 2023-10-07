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

function App() {
    // useState возвращает массив из 2х объектов, первый это само состояние (posts), второй- функция, которое это состояние изменятет (setPosts)
    const [posts, setPosts] = useState([
        { id: 1, title: "JavaScript", body: "111" },
        { id: 2, title: "Phyton", body: "333" },
        { id: 3, title: "C++", body: "222" },
    ]);

    const [filter, setFilter] = useState({ sort: "", query: "" }); // Состояние для компонента PostFilter

    // useMemo первым парамертом принимает коллбек, а вторым массив зависимостей. Коллбек должен возвращать результат каких-то вычислений,
    // в массив зависимостей можно передавать какие-то переменные, поля объекта итд. useMemo производит вычисления, в данном случае сортируем массив, запоминает результат вычислений
    // и кэширует, на каждую перерисовку компонента она не пересчитывает заново, не сортирует массив вновь, а достает отсартированный массив из кэша, но каждый раз, когда какая-то
    // из зависимостей изменилась, например выбрали другой алгоритм сортировки, то ф-ция вновь пересчитывает и кэширует результат выполнения до тех пор пока опять одна из зависимотей
    // не изменится, если массив зависимостей пустой, то ф-ция отработает один раз, запомнит результат и больше вызвана не будет
    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) =>
                a[filter.sort].localeCompare(b[filter.sort])
            );
        }
        return posts;
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post) =>
            post.title.toLowerCase().includes(filter.query.toLowerCase())
        );
    }, [filter.query, sortedPosts]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    };

    // Получаем пост из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    return (
        <div className='App'>
            <PostForm create={createPost} />
            <hr style={{ margin: "15px 0" }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            {sortedAndSearchedPosts.length !== 0 ? (
                <PostList
                    remove={removePost}
                    posts={sortedAndSearchedPosts}
                    title={"Posts about JS"}
                />
            ) : (
                <h1 style={{ textAlign: "center" }}>No posts found!</h1>
            )}
        </div>
    );
}

export default App;
