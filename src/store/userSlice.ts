import { IInitState, IStudents } from '../interface';
import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState: IInitState = {
  data: {
    students: []
  },
  status: '',
  error: ''
};

export const getUsers = createAsyncThunk<IStudents>('user/getUsers', async(_, {rejectWithValue}) => {
  try{
      const response = await axios('https://front-assignment-api.2tapp.cc/api/persons');
      
      if (response.status !== 200){
        throw new Error('error from requests');
      }

      return response.data;
  } catch(err) {
    if (err instanceof Error) {
      return rejectWithValue(err.message)
    }
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeToList(state, action: PayloadAction<number>) {
      state.data.students = state.data.students.filter(el => el.id !== action.payload);
    }

  },
  extraReducers: builder => {
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<IStudents>) => {
      state.data = action.payload;
      state.error = '';
      state.status = 'done';
    });
    builder.addCase(getUsers.pending, (state, action) => {
      state.error = '';
      state.status = 'loading';
    });
    builder.addCase(getUsers.rejected, (state, action: any) => {
      state.status = 'error';
      state.error = action.payload
    })
  }
})

export const {actions, reducer} = userSlice;