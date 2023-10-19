import React, { useEffect, useRef, useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import PostList from "../components/PostList";
import Loader from "../components/UI/loader/Loader";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import MyModal from "../components/UI/myModal/MyModal";
import PostService from "../API/PostService";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Pagination from "../components/UI/pagination/Pagination";
import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    // useState возвращает массив из 2х объектов, первый это само состояние (posts), второй- функция, которое это состояние изменятет (setPosts)
    const [posts, setPosts] = useState([]);

    const [modal, setModal] = useState(false); // Состояния для модального окна, отвечающиего за его видимость
    const [filter, setFilter] = useState({ sort: "", query: "" }); // Состояние для компонента PostFilter
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();
    const [fetchPosts, isPostsLoading, postError] = useFetching(
        async (limit, page) => {
            const response = await PostService.getAll(limit, page);
            setPosts([...posts, ...response.data]);
            const totalCount = response.headers["x-total-count"];
            setTotalPages(getPageCount(totalCount, limit));
        }
    );

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    // Получаем пост из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit]);

    const changePage = (page) => {
        setPage(page);
    };

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

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
            <MySelect
                value={limit}
                onChange={(value) => setLimit(value)}
                defaultValue='number of elements'
                options={[
                    { value: 5, name: "5" },
                    { value: 10, name: "10" },
                    { value: 25, name: "25" },
                    { value: -1, name: "Show All" },
                ]}
            />
            {postError && <h1>An error has occurred ${postError}</h1>}
            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title={"Posts about JS"}
            />
            <div
                ref={lastElement}
                style={{ height: 20, background: "red" }}
            ></div>
            {isPostsLoading && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 50,
                    }}
                >
                    <Loader />
                </div>
            )}

            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
