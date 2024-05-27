import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const url = 'http://localhost:3000/users';

// Асинхронная функция для входа по почте и паролю
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async function(data, { rejectWithValue }) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            const users = await response.json();

            const user = users.find(u => u.mail === data.mail && u.pass === data.pass);

            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Сохраняем данные пользователя в localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('id', JSON.stringify(user));
            return user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронная функция для получения пользователя по ID
export const fetchUserById = createAsyncThunk(
    'user/fetchUserById',
    async function(userId, { rejectWithValue }) {
        try {
            const response = await fetch(`${url}/${userId}`);

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

// Асинхронная функция для регистрации пользователя
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async function({ pass, login, name, mail }, { rejectWithValue }) {
        try {
            // Сначала выполняем запрос, чтобы получить всех пользователей
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            const users = await response.json();

            // Проверяем, существует ли пользователь с такой же почтой
            const existingUser = users.find(u => u.mail === mail);
            if (existingUser) {
                throw new Error('Email already exists');
            }

            // Если почта уникальна, выполняем запрос на создание нового пользователя
            const createResponse = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pass, login, name, mail, userPosts: [] }),
            });

            if (!createResponse.ok) {
                throw new Error('Server error');
            }

            const data = await createResponse.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Асинхронная функция для добавления поста к userPosts
export const addUserPost = createAsyncThunk(
    'user/addUserPost',
    async function({ userId, postId }, { rejectWithValue }) {
        try {
            // Сначала получаем текущие данные пользователя, чтобы извлечь существующие userPosts
            const getUserResponse = await fetch(`${url}/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!getUserResponse.ok) {
                throw new Error('Failed to fetch the user');
            }

            const user = await getUserResponse.json();

            // Добавляем новый пост в массив существующих userPosts
            const updatedUserPosts = [...user.userPosts, postId];

            // Обновляем пользователя с новым массивом userPosts
            const patchResponse = await fetch(`${url}/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userPosts: updatedUserPosts }), // передаем обновленный массив userPosts
            });

            if (!patchResponse.ok) {
                throw new Error('Server error');
            }

            const updatedUser = await patchResponse.json();
            return { userId, user: updatedUser }; // возвращаем обновленного пользователя
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: null,
        error: null,
    },
    reducers: {
        clearUser(state) {
            state.user = null;
        },
        clearUserStor(state){
            localStorage.clear()
        },
        addUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, setError)
            .addCase(fetchUserById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchUserById.rejected, setError)
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerUser.rejected, setError)
            .addCase(addUserPost.fulfilled, (state, action) => {
                state.status = 'resolved';
                if (state.user && state.user.id === action.payload.userId) {
                    state.user.userPosts = action.payload.user.userPosts;
                }
                state.error = null;
            })
            .addCase(addUserPost.rejected, setError);
    }
});

export const { clearUser, addUser, clearUserStor } = userSlice.actions;
export default userSlice.reducer;
