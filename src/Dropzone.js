import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './DragnDrop.module.css';

export default function Dropzone() {
    const [files, setFiles] = useState([]);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                ),
            );
        },
    });

    const images = files.map((file) => (
        <div key={file.name}>
            <img src={file.preview} alt="image" style={{ width: "200px" }} />
        </div>
    ));

    return (
        <section className={styles.container}>
            <div {...getRootProps({ className: 'dropzone' })} className={styles.fileBox}>
                <input {...getInputProps()} />
                <p className={styles.text}>Drag 'n' drop image here, or click to select images</p>
            </div>
            <aside>
                <h4>Preview</h4>
                <ul>{images}</ul>
            </aside>
        </section>
    )
}
