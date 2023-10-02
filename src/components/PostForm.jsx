import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

const PostForm = ({ create }) => {
    const [post, setPost] = useState({ title: "", body: "" });

    const addNewPost = (e) => {
        e.preventDefault(); //Предотвращаем дефолтное поведение браузера (обновление страницы и отправка формы на сервер)
        // setPosts([...posts, { ...post, id: Date.now() }]);
        const newPost = {
            ...post,
            id: Date.now(),
        };
        create(newPost);
        setPost({ title: "", body: "" });
        // console.log(bodyInputRef.current.value); Выводим в лог значение из инпута (current - это и есть дом-элемент)
    };

    return (
        <form>
            {/* Управляемый компонент */}
            <MyInput
                type='text'
                placeholder='Post title'
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            {/* Неуправляемый компонент */}
            {/* С помощью хука useRef можно напрямую получать доступ к дом-элементу */}
            <MyInput
                value={post.body}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
                type='text'
                placeholder='Post description'
                // ref={bodyInputRef} Передаем созданную с помощью useRef ссылку
            />
            <MyButton onClick={addNewPost}>Create Post</MyButton>
        </form>
    );
};

export default PostForm;
