import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/data';

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
};

// Асинхронная функция для получения всех данных
export const fetchData = createAsyncThunk(
    'data/fetchData',
    async function(_, { rejectWithValue }) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Server error');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронная функция для добавления нового поста
export const addPost = createAsyncThunk(
    'data/addPost',
    async function(newPost, { rejectWithValue }) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронная функция для добавления комментария к посту
export const addComment = createAsyncThunk(
    'data/addComment',
    async function({ postId, comment }, { rejectWithValue }) {
        try {
            // Сначала получаем текущий пост, чтобы извлечь существующие комментарии
            const getPostResponse = await fetch(`${url}/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!getPostResponse.ok) {
                throw new Error('Failed to fetch the post');
            }

            const post = await getPostResponse.json();

            // Добавляем новый комментарий в массив существующих комментариев
            const updatedComments = [...post.comments, comment];

            // Обновляем пост с новым массивом комментариев
            const patchResponse = await fetch(`${url}/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comments: updatedComments }), // передаем обновленный массив комментариев
            });

            if (!patchResponse.ok) {
                throw new Error('Server error');
            }

            const updatedPost = await patchResponse.json();
            return { postId, post: updatedPost }; // возвращаем обновленный пост
        } catch (error) {
            console.log('dd')
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронная функция для получения поста по ID
export const fetchPostById = createAsyncThunk(
    'data/fetchPostById',
    async function(postId, { rejectWithValue }) {
        try {
            const response = await fetch(`${url}/${postId}`);

            if (!response.ok) {
                throw new Error('Server error');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        data: null,
        status: null,
        error: null,
        onePost: null
    },
    reducers: {
        clearData(state) {
            state.data = null;
        },
        addData(state, action) {
            if (state.data) {
                state.data.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchData.rejected, setError)
            .addCase(addPost.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.data.push(action.payload);
            })
            .addCase(addComment.fulfilled, (state, action) => {
                const post = state.data.find(post => post.id === action.payload.postId);
                if (post) {
                    post.comments.push(action.payload.comment);
                }
            })
            .addCase(fetchPostById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.onePost = null;
            })
            .addCase(fetchPostById.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.onePost = action.payload;
                state.error = null;
            })
            .addCase(fetchPostById.rejected, setError);
    }
});

export const { clearData, addData } = dataSlice.actions;
export default dataSlice.reducer;