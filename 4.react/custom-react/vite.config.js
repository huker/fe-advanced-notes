import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            react: path.resolve('src/react'),
            shared: path.resolve('src/shared'),
            "react-dom": path.resolve('src/react-dom')
        }
    },
    plugins: [
        react()
    ]
})
