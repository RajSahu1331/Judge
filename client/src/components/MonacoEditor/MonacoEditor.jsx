import React from 'react';
import { Editor } from '@monaco-editor/react';

const MonacoEditor = ({ value, onChange, language }) => {
    // console.log(value)
    // console.log(language)
    return (
        <Editor
            height="300px" // Set the default height
            defaultLanguage={language}
            value={value}
            onChange={onChange}
            theme="vs-dark"
        />
    );
};

export default MonacoEditor;
